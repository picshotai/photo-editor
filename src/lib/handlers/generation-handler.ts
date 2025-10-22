import type {
  PlacedImage,
  GenerationSettings,
  ActiveGeneration,
} from "@/types/canvas";
import type { FalClient } from "@fal-ai/client";

interface GenerationHandlerDeps {
  images: PlacedImage[];
  selectedIds: string[];
  generationSettings: GenerationSettings;
  canvasSize: { width: number; height: number };
  viewport: { x: number; y: number; scale: number };
  falClient: FalClient;
  setImages: React.Dispatch<React.SetStateAction<PlacedImage[]>>;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveGenerations: React.Dispatch<
    React.SetStateAction<Map<string, ActiveGeneration>>
  >;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  toast: (props: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => void;
  // removed generateTextToImage
}

export const uploadImageDirect = async (
  dataUrl: string,
  falClient: FalClient,
  toast: GenerationHandlerDeps["toast"],
) => {
  // Convert data URL to blob first
  const response = await fetch(dataUrl);
  const blob = await response.blob();

  try {
    // Check size before attempting upload
    if (blob.size > 10 * 1024 * 1024) {
      // 10MB warning
      console.warn(
        "Large image detected:",
        (blob.size / 1024 / 1024).toFixed(2) + "MB",
      );
    }

    // Upload directly to FAL through proxy (using the client instance)
    const uploadResult = await falClient.storage.upload(blob);

    return { url: uploadResult };
  } catch (error: any) {
    // Check for rate limit error
    const isRateLimit =
      error.status === 429 ||
      error.message?.includes("429") ||
      error.message?.includes("rate limit") ||
      error.message?.includes("Rate limit");

    if (isRateLimit) {
      toast({
        title: "Rate limit exceeded",
        description:
          "Uploads are temporarily limited. Please try again in a moment.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Failed to upload image",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }

    // Re-throw the error so calling code knows upload failed
    throw error;
  }
};

const toAspectRatioString = (width: number, height: number): "21:9" | "1:1" | "4:3" | "3:2" | "2:3" | "5:4" | "4:5" | "3:4" | "16:9" | "9:16" | undefined => {
  if (!width || !height) return undefined;
  const ratio = width / height;
  const candidates = [
    { label: "1:1" as const, value: 1 },
    { label: "16:9" as const, value: 16 / 9 },
    { label: "9:16" as const, value: 9 / 16 },
    { label: "4:3" as const, value: 4 / 3 },
    { label: "3:4" as const, value: 3 / 4 },
    { label: "3:2" as const, value: 3 / 2 },
    { label: "2:3" as const, value: 2 / 3 },
    { label: "5:4" as const, value: 5 / 4 },
    { label: "4:5" as const, value: 4 / 5 },
    { label: "21:9" as const, value: 21 / 9 },
  ];
  let best: { label: typeof candidates[number]["label"]; diff: number } | null = null;
  for (const c of candidates) {
    const diff = Math.abs(ratio - c.value) / c.value;
    if (!best || diff < best.diff) best = { label: c.label, diff };
  }
  // Accept within 10% tolerance; else undefined to let model pick from source
  return best && best.diff <= 0.1 ? best.label : undefined;
};

export const generateImage = (
  imageUrl: string,
  x: number,
  y: number,
  groupId: string,
  generationSettings: GenerationSettings,
  setImages: GenerationHandlerDeps["setImages"],
  setActiveGenerations: GenerationHandlerDeps["setActiveGenerations"],
  width: number = 300,
  height: number = 300,
) => {
  const placeholderId = `generated-${Date.now()}`;
  setImages((prev) => [
    ...prev,
    {
      id: placeholderId,
      src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      x,
      y,
      width,
      height,
      rotation: 0,
      isGenerated: true,
      parentGroupId: groupId,
    },
  ]);

  // Store generation params
  setActiveGenerations((prev) =>
    new Map(prev).set(placeholderId, {
      imageUrl,
      prompt: generationSettings.prompt,
      // remove loraUrl; set aspectRatio from settings or infer from size
      aspectRatio:
        generationSettings.aspectRatio && generationSettings.aspectRatio !== "auto"
          ? generationSettings.aspectRatio
          : toAspectRatioString(width, height),
    }),
  );
};

export const handleRun = async (deps: GenerationHandlerDeps) => {
  const {
    images,
    selectedIds,
    generationSettings,
    canvasSize,
    viewport,
    falClient,
    setImages,
    setSelectedIds,
    setActiveGenerations,
    setIsGenerating,
    toast,
    // removed generateTextToImage
  } = deps;

  if (!generationSettings.prompt) {
    toast({
      title: "No Prompt",
      description: "Please enter a prompt to generate an image",
      variant: "destructive",
    });
    return;
  }

  setIsGenerating(true);
  const selectedImages = images.filter((img) => selectedIds.includes(img.id));

  // If no images are selected, show guidance (edit model requires images)
  if (selectedImages.length === 0) {
    toast({
      title: "No image selected",
      description:
        "This app only supports image-to-image editing. Please select an image on the canvas first, then describe how you want to edit it.",
      variant: "destructive",
    });
    setIsGenerating(false);
    return;
  }

  // Process each selected image individually for image-to-image
  let successCount = 0;
  let failureCount = 0;

  for (const img of selectedImages) {
    try {
      // Get crop values
      const cropX = img.cropX || 0;
      const cropY = img.cropY || 0;
      const cropWidth = img.cropWidth || 1;
      const cropHeight = img.cropHeight || 1;

      // Load the image
      const imgElement = new window.Image();
      imgElement.crossOrigin = "anonymous"; // Enable CORS
      imgElement.src = img.src;
      await new Promise((resolve) => {
        imgElement.onload = resolve;
      });

      // Create a canvas for the image at original resolution
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      // Calculate the effective original dimensions accounting for crops
      let effectiveWidth = imgElement.naturalWidth;
      let effectiveHeight = imgElement.naturalHeight;

      if (cropWidth !== 1 || cropHeight !== 1) {
        effectiveWidth = cropWidth * imgElement.naturalWidth;
        effectiveHeight = cropHeight * imgElement.naturalHeight;
      }

      // Cap extremely large images to avoid FAL 422 image_too_large
      const MAX_SIDE = 4096; // safe cap to keep payloads reasonable
      const maxOriginalSide = Math.max(effectiveWidth, effectiveHeight);
      const scale = maxOriginalSide > MAX_SIDE ? MAX_SIDE / maxOriginalSide : 1;

      // Set canvas size to capped resolution while preserving aspect ratio
      canvas.width = Math.round(effectiveWidth * scale);
      canvas.height = Math.round(effectiveHeight * scale);

      console.log(
        `Processing image at ${effectiveWidth}x${effectiveHeight}, scaled to ${canvas.width}x${canvas.height} (display: ${img.width}x${img.height})`,
      );

      // Always use the crop values (default to full image if not set)
      ctx.drawImage(
        imgElement,
        cropX * imgElement.naturalWidth,
        cropY * imgElement.naturalHeight,
        cropWidth * imgElement.naturalWidth,
        cropHeight * imgElement.naturalHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      // Convert to blob and upload
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png");
      });

      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(blob);
      });

      let uploadResult;
      try {
        uploadResult = await uploadImageDirect(
          dataUrl,
          falClient,
          toast,
        );
      } catch (uploadError) {
        console.error("Failed to upload image:", uploadError);
        failureCount++;
        // Skip this image if upload fails
        continue;
      }

      // Only proceed with generation if upload succeeded
      if (!uploadResult?.url) {
        console.error("Upload succeeded but no URL returned");
        failureCount++;
        continue;
      }

      const groupId = `single-${Date.now()}-${Math.random()}`;
      generateImage(
        uploadResult.url,
        img.x + img.width + 20,
        img.y,
        groupId,
        generationSettings,
        setImages,
        setActiveGenerations,
        img.width,
        img.height,
      );
      successCount++;
    } catch (error) {
      console.error("Error processing image:", error);
      failureCount++;
      toast({
        title: "Failed to process image",
        description:
          error instanceof Error ? error.message : "Failed to process image",
        variant: "destructive",
      });
    }
  }

  // Done processing all images
  setIsGenerating(false);
};

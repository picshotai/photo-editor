export interface StyleModel {
  id: string;
  name: string;
  imageSrc: string;
  prompt: string;
  overlay?: boolean;
}

export const styleModels: StyleModel[] = [
  {
    id: "simpsons",
    name: "Simpsons Style",
    imageSrc: "/images/styles/simpsons.jpg",
    prompt: "convert to Simpsons cartoon style",
  },
  {
    id: "lego",
    name: "Lego Style",
    imageSrc: "/images/styles/lego.png",
    prompt: "convert to lego style",
  },
  {
    id: "faceretoucher",
    name: "Face Retoucher",
    imageSrc: "/images/styles/faceretoucher.jpg",
    prompt: "Touchup photo. Remove blemishes and improve skin.",
  },
  {
    id: "3d",
    name: "3D Game Asset",
    imageSrc: "/images/styles/3d.jpg",
    prompt: "Create 3D game asset, isometric view version",
  },
  {
    id: "pixel",
    name: "Pixel Style",
    imageSrc: "/images/styles/pixel.png",
    prompt: "Turn this image into the Pixel style.",
  },
  {
    id: "snoopy",
    name: "Snoopy Style",
    imageSrc: "/images/styles/snoopy.png",
    prompt: "Turn this image into the Snoopy style.",
  },
  {
    id: "jojo",
    name: "JoJo Style",
    imageSrc: "/images/styles/jojo.png",
    prompt: "Turn this image into the JoJo style.",
  },
  {
    id: "clay",
    name: "Clay Style",
    imageSrc: "/images/styles/clay.png",
    prompt: "Turn this image into the Clay style.",
  },
  {
    id: "ghibli",
    name: "Ghibli Style",
    imageSrc: "/images/styles/ghibli.png",
    prompt: "Turn this image into the Ghibli style.",
  },
  {
    id: "americancartoon",
    name: "American Cartoon Style",
    imageSrc: "/images/styles/americancartoon.png",
    prompt: "Turn this image into the American Cartoon style.",
  },
  {
    id: "broccoli",
    name: "Broccoli Hair",
    imageSrc: "/images/styles/broccoli.jpeg",
    prompt: "Change hair to a broccoli haircut",
  },
  {
    id: "plushie",
    name: "Plushie Style",
    imageSrc: "/images/styles/plushie.png",
    prompt: "Convert to plushie style",
  },
  {
    id: "wojak",
    name: "Wojak Style",
    imageSrc: "/images/styles/wojack.jpg",
    prompt: "Convert to wojak style drawing",
  },
  {
    id: "fluffy",
    name: "Fluffy Style",
    imageSrc: "/images/styles/fluffy.jpg",
    prompt: "make this object fluffy",
  },
  {
    id: "glassprism",
    name: "Glass Prism",
    imageSrc: "/images/styles/glassprism.jpg",
    prompt:
      "make the character/object look like it was made out of glass, black background",
  },
  {
    id: "metallic",
    name: "Metallic Objects",
    imageSrc: "/images/styles/metallic.png",
    prompt: "Make it metallic with a black background and a 3D perspective",
  },
  {
    id: "anime",
    name: "Anime Style",
    imageSrc: "/images/styles/anime.jpg",
    prompt: "convert to anime art style with large eyes and stylized features",
  },
  {
    id: "watercolor",
    name: "Watercolor Style",
    imageSrc: "/images/styles/watercolor.jpg",
    prompt: "Convert this image into watercolor art style",
  },
  {
    id: "pencil_drawing",
    name: "Pencil Drawing Style",
    imageSrc: "/images/styles/pencil_drawing.jpg",
    prompt: "Convert this image into pencil_drawing art style",
  },
  {
    id: "mosaic",
    name: "Mosaic Art Style",
    imageSrc: "/images/styles/mosaicart.jpg",
    prompt: "Convert this image into mosaic art style",
  },
  {
    id: "minimalist",
    name: "Minimalist Art Style",
    imageSrc: "/images/styles/minimalist.jpg",
    prompt: "Convert this image into minimalist art style",
  },
  {
    id: "impressionist",
    name: "Impressionist Art Style",
    imageSrc: "/images/styles/impressionist.jpg",
    prompt: "Convert this image into impressionist art style",
  },
  {
    id: "lowpoly",
    name: "Low Poly Art Style",
    imageSrc: "/images/styles/lowpoly.jpg",
    prompt: "Convert this image to low poly version",
  },
  {
    id: "abstract",
    name: "Abstract Art Style",
    imageSrc: "/images/styles/abstract.jpg",
    prompt: "Convert this image to abstract art style",
  },
  {
    id: "cubist",
    name: "Cubist Art Style",
    imageSrc: "/images/styles/cubist.jpg",
    prompt: "Convert this image to cubist art style",
  },
  {
    id: "charcoal",
    name: "Charcoal Art Style",
    imageSrc: "/images/styles/charcoal.jpg",
    prompt: "Convert this image into charcoal art style",
  },
  {
    overlay: true,
    id: "overlay",
    name: "Overlay",
    imageSrc: "/images/styles/overlay.png",
    prompt: "Place it",
  },
  {
    overlay: true,
    id: "lightfix",
    name: "Light Fix",
    imageSrc: "/images/styles/lightfix.png",
    prompt: "Fuse this image into background",
  },
  {
    overlay: true,
    id: "fuseit",
    name: "Fuse It",
    imageSrc: "/images/styles/fuseit.png",
    prompt: "Fuse this image into background",
  },
];

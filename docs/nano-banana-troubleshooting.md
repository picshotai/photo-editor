# fal-ai nano-banana/edit Troubleshooting Guide

This document captures symptoms, root causes, fixes, and failed attempts for recurring 422 errors when calling `fal-ai/nano-banana/edit` from this app.

## Overview
- Endpoint: `fal-ai/nano-banana/edit`
- Required shape: `image_urls: [string]`, `prompt: string`, optional `seed`
- We send: `image_urls: [url]`, `prompt`, `num_images: 1`, `output_format: "jpeg"` (no `aspect_ratio`)

## Symptoms
- 422 Unprocessable Entity with validation messages:
  - Missing field: `image_urls` (singular `image_url` was rejected)
  - `image_too_large` with `ctx.max_resolution` and helpful URL
- Placeholder generated images disappearing immediately after failure.

## Root Causes Observed
- Client attempted generation with no selected image → server received empty `imageUrl`.
- Incorrect input shape: used `image_url` instead of `image_urls: [...]`.
- Oversized source image/crop exceeding model limits → `image_too_large`.
- Minor input sanitation issues (whitespace/backticks embedded in URLs/prompts).

## Final Fixes Implemented
- Server strict schema (in `src/server/trpc/routers/_app.ts`):
  - Always send `image_urls: [cleanUrl]`, `num_images: 1`, `output_format: "jpeg"`.
  - Omit `aspect_ratio` so the model infers from the image.
  - Sanitize `imageUrl` and `prompt` (trim whitespace, strip stray backticks; validate http/https).
  - Surface friendly 422 errors, including `image_too_large` with `max_resolution` guidance.
  - Imported `TRPCError` and used it for structured error responses.
- Client guards:
  - Disable “Run” when no image is selected (`CanvasContextMenu`).
  - Hard guard in `src/app/page.tsx` `handleRun()` to block generation and toast when selection is empty.
- Client downscale before upload (in `src/lib/handlers/generation-handler.ts`):
  - Cap max side length to `4096` for the cropped region before `toBlob` and upload.
  - Logs original vs scaled dimensions for visibility.

## Changes Tried That Did Not Work (or Were Removed)
- Layered fallbacks sending alternate payload shapes (e.g., single `image_url`) → invalid per docs; removed.
- Toggling `aspect_ratio` retry logic → caused inconsistent validation; we now omit it entirely.
- Blaming `output_format` for 422s → not root cause; we keep `output_format: "jpeg"` consistently.
- Relying solely on server-side sanitation without client downscale → still hit `image_too_large` for big crops.

## Diagnostic Steps
1. Confirm selection:
   - Ensure at least one canvas image is selected before running (UI now prevents this).
2. Inspect client logs:
   - Look for: `Processing image at <orig_w>x<orig_h>, scaled to <w>x<h>`.
   - If scaled dimensions still very large, consider reducing `MAX_SIDE` or crop.
3. Inspect server logs for generateImageStream:
   - Verify payload fields: `image_urls: [<url>]`, `prompt`, `num_images: 1`, `output_format: "jpeg"`.
   - Confirm absence of `aspect_ratio`.
4. On 422 errors:
   - Capture full `detail` JSON. If `type` is `image_too_large`, use `ctx.max_resolution` to decide whether to crop or reduce `MAX_SIDE`.

## Handling Common 422s
- `image_urls missing`:
  - Ensure client passes `generation.imageUrl` and the server uses `image_urls: [url]`.
- `image_too_large`:
  - Crop the image, or reduce client `MAX_SIDE` cap.
  - Our current cap: `4096` in `generation-handler.ts`.
- Malformed URL:
  - Server sanitizes/trims and validates scheme; confirm the URL starts with `http://` or `https://`.

## Configuration Knobs
- Client cap (`generation-handler.ts`):
  - `const MAX_SIDE = 4096;` → raise/lower depending on quality/runtime trade-offs and model limits.
- Server input ( `_app.ts` `generateImageStream` ):
  - `output_format` can be changed if needed; keep `image_urls` array and omit `aspect_ratio`.

## File References
- `src/server/trpc/routers/_app.ts` → `generateImageStream`, strict schema + error handling; `TRPCError` import added.
- `src/lib/handlers/generation-handler.ts` → client downscale and upload flow; `uploadImageDirect`.
- `src/components/canvas/CanvasContextMenu.tsx` → “Run” disabled when `selectedIds.length === 0`.
- `src/app/page.tsx` → guard in `handleRun()` and error cleanup on `onError`.

## Quick Checklist
- Is an image selected? If not, the client prevents running.
- Does server show `image_urls: [url]` and no `aspect_ratio`? Good.
- Did the client downscale to a reasonable size? If not, confirm the `MAX_SIDE` logic.
- On 422, read `detail.type` and `ctx` to decide next action.

## Notes
- The friendly error message for `image_too_large` comes from server logic mapping FAL’s `detail` into a human-readable hint.
- Backticks shown in pasted error messages were likely from console formatting; the server trims these before sending to FAL.
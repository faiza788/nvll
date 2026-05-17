"use client";

import { useState, useEffect } from "react";

/**
 * Removes the background from an image using BFS flood-fill from edge pixels.
 * Works for images with a roughly uniform background (studio shots, plain walls).
 * Returns the original URL while processing, then a transparent-bg data URL.
 */
export function useBackgroundRemoval(
  imageUrl: string,
  threshold = 55
): string {
  const [result, setResult] = useState(imageUrl);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data, width, height } = imageData;

      // Sample background color from 8 points around the edges
      const samplePts = [
        [0, 0], [width - 1, 0],
        [0, height - 1], [width - 1, height - 1],
        [Math.floor(width / 2), 0], [Math.floor(width / 2), height - 1],
        [0, Math.floor(height / 2)], [width - 1, Math.floor(height / 2)],
      ];
      let bgR = 0, bgG = 0, bgB = 0;
      const n = samplePts.length;
      for (const [sx, sy] of samplePts) {
        const si = (sy * width + sx) * 4;
        bgR += data[si] / n;
        bgG += data[si + 1] / n;
        bgB += data[si + 2] / n;
      }

      const colorDist = (i: number): number => {
        const dr = data[i] - bgR;
        const dg = data[i + 1] - bgG;
        const db = data[i + 2] - bgB;
        return Math.sqrt(dr * dr + dg * dg + db * db);
      };

      // BFS flood fill from all edge pixels
      const total = width * height;
      const visited = new Uint8Array(total);
      const filled = new Uint8Array(total); // 1 = background pixel
      const queue: number[] = [];
      queue.length = total; // pre-allocate
      let qHead = 0, qTail = 0;

      const enqueue = (pos: number) => { queue[qTail++] = pos; };

      // Seed: all border pixels
      for (let x = 0; x < width; x++) {
        enqueue(x);
        enqueue((height - 1) * width + x);
      }
      for (let y = 1; y < height - 1; y++) {
        enqueue(y * width);
        enqueue(y * width + width - 1);
      }

      while (qHead < qTail) {
        const pos = queue[qHead++];
        if (visited[pos]) continue;
        visited[pos] = 1;

        if (colorDist(pos * 4) <= threshold) {
          filled[pos] = 1;
          const x = pos % width;
          const y = Math.floor(pos / width);
          if (x > 0) enqueue(pos - 1);
          if (x < width - 1) enqueue(pos + 1);
          if (y > 0) enqueue(pos - width);
          if (y < height - 1) enqueue(pos + width);
        }
      }

      // Pass 1: make filled pixels fully transparent
      for (let pos = 0; pos < total; pos++) {
        if (filled[pos]) data[pos * 4 + 3] = 0;
      }

      // Pass 2: soft anti-aliased edge on unfilled pixels adjacent to filled
      const edgeLo = threshold;
      const edgeHi = threshold * 1.6;
      for (let pos = 0; pos < total; pos++) {
        if (filled[pos]) continue;
        const dist = colorDist(pos * 4);
        if (dist > edgeHi) continue; // far from bg color — fully opaque

        const x = pos % width;
        const y = Math.floor(pos / width);
        const neighbors = [pos - 1, pos + 1, pos - width, pos + width];
        const nearFill = neighbors.some(
          (n) => n >= 0 && n < total && filled[n] === 1
        );
        if (!nearFill) continue;

        // Blend alpha: 0 at edgeLo, 255 at edgeHi
        const t = Math.max(0, Math.min(1, (dist - edgeLo) / (edgeHi - edgeLo)));
        data[pos * 4 + 3] = Math.round(t * 255);
      }

      ctx.putImageData(imageData, 0, 0);
      setResult(canvas.toDataURL("image/png"));
    };

    img.src = imageUrl;
  }, [imageUrl, threshold]);

  return result;
}

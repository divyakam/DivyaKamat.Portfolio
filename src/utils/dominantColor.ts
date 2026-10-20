/**
 * Color extraction utility to get the dominating color from an image URL or image element.
 */

export interface DominantColorInfo {
  hex: string;
  rgb: [number, number, number];
  color: string; // Readable text color (darkened if needed for contrast on light background)
  background: string; // Subtle tint background
  border: string; // Tinted border
}

// Fallback colors for pre-existing projects so render is instant with zero flash
export const projectDominantColors: Record<string, [number, number, number]> = {
  ehsaas: [108, 33, 27], // Deep rich crimson / terracotta
  "system-thinking": [220, 98, 71], // Coral / terracotta
  kine: [28, 79, 121], // Deep metallic blue / cyan
  ethnography: [109, 34, 30], // Rich maroon / burgundy
  "semiotic-analysis": [184, 116, 12], // Habbo amber / gold
  "puffys-way-out": [22, 113, 152], // Oceanic teal / blue
};

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let tempT = t;
      if (tempT < 0) tempT += 1;
      if (tempT > 1) tempT -= 1;
      if (tempT < 1 / 6) return p + (q - p) * 6 * tempT;
      if (tempT < 1 / 2) return q;
      if (tempT < 2 / 3) return p + (q - p) * (2 / 3 - tempT) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function formatDominantColor(r: number, g: number, b: number): DominantColorInfo {
  const [h, s, l] = rgbToHsl(r, g, b);

  // For text readability on the light panel background (#fcf9f5),
  // clamp lightness if color is too light
  let textR = r;
  let textG = g;
  let textB = b;
  if (l > 0.44) {
    const [dr, dg, db] = hslToRgb(h, Math.min(s * 1.05, 1), 0.36);
    textR = dr;
    textG = dg;
    textB = db;
  }

  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  return {
    hex,
    rgb: [r, g, b],
    color: `rgb(${textR}, ${textG}, ${textB})`,
    background: `rgba(${r}, ${g}, ${b}, 0.12)`,
    border: `1px solid rgba(${r}, ${g}, ${b}, 0.28)`,
  };
}

export function parseColor(colorStr?: string): [number, number, number] | null {
  if (!colorStr) return null;
  const s = colorStr.trim().toLowerCase();
  if (s.startsWith("#")) {
    let hex = s.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    if (hex.length === 6) {
      const num = parseInt(hex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
  }
  const rgbMatch = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)];
  }
  return null;
}

export function getFallbackDominantColor(projectId?: string, customColor?: string): DominantColorInfo {
  if (customColor) {
    const parsed = parseColor(customColor);
    if (parsed) return formatDominantColor(parsed[0], parsed[1], parsed[2]);
  }
  if (projectId && projectDominantColors[projectId]) {
    const [r, g, b] = projectDominantColors[projectId];
    return formatDominantColor(r, g, b);
  }
  // Default accent if unknown: deep warm red
  return formatDominantColor(108, 33, 27);
}

/**
 * Samples pixels from an HTMLImageElement using an offscreen canvas
 * to find the dominating chromatic color.
 */
export function extractDominantColor(img: HTMLImageElement): DominantColorInfo | null {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    const size = 48;
    canvas.width = size;
    canvas.height = size;

    ctx.drawImage(img, 0, 0, size, size);
    const imgData = ctx.getImageData(0, 0, size, size).data;

    const bins: Record<string, { count: number; r: number; g: number; b: number; weight: number }> = {};

    for (let i = 0; i < imgData.length; i += 4) {
      const a = imgData[i + 3];
      if (a < 128) continue;

      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];

      const [, s, l] = rgbToHsl(r, g, b);

      if (l > 0.94 && s < 0.12) continue;
      if (l < 0.06) continue;

      const weight = 1 + s * 3;

      const qr = Math.floor(r / 24) * 24;
      const qg = Math.floor(g / 24) * 24;
      const qb = Math.floor(b / 24) * 24;
      const key = `${qr},${qg},${qb}`;

      if (!bins[key]) {
        bins[key] = { count: 0, r: 0, g: 0, b: 0, weight: 0 };
      }
      bins[key].count += 1;
      bins[key].weight += weight;
      bins[key].r += r;
      bins[key].g += g;
      bins[key].b += b;
    }

    let bestBin: { count: number; r: number; g: number; b: number; weight: number } | null = null;
    let maxWeight = 0;

    for (const key in bins) {
      if (bins[key].weight > maxWeight) {
        maxWeight = bins[key].weight;
        bestBin = bins[key];
      }
    }

    if (bestBin && bestBin.count > 0) {
      const avgR = Math.round(bestBin.r / bestBin.count);
      const avgG = Math.round(bestBin.g / bestBin.count);
      const avgB = Math.round(bestBin.b / bestBin.count);
      return formatDominantColor(avgR, avgG, avgB);
    }

    return null;
  } catch {
    return null;
  }
}

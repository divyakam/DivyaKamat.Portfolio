import { useState, useEffect } from "react";
import type { DominantColorInfo } from "@/utils/dominantColor";
import {
  getFallbackDominantColor,
  extractDominantColor,
} from "@/utils/dominantColor";

/**
 * React hook to dynamically extract the dominating color from a case study cover image,
 * with instantaneous fallback based on project ID or custom override.
 */
export function useDominantColor(
  imageSrc?: string,
  projectId?: string,
  customColor?: string
): DominantColorInfo {
  const [colorInfo, setColorInfo] = useState<DominantColorInfo>(() =>
    getFallbackDominantColor(projectId, customColor)
  );

  useEffect(() => {
    if (customColor) {
      setColorInfo(getFallbackDominantColor(projectId, customColor));
      return;
    }

    setColorInfo(getFallbackDominantColor(projectId));

    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    const tryExtract = () => {
      const result = extractDominantColor(img);
      if (result) {
        setColorInfo(result);
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      tryExtract();
    } else {
      img.onload = tryExtract;
    }

    return () => {
      img.onload = null;
    };
  }, [imageSrc, projectId, customColor]);

  return colorInfo;
}

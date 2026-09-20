import { useEffect, useState } from "react";

/**
 * Returns true when the device supports fine pointer (mouse) and hover.
 * Used to gate spotlight cards, cursor dot, and drag interactions.
 */
export function usePointerFine(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isFine;
}

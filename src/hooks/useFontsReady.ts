import { useEffect, useState } from "react";

/**
 * Returns true once all declared fonts have finished loading.
 * Used to gate the Blur Reveal animation so no font-swap flash occurs mid-reveal.
 */
export function useFontsReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  return ready;
}

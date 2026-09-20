import { useEffect, useState } from "react";

/**
 * Returns true when the user has prefers-reduced-motion enabled.
 * This is a React hook wrapper; for Motion (framer-motion), use the
 * built-in `useReducedMotion()` from "motion/react" instead.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

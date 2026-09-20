import { m } from "motion/react";
import { useCallback, useEffect, useState } from "react";

/**
 * WaveEmoji — §8.2.1
 * Microsoft Fluent 3D "Waving hand" emoji.
 * Waves once 600ms after mount, and again on hover/click.
 */

const waveKeyframes = {
  rotate: [0, 14, -8, 14, -4, 0],
};

export function WaveEmoji() {
  const [wave, setWave] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWave(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const triggerWave = useCallback(() => setWave(true), []);

  return (
    <m.span
      style={{
        display: "inline-block",
        height: "0.95em",
        marginLeft: "0.25em",
        transformOrigin: "70% 70%",
        cursor: "pointer",
        verticalAlign: "middle",
      }}
      animate={wave ? waveKeyframes : {}}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => setWave(false)}
      onHoverStart={triggerWave}
      onClick={triggerWave}
    >
      <span
        role="img"
        aria-label="waving hand"
        style={{ fontSize: "0.95em", lineHeight: 1, display: "inline-block" }}
      >
        👋
      </span>
    </m.span>
  );
}

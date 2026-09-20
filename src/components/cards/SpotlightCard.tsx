import { useRef } from "react";

/**
 * SpotlightCard — §9.2
 * A card wrapper that tracks the pointer position via CSS variables
 * to render a radial pink glow fill + border glow near the cursor.
 * No React state / re-renders — pointer coordinates are written directly to the DOM element.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight ${className}`}
    >
      {children}
    </div>
  );
}

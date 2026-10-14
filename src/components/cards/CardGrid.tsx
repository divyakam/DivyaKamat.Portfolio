import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { CardItem } from "@/data/types";

/**
 * FadeInCardWrapper — Scroll-triggered reveal wrapper with staggered delay
 * - Uses IntersectionObserver (threshold: 0.12)
 * - Animates once: opacity 0→1, translateY 24px→0, scale 0.97→1
 * - 600ms duration with cubic-bezier(0.22, 1, 0.36, 1) easing
 * - Stagger applied via delay prop
 * - Respects prefers-reduced-motion (instant display)
 */
function FadeInCardWrapper({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/**
 * CardGrid — §8.7
 * Responsive auto-fill grid for Work/Play cards with staggered scroll-reveal.
 */
export function CardGrid({ items }: { items: CardItem[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 28,
        overflow: "visible",
      }}
    >
      {items.map((item, index) => (
        <FadeInCardWrapper key={item.id} delay={Math.min(index * 80, 320)}>
          <ProjectCard item={item} />
        </FadeInCardWrapper>
      ))}
    </div>
  );
}

import { m } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import type { CardItem } from "@/data/types";

// Random initial offsets for projects coming into view
const randomPresets = [
  { x: -90, y: 70, rotate: -12, scale: 0.82 },
  { x: 90, y: 90, rotate: 10, scale: 0.8 },
  { x: -70, y: 110, rotate: 14, scale: 0.84 },
  { x: 80, y: 60, rotate: -9, scale: 0.83 },
  { x: -100, y: 80, rotate: -8, scale: 0.81 },
  { x: 100, y: 100, rotate: 12, scale: 0.85 },
];

/**
 * CardGrid — §8.7
 * Responsive auto-fill grid for Work and Play cards.
 * Includes a scroll effect where cards fly in from random offset positions and angles into place.
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
      {items.map((item, index) => {
        const preset = randomPresets[index % randomPresets.length];

        return (
          <m.div
            key={item.id}
            initial={{
              opacity: 0,
              x: preset.x,
              y: preset.y,
              rotate: preset.rotate,
              scale: preset.scale,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: (index % 2) * 0.1,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <ProjectCard item={item} />
          </m.div>
        );
      })}
    </div>
  );
}

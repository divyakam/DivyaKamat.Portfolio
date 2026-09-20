import { m } from "motion/react";

/**
 * InlineChip — §8.3
 * A small photo thumbnail embedded inline in the tagline text.
 * Height scales with the font size (em units).
 */
export function InlineChip({
  src,
  alt,
  direction = 1,
}: {
  src: string;
  alt: string;
  direction?: 1 | -1;
}) {
  return (
    <m.img
      src={src}
      alt={alt}
      style={{
        display: "inline-block",
        height: "0.78em",
        aspectRatio: "1.6 / 1",
        objectFit: "cover",
        verticalAlign: "-0.06em",
        margin: "0 0.14em",
        borderRadius: 6,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}
      whileHover={{
        rotate: 3 * direction,
        scale: 1.08,
      }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
    />
  );
}

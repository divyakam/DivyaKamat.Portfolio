import { m } from "motion/react";

/**
 * InlineChip — §8.3
 * A photo thumbnail embedded inline in the tagline text.
 * Height scales with font size (em units).
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
        height: "1.35em",
        aspectRatio: "1.5 / 1",
        objectFit: "cover",
        verticalAlign: "-0.22em",
        margin: "0 0.18em",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
      whileHover={{
        rotate: 4 * direction,
        scale: 1.12,
      }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
    />
  );
}

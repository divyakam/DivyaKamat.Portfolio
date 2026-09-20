import { m, useReducedMotion, type Variants } from "motion/react";

/**
 * BlurReveal — §9.1
 * Each child token starts invisible + blurred, then sharpens into place
 * left-to-right with a stagger. Chips/glyphs are children like any word.
 */

type Props = {
  children: React.ReactNode[];
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function BlurReveal({
  children,
  delay = 0.15,
  stagger = 0.07,
  className,
  style,
}: Props) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0.04 : stagger,
        delayChildren: delay,
      },
    },
  };

  const token: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, filter: "blur(14px)", y: 12 },
    show: reduce
      ? { opacity: 1, transition: { duration: 0.2 } }
      : {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <m.span
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children.map((child, i) => (
        <span key={i}>
          <m.span
            variants={token}
            style={{
              display: "inline-block",
              willChange: "filter, opacity, transform",
            }}
            onAnimationComplete={() => {
              // Clean up will-change after animation
            }}
          >
            {child}
          </m.span>{" "}
        </span>
      ))}
    </m.span>
  );
}

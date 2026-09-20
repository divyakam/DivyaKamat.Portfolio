import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { CardGrid } from "@/components/cards/CardGrid";
import { work } from "@/data/work";

/* -------------------------------------------------------
   Animated scroll-down cue — prompts user to scroll down
   ------------------------------------------------------- */
function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = document.querySelector(".app-main-panel") as HTMLElement | null;
    const target = el ?? window;

    const onScroll = () => {
      const scrolled = el ? el.scrollTop : window.scrollY;
      if (scrolled > 40) setVisible(false);
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          aria-label="Scroll to see more projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
            cursor: "default",
            userSelect: "none",
          }}
        >

          <span
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 12,
              color: "var(--ink-3)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >

          </span>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/**
 * WorkView — §8.7
 * "Work" title + scroll cue + project cards grid.
 */
export function WorkView() {
  const sorted = [...work].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  return (
    <div>
      <h2
        tabIndex={-1}
        style={{
          fontFamily: "var(--ff-display)",
          fontSize: "var(--fs-view-title)",
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          margin: 0,
        }}
      >
        Work
      </h2>
      <p
        style={{
          fontFamily: "var(--ff-body)",
          fontSize: "var(--fs-body-lg)",
          lineHeight: 1.65,
          color: "var(--ink-2)",
          margin: "12px 0 24px 0",
        }}
      >
        Selected projects across product, spatial and experience design.
      </p>

      {/* Scroll Prompt */}
      <ScrollCue />

      {/* Grid of Work projects */}
      <CardGrid items={sorted} />
    </div>
  );
}


import { CardGrid } from "@/components/cards/CardGrid";
import { play } from "@/data/play";

/**
 * PlayView — §8.8
 * Same layout as WorkView: title + project cards grid.
 */
export function PlayView() {
  const sorted = [...play].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div>
      <h2
        tabIndex={-1}
        style={{
          fontFamily: "'Cravelo DEMO', sans-serif",
          fontSize: "clamp(2.4rem, 3.8vw, 4.2rem)",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#1E1E1E",
          lineHeight: 1.05,
          margin: "clamp(18px, 3vh, 36px) 0 8px 0",
        }}
      >
        Play
      </h2>
      <p
        style={{
          fontFamily: "var(--ff-body)",
          fontSize: "var(--fs-body-lg)",
          lineHeight: 1.65,
          color: "var(--ink-2)",
          margin: "12px 0 40px 0",
        }}
      >
        A collection of creative experiments, generative art & personal projects.
      </p>

      {/* Grid of Play projects */}
      <CardGrid items={sorted} />
    </div>
  );
}

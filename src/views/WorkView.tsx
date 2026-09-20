import { CardGrid } from "@/components/cards/CardGrid";
import { work } from "@/data/work";

/**
 * WorkView — §8.7
 * "Work" title + project cards grid.
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
          margin: "12px 0 40px 0",
        }}
      >
        Selected projects across product, spatial and experience design.
      </p>

      {/* Grid of Work projects */}
      <CardGrid items={sorted} />
    </div>
  );
}

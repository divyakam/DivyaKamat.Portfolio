import { m } from "motion/react";

/**
 * WhoAmI — §8.9.2
 * Two-column layout with "Who am I?" heading + description + tags.
 */

const TAGS = [
  "Product design",
  "Spatial design",
  "Game design",
  "Experience design",
  "New media design",
];

export function WhoAmI() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        gap: 48,
        alignItems: "start",
      }}
      className="who-am-i-grid"
    >
      {/* Left */}
      <h2
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
        Who am I?
      </h2>

      {/* Right */}
      <div>
        <p
          style={{
            fontFamily: "var(--ff-body)",
            fontSize: "var(--fs-body-lg)",
            lineHeight: 1.65,
            color: "var(--ink-2)",
            margin: 0,
            maxWidth: "62ch",
          }}
        >
          I'm Divya (she/her), a designer who works between product, space and play.
          I move from Figma flows to Unity and Unreal worlds, guided by one belief:
          technology should feel more human, not less.
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 24,
          }}
        >
          {TAGS.map((tag, i) => (
            <m.span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 16px",
                background: "#fff",
                border: "1px solid #000",
                borderRadius: 9999,
                fontFamily: "var(--ff-mono)",
                fontSize: "var(--fs-mono-pill)",
                fontWeight: 600,
                color: "var(--ink)",
                cursor: "default",
                transition: "background 160ms, border-color 160ms, transform 160ms",
              }}
              whileHover={{
                background: "var(--accent-tint)",
                borderColor: "var(--accent)",
                y: -2,
                rotate: i % 2 === 0 ? 2 : -2,
              }}
              whileTap={{ scale: 0.94 }}
            >
              {tag}
            </m.span>
          ))}
        </div>
      </div>
    </section>
  );
}

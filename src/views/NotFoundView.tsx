import { m } from "motion/react";
import { Link } from "react-router-dom";

/**
 * NotFoundView — §8.11
 * Simple 404 page with a link back to home.
 */
export function NotFoundView() {
  return (
    <div
      style={{
        minHeight: "calc(100dvh - 260px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
      }}
    >
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
        This page doesn't exist.
      </h2>
      <p
        style={{
          fontFamily: "var(--ff-body)",
          fontSize: "var(--fs-body-lg)",
          lineHeight: 1.65,
          color: "var(--ink-2)",
          margin: 0,
        }}
      >
        The page you're looking for can't be found.
      </p>
      <m.div whileTap={{ scale: 0.97 }}>
        <Link
          to="/"
          style={{
            fontFamily: "var(--ff-body)",
            fontSize: 16,
            fontWeight: 500,
            color: "var(--ink)",
            textDecoration: "underline",
            textUnderlineOffset: 4,
            textDecorationThickness: "1.5px",
          }}
        >
          Back to home
        </Link>
      </m.div>
    </div>
  );
}

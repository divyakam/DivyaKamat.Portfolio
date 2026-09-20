import { NavLink, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "motion/react";
import { Sparkle } from "./Sparkle";
import { useState } from "react";

/**
 * NavBar — §8.1
 * Uppercase mono text, sparkle separators, frosted glass strip.
 * Active item has a sliding 2px pink underline (shared layoutId).
 * Adjacent sparkles rotate 90° and fill pink on hover.
 */

const NAV_ITEMS = [
  { label: "HOME", to: "/" },
  { label: "WORK", to: "/work" },
  { label: "ABOUT", to: "/about" },
  { label: "RESUME", to: "/resume" },
  { label: "PLAY", to: "/play" },
] as const;

const snappy = { type: "spring" as const, stiffness: 500, damping: 40 };

export function NavBar() {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      aria-label="Primary"
      className="nav-bar-container"
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 48,
        padding: "0 20px",
        background: "rgba(250,250,250,.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 20,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.04)",
        gap: 0,
      }}
    >
      {NAV_ITEMS.map((item, index) => {
        const isActive = location.pathname === item.to ||
          (item.to !== "/" && location.pathname.startsWith(item.to));
        const isHomeActive = item.to === "/" && location.pathname === "/";
        const active = item.to === "/" ? isHomeActive : isActive;

        return (
          <span key={item.label} className="nav-bar-item-wrapper" style={{ display: "inline-flex", alignItems: "center" }}>
            {/* Sparkle separator before each item except the first */}
            {index > 0 && (
              <m.span
                className="nav-bar-sparkle"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 4px",
                }}
                animate={{
                  rotate: (hoveredIndex === index || hoveredIndex === index - 1) ? 90 : 0,
                }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Sparkle
                  size={12}
                  fill={
                    (hoveredIndex === index || hoveredIndex === index - 1)
                      ? "var(--accent)"
                      : "#C9C9C9"
                  }
                  style={{ transition: "fill 200ms" }}
                />
              </m.span>
            )}

            {/* Nav item */}
            <m.span
              style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileTap={{ scale: 0.96 }}
            >
              <NavLink
                to={item.to}
                end={item.to === "/"}
                aria-current={active ? "page" : undefined}
                className="nav-bar-link"
                style={{
                  display: "inline-block",
                  padding: "0 16px",
                  fontFamily: "var(--ff-mono)",
                  fontSize: "var(--fs-mono-nav)",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  color: active ? "var(--ink)" : "var(--ink-3)",
                  textDecoration: "none",
                  transition: "color 120ms",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink-3)";
                }}
              >
                {item.label}
              </NavLink>

              {/* Active underline — slides between items via shared layoutId */}
              <AnimatePresence>
                {active && (
                  <m.span
                    layoutId="nav-active-underline"
                    className="nav-active-underline"
                    style={{
                      position: "absolute",
                      bottom: -6,
                      left: 16,
                      right: 16,
                      height: 2,
                      background: "var(--accent)",
                      borderRadius: 2,
                    }}
                    transition={snappy}
                  />
                )}
              </AnimatePresence>
            </m.span>
          </span>
        );
      })}
    </nav>
  );
}

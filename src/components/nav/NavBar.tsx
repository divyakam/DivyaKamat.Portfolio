import { NavLink, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { site } from "@/data/site.config";

/**
 * NavBar — §8.1
 * Exact Figma navbar design (#119:00b169f0):
 * - Capsule/pill shape: background #FEFEFE, border 1px solid #5D5D5D, borderRadius 158px
 * - Font: Cravelo DEMO, regular, color #1E1E1E
 * - Active underline: #CC4262 (1.5px)
 * - Symbols between items: #1D17CB (royal blue), turns pink #FF2A7A when spinning
 * - On hover (laptop) or click/tap (phone/laptop):
 *   The flower on the left and right side of that page should spin!
 *   If extreme left (HOME): only the immediate right flower spins.
 *   If extreme right (RESUME): only the immediate left flower spins.
 */

function NavSymbol({ rotating, isPink }: { rotating: boolean; isPink: boolean }) {
  const fillColor = isPink ? "#FF2A7A" : "#1D17CB";

  return (
    <span
      className={`nav-flower-wrapper ${rotating ? "nav-flower-spinning" : ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        transformOrigin: "center center",
      }}
    >
      <svg
        width="22"
        height="20"
        viewBox="0 0 235 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <path
          d="M128.86 14.1945C139.174 25.12 120.655 52.6541 112.851 63.2284C105.796 73.8743 97.1241 84.0637 87.0939 87.9348C74.5563 92.7737 56.7178 82.012 46.2865 72.7131C35.8551 63.4142 30.2297 59.103 29.3775 52.2293C28.5252 45.3556 34.4752 38.3775 44.1258 40.0548C55.3267 42.0015 61.8928 51.5644 67.7655 61.1821C73.6383 70.7998 74.9195 73.1865 81.0453 72.2627C86.2454 71.4785 88.634 63.9319 89.8108 59.5162C90.9877 55.1006 99.011 26.4347 102.646 19.99C104.665 16.4096 117.895 2.58058 128.86 14.1945Z"
          fill={fillColor}
          style={{ transition: "fill 100s ease" }}
        />
        <path
          d="M227.983 82.5375C233.389 101.771 203.1 105.986 183.243 108.448C162.622 111.005 137.871 109.393 122.595 103.404C107.319 97.4159 111.098 87.2116 112.703 80.5727C115.2 70.2457 135.579 46.5345 144.663 38.3467C153.748 30.1589 166.857 19.3373 177.36 27.8883C187.863 36.4392 178.16 51.4986 170.833 56.6972C153.021 69.3335 134.501 73.6004 129.904 82.2171C125.306 90.8339 133.461 92.3683 135.705 92.5828C146.948 93.6577 159.057 87.7715 168.187 84.3678C185.866 75.7439 222.577 63.3043 227.983 82.5375Z"
          fill={fillColor}
          style={{ transition: "fill 200ms ease" }}
        />
        <path
          d="M193.558 142.64C186.19 132.88 162.332 124.561 148.979 119.511C131.549 112.363 105.284 110.806 95.5233 118.174C85.7626 125.543 84.5143 130.706 85.7182 149.688C86.9222 168.671 99.2011 190.221 107.922 201.621C116.643 213.02 122.912 210.601 128.433 208.11C134.08 205.562 134.598 198.888 133.388 195.754C132.178 192.619 126.13 176.947 118.833 166.439C112.995 158.032 108.05 145.031 107.197 138.158C107.483 135.166 108.115 133.348 111.58 131.784C115.045 130.221 121.486 129.977 131.343 138.202C144.623 149.282 144.552 150.03 163.886 160.935C183.22 171.84 189.384 162.618 190.951 162.013C192.519 161.408 199.083 149.959 193.558 142.64Z"
          fill={fillColor}
          style={{ transition: "fill 200ms ease" }}
        />
        <path
          d="M100.048 110.305C108.227 106.861 109.49 98.3783 106.037 95.0294C103.332 91.752 98.3111 89.0079 90.332 93.5279C82.353 98.048 82.6004 103.354 83.8101 106.489C85.0198 109.623 89.8258 114.611 100.048 110.305Z"
          fill={fillColor}
          style={{ transition: "fill 200ms ease" }}
        />
        <path
          d="M78.962 125.647C84.8659 108.098 69.42 99.1503 64.3352 97.0793C49.807 91.1622 24.3227 87.3537 18.3256 88.9072C9.81315 91.1122 4.9612 102.393 15.5758 109.776C26.898 117.65 42.376 113.632 46.1664 113.455C51.4729 113.208 57.3483 112.737 59.2703 118.481C61.6183 125.498 45.3742 137.529 37.857 145.112C27.2789 155.783 32.2588 164.199 37.9557 167.762C43.6525 171.326 50.5977 169.726 57.9719 163.639C64.9485 157.88 71.5821 147.582 78.962 125.647Z"
          fill={fillColor}
          style={{ transition: "fill 200ms ease" }}
        />
      </svg>
    </span>
  );
}

const NAV_ITEMS = [
  { label: "HOME", to: "/" },
  { label: "WORK", to: "/work" },
  { label: "ABOUT", to: "/about" },
  { label: "PLAY", to: "/play" },
  { label: "RESUME", to: null, href: site.resumeUrl },
] as const;

export function NavBar() {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    // Only register hover on devices with fine pointer (laptop/desktop)
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index: number) => {
    setClickedIndex(index);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setClickedIndex(null);
    }, 850);
  };

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="nav-bar-container"
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 52,
        padding: "0 28px",
        background: "#FEFEFE",
        borderRadius: 158,
        border: "1px solid #5D5D5D",
        boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
        gap: 6,
      }}
    >
      {NAV_ITEMS.map((item, index) => {
        const isActive = item.to
          ? item.to === "/"
            ? location.pathname === "/"
            : location.pathname === item.to || location.pathname.startsWith(item.to)
          : false;

        // Separator between items:
        // For index > 0, separatorIndex = index - 1 (0: HOME-WORK, 1: WORK-ABOUT, 2: ABOUT-PLAY, 3: PLAY-RESUME)
        // A separator spins 2 times if:
        // 1. The item immediately to its left (separatorIndex) is hovered or clicked
        // 2. The item immediately to its right (separatorIndex + 1) is hovered or clicked
        // This ensures:
        // - Extreme left (HOME, 0): only its immediate right separator (0) spins
        // - Middle (WORK 1, ABOUT 2, PLAY 3): both their left and right separators spin
        // - Extreme right (RESUME, 4): only its immediate left separator (3) spins
        const separatorIndex = index - 1;
        const isHoverAdjacent =
          hoveredIndex !== null &&
          (hoveredIndex === separatorIndex || hoveredIndex === separatorIndex + 1);
        const isClickAdjacent =
          clickedIndex !== null &&
          (clickedIndex === separatorIndex || clickedIndex === separatorIndex + 1);

        const shouldSpin = isHoverAdjacent || isClickAdjacent;
        const shouldBePink = shouldSpin;

        return (
          <span
            key={item.label}
            className="nav-bar-item-wrapper"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            {/* Symbol separator before item */}
            {index > 0 && (
              <span
                className="nav-bar-sparkle"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 6px",
                }}
              >
                <NavSymbol
                  key={`symbol-${separatorIndex}-${hoveredIndex ?? ""}-${clickedIndex ?? ""}`}
                  rotating={shouldSpin}
                  isPink={shouldBePink}
                />
              </span>
            )}

            {/* Nav Item */}
            <div
              style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            >
              {item.to ? (
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  aria-current={isActive ? "page" : undefined}
                  className="nav-bar-link"
                  style={{
                    display: "inline-block",
                    padding: "0 8px",
                    fontFamily: "'Cravelo DEMO', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    color: "#1E1E1E",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-bar-link"
                  style={{
                    display: "inline-block",
                    padding: "0 8px",
                    fontFamily: "'Cravelo DEMO', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    color: "#1E1E1E",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </a>
              )}

              {/* Active underline (#CC4262 stroke from Figma) */}
              <AnimatePresence>
                {isActive && (
                  <m.span
                    layoutId="nav-active-underline"
                    className="nav-active-underline"
                    style={{
                      position: "absolute",
                      bottom: -6,
                      left: 8,
                      right: 8,
                      height: 1.5,
                      background: "#CC4262",
                      borderRadius: 1,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </AnimatePresence>
            </div>
          </span>
        );
      })}
    </nav>
  );
}

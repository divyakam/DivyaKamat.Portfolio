import { BlurReveal } from "./BlurReveal";
import { InlineChip } from "./InlineChip";
import { Sparkle } from "@/components/nav/Sparkle";
import { useFontsReady } from "@/hooks/useFontsReady";

import chip1 from "@/assets/Screenshot 2026-09-19 184655.png";
import chip2 from "@/assets/Screenshot 2026-09-19 185903.png";
import chip3 from "@/assets/Screenshot 2026-09-19 190318.png";

/**
 * Tagline — §8.3
 * Display tagline matching reference artwork:
 * Line 1: ● Product [chip1] Designer
 * Line 2: crafting [Tulip] design solutions [chip2]
 * Line 3: and [chip3] visual stories [Smiley]
 */

// Tulip SVG — yellow petals with green stem & leaf
function Tulip() {
  return (
    <svg
      width="0.82em"
      height="0.82em"
      viewBox="0 0 36 40"
      fill="none"
      aria-hidden="true"
      style={{
        display: "inline-block",
        verticalAlign: "-0.08em",
        margin: "0 0.12em",
      }}
    >
      <path
        d="M18 4C13 4 8 9 8 16C8 20 11 23 18 24C25 23 28 20 28 16C28 9 23 4 18 4Z"
        fill="#F4CF38"
      />
      <path
        d="M18 4C14.5 10 14.5 17 18 24"
        stroke="#D9A414"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M18 24V36"
        stroke="#4A8B57"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M18 30C13 28 9 30 9 33"
        stroke="#4A8B57"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Smiley SVG — light yellow disc with ink outline and smile
function Smiley() {
  return (
    <svg
      width="0.82em"
      height="0.82em"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      style={{
        display: "inline-block",
        verticalAlign: "-0.08em",
        margin: "0 0.12em",
      }}
    >
      <circle cx="18" cy="18" r="16" fill="#EDF4C2" stroke="#2D3142" strokeWidth="2" />
      <circle cx="13" cy="14" r="2" fill="#2D3142" />
      <circle cx="23" cy="14" r="2" fill="#2D3142" />
      <path
        d="M12 21.5C14 25.5 22 25.5 24 21.5"
        stroke="#2D3142"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Tagline() {
  const fontsReady = useFontsReady();

  const fullTextAccessibility = "Product Designer crafting design solutions and visual stories";

  if (!fontsReady) {
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "var(--fs-tagline)",
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
          fontFamily: "var(--ff-display)",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        {fullTextAccessibility}
      </div>
    );
  }

  const tokens: React.ReactNode[] = [
    // Top dot accent + Line 1
    <span
      key="dot"
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "0.22em",
        height: "0.22em",
        borderRadius: "50%",
        backgroundColor: "#2D3142",
        verticalAlign: "0.35em",
        marginRight: "0.3em",
      }}
    />,
    "Product",
    <InlineChip key="chip1" src={chip1} alt="Terrace photo" direction={1} />,
    "Designer",
    <br key="br1" className="hidden-mobile" />,
    // Line 2
    <em key="crafting" style={{ fontStyle: "italic", marginRight: "0.05em" }}>
      crafting
    </em>,
    <Tulip key="tulip" />,
    "design solutions",
    <InlineChip key="chip2" src={chip2} alt="Blue painting photo" direction={-1} />,
    <br key="br2" className="hidden-mobile" />,
    // Line 3
    "and",
    <InlineChip key="chip3" src={chip3} alt="Airplane sunset photo" direction={1} />,
    <em key="visual-stories" style={{ fontStyle: "italic", marginLeft: "0.05em" }}>
      visual stories
    </em>,
    <Smiley key="smiley" />,
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        aria-label={fullTextAccessibility}
        style={{
          fontFamily: "var(--ff-display)",
          fontSize: "var(--fs-tagline)",
          fontWeight: 400,
          lineHeight: 1.18,
          letterSpacing: "-0.01em",
          color: "#383E52",
          margin: 0,
        }}
      >
        <BlurReveal>
          {tokens}
        </BlurReveal>
      </h2>

      {/* Subtext */}
      <div
        style={{
          marginTop: 36,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <BlurReveal delay={1.4} stagger={0.07}>
          {[
            <Sparkle key="sparkle" size={12} fill="var(--accent)" />,
            <span
              key="subtext"
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "var(--fs-mono-nav)",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "var(--ink-2)",
              }}
            >
              Always curious, always creative.
            </span>,
          ]}
        </BlurReveal>
      </div>
    </div>
  );
}

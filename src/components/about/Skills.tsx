import { useState } from "react";
import { m } from "motion/react";
import { designTools, spatialTools, researchMethods, type SkillTool } from "@/data/skills";

/**
 * Skills & Toolkit
 * Styled to match the NavBar aesthetic:
 * - Capsule / pill shape: borderRadius 158, background #FEFEFE, border 1px solid #5D5D5D
 * - Typography: Cravelo DEMO, uppercase, color #1E1E1E, letterSpacing 0.04em
 * - Box shadow: 0 2px 10px rgba(0, 0, 0, 0.03)
 * - Hover accents: Royal blue (#1D17CB) and pink (#FF2A7A)
 */

function ToolPill({ tool }: { tool: SkillTool }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = tool.color
    ? `https://cdn.simpleicons.org/${tool.icon}/${tool.color}`
    : `https://cdn.simpleicons.org/${tool.icon}`;

  return (
    <m.div
      className="nav-styled-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        height: 46,
        padding: "0 20px 0 14px",
        background: "#FEFEFE",
        border: "1px solid #5D5D5D",
        borderRadius: 158,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
        cursor: "default",
        userSelect: "none",
        transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
      }}
      whileHover={{
        borderColor: "#1D17CB",
        y: -2,
        boxShadow: "0 4px 14px rgba(29, 23, 203, 0.12)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Icon Container */}
      <div
        style={{
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {!imgError ? (
          <img
            src={iconUrl}
            alt={`${tool.name} logo`}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : tool.deviconClass ? (
          <i className={`${tool.deviconClass} colored`} style={{ fontSize: 20 }} />
        ) : (
          <span
            style={{
              fontFamily: "'Cravelo DEMO', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              color: "#1E1E1E",
            }}
          >
            {tool.name[0]}
          </span>
        )}
      </div>

      <span
        style={{
          fontFamily: "'Cravelo DEMO', sans-serif",
          fontSize: "1.02rem",
          fontWeight: 400,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#1E1E1E",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {tool.name}
      </span>
    </m.div>
  );
}

function MethodPill({ name }: { name: string }) {
  return (
    <m.span
      className="nav-styled-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 42,
        padding: "0 18px",
        background: "#FEFEFE",
        border: "1px solid #5D5D5D",
        borderRadius: 158,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
        fontFamily: "'Cravelo DEMO', sans-serif",
        fontSize: "0.96rem",
        fontWeight: 400,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "#1E1E1E",
        cursor: "default",
        userSelect: "none",
        whiteSpace: "nowrap",
        transition: "border-color 200ms ease, box-shadow 200ms ease, color 200ms ease, transform 200ms ease",
      }}
      whileHover={{
        borderColor: "#FF2A7A",
        color: "#FF2A7A",
        y: -2,
        boxShadow: "0 4px 14px rgba(255, 42, 122, 0.12)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      {name}
    </m.span>
  );
}

export function Skills() {
  return (
    <section aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="skills-heading"
        style={{
          fontFamily: "'Cravelo DEMO', sans-serif",
          fontSize: "clamp(2rem, 3.2vw, 3.4rem)",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#1E1E1E",
          margin: "0 0 28px 0",
          textAlign: "left",
        }}
      >
        Skills & Toolkit
      </h2>

      {/* Design tools */}
      <div style={{ marginTop: 24 }}>
        <h3
          className="skills-subheading"
          style={{
            fontFamily: "'Cravelo DEMO', sans-serif",
            fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#1E1E1E",
            margin: "0 0 16px 0",
            textAlign: "left",
          }}
        >
          Design Tools
        </h3>
        <div
          className="skills-pills-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}
        >
          {designTools.map((tool) => (
            <ToolPill key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Spatial and interactive */}
      <div style={{ marginTop: 36 }}>
        <h3
          className="skills-subheading"
          style={{
            fontFamily: "'Cravelo DEMO', sans-serif",
            fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#1E1E1E",
            margin: "0 0 16px 0",
            textAlign: "left",
          }}
        >
          Spatial & Interactive
        </h3>
        <div
          className="skills-pills-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}
        >
          {spatialTools.map((tool) => (
            <ToolPill key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Research and strategy */}
      <div style={{ marginTop: 36, marginBottom: 24 }}>
        <h3
          className="skills-subheading"
          style={{
            fontFamily: "'Cravelo DEMO', sans-serif",
            fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#1E1E1E",
            margin: "0 0 16px 0",
            textAlign: "left",
          }}
        >
          Research & Strategy
        </h3>
        <div
          className="skills-pills-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
          }}
        >
          {researchMethods.map((method) => (
            <MethodPill key={method.name} name={method.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

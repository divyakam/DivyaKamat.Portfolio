import { useState } from "react";
import { m } from "motion/react";
import { designTools, spatialTools, researchMethods, type SkillTool } from "@/data/skills";

/**
 * Skills — §8.9.3
 * Three groups: Design tools (with Devicon & SimpleIcon logos),
 * Spatial & interactive tools (with high-contrast badge logos), and Research & strategy (chips).
 */

function ToolTile({ tool }: { tool: SkillTool }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = tool.color
    ? `https://cdn.simpleicons.org/${tool.icon}/${tool.color}`
    : `https://cdn.simpleicons.org/${tool.icon}`;

  return (
    <m.div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 56,
        padding: "0 18px",
        background: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: 16,
        cursor: "default",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
      }}
      whileHover={{
        borderColor: "#1D17CB",
        y: -3,
        boxShadow: "0 6px 20px rgba(29, 23, 203, 0.08)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Icon Container */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: tool.badgeBg || "#F5F3EF",
          border: tool.badgeBg ? "1px solid rgba(0,0,0,0.8)" : "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: 6,
          boxSizing: "border-box",
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
              fontFamily: "var(--ff-mono)",
              fontSize: 13,
              fontWeight: 700,
              color: tool.badgeBg ? "#fff" : "#1E1E1E",
            }}
          >
            {tool.name[0]}
          </span>
        )}
      </div>

      <span
        style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "#1E1E1E",
        }}
      >
        {tool.name}
      </span>
    </m.div>
  );
}

function MethodChip({ name }: { name: string }) {
  return (
    <m.span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 38,
        padding: "0 18px",
        background: "#ffffff",
        border: "1px solid rgba(30, 30, 30, 0.7)",
        borderRadius: 9999,
        fontFamily: "'Epilogue', sans-serif",
        fontSize: "0.92rem",
        fontWeight: 400,
        color: "#1E1E1E",
        cursor: "default",
        transition: "border-color 160ms, color 160ms, transform 160ms, box-shadow 160ms",
      }}
      whileHover={{
        borderColor: "#FF2A7A",
        color: "#FF2A7A",
        y: -2,
        boxShadow: "0 4px 12px rgba(255, 42, 122, 0.12)",
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
        style={{
          fontFamily: "'Cravelo DEMO', sans-serif",
          fontSize: "clamp(2rem, 3.2vw, 3.4rem)",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#1E1E1E",
          margin: "0 0 28px 0",
        }}
      >
        Skills & Toolkit
      </h2>

      {/* Design tools */}
      <div style={{ marginTop: 24 }}>
        <h3
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#1E1E1E",
            margin: "0 0 16px 0",
          }}
        >
          Design Tools
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))",
            gap: 14,
          }}
        >
          {designTools.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Spatial and interactive */}
      <div style={{ marginTop: 36 }}>
        <h3
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#1E1E1E",
            margin: "0 0 16px 0",
          }}
        >
          Spatial & Interactive
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))",
            gap: 14,
          }}
        >
          {spatialTools.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Research and strategy */}
      <div style={{ marginTop: 36, marginBottom: 24 }}>
        <h3
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#1E1E1E",
            margin: "0 0 16px 0",
          }}
        >
          Research & Strategy
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {researchMethods.map((method) => (
            <MethodChip key={method.name} name={method.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

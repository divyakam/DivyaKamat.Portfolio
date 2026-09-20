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
        padding: "0 16px",
        background: "#fff",
        border: "var(--border)",
        borderRadius: 20,
        cursor: "default",
        transition: "border-color 160ms, transform 160ms, box-shadow 160ms",
      }}
      whileHover={{
        borderColor: "var(--accent)",
        y: -2,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
      }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Icon Container */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: tool.badgeBg || "var(--surface)",
          border: tool.badgeBg ? "1px solid rgba(0,0,0,0.8)" : "1px solid var(--line)",
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
              color: tool.badgeBg ? "#fff" : "var(--ink)",
            }}
          >
            {tool.name[0]}
          </span>
        )}
      </div>

      <span
        style={{
          fontFamily: "var(--ff-body)",
          fontSize: 15,
          fontWeight: 500,
          color: "var(--ink)",
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
        height: 40,
        padding: "0 16px",
        background: "#fff",
        border: "1px solid var(--line-strong)",
        borderRadius: 9999,
        fontFamily: "var(--ff-body)",
        fontSize: 14,
        fontWeight: 500,
        color: "var(--ink)",
        cursor: "default",
        transition: "border-color 160ms, background 160ms, transform 160ms",
      }}
      whileHover={{
        borderColor: "var(--ink)",
        background: "var(--surface)",
        y: -2,
      }}
      whileTap={{ scale: 0.96 }}
    >
      {name}
    </m.span>
  );
}

export function Skills() {
  return (
    <section>
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
        Skills
      </h2>

      {/* Design tools */}
      <div style={{ marginTop: 32 }}>
        <h3
          style={{
            fontFamily: "var(--ff-heading)",
            fontSize: "var(--fs-h3)",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: "0 0 16px 0",
          }}
        >
          Design tools
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {designTools.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Spatial and interactive */}
      <div style={{ marginTop: 40 }}>
        <h3
          style={{
            fontFamily: "var(--ff-heading)",
            fontSize: "var(--fs-h3)",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: "0 0 16px 0",
          }}
        >
          Spatial and interactive
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {spatialTools.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Research and strategy */}
      <div style={{ marginTop: 40 }}>
        <h3
          style={{
            fontFamily: "var(--ff-heading)",
            fontSize: "var(--fs-h3)",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: "0 0 16px 0",
          }}
        >
          Research and strategy
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
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

import { useState, useRef } from "react";
import { m } from "motion/react";
import { site } from "@/data/site.config";

import cartoonBase from "@/assets/logo/cartoon_base.png";
import cartoonHover from "@/assets/logo/cartoon_hover.png";

/**
 * HeroLeft — Figma landing page left panel
 * - Cartoon avatar (switches base→hover on mouse over)
 * - "DIVYA KAMAT" (Montecatini Pro, pink #FF2A7A, large)
 * - "Experience Designer" (Cravelo DEMO, blue #1D17CB)
 * - Bio paragraph (Epilogue, dark)
 * - Tag chips (New Media, Interaction Design, Creative Technology, XR Design)
 * - "View Resume" underlined link
 * - Soft pink spotlight glow on hover tracking pointer
 */
export function HeroLeft({ className = "" }: { className?: string }) {
  const [cartoonHovered, setCartoonHovered] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <aside
      ref={panelRef}
      aria-label="Introduction"
      className={`dot-grid ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setMousePos(null);
      }}
      style={{
        backgroundColor: "#fcf9f5ff",
        position: "relative",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "clamp(24px, 4vh, 48px) clamp(20px, 2.8vw, 36px)",
        borderRight: "1px solid var(--line)",
        overflow: "hidden",
        gap: "clamp(12px, 2vh, 18px)",
      }}
    >
      {/* Pointer Tracking Soft Pink Glow */}
      {isHovered && mousePos && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(222, 50, 96, 0.08), transparent 80%)`,
            transition: "opacity 250ms ease",
          }}
        />
      )}

      {/* Cartoon avatar — switches on hover */}
      <m.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setCartoonHovered(true)}
        onHoverEnd={() => setCartoonHovered(false)}
        style={{
          position: "relative",
          zIndex: 1,
          width: "clamp(76px, 8.5vw, 120px)",
          height: "clamp(76px, 8.5vw, 120px)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        {/* Base cartoon */}
        <m.img
          src={cartoonBase}
          alt="Divya Kamat cartoon"
          animate={{ opacity: cartoonHovered ? 0 : 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
        {/* Hover cartoon */}
        <m.img
          src={cartoonHover}
          alt="Divya Kamat cartoon hover"
          animate={{ opacity: cartoonHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </m.div>

      {/* "DIVYA KAMAT" — large pink display */}
      <m.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'Montecatini Pro', serif",
          fontSize: "clamp(3.4rem, 6.5vw, 5.9rem)",
          fontWeight: 600,
          lineHeight: 0.92,
          color: "#FF2A7A",
          margin: 0,
          letterSpacing: "0.01em",
        }}
      >
        DIVYA<br />KAMAT
      </m.h1>

      {/* Role */}
      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'Cravelo DEMO', sans-serif",
          fontSize: "clamp(1.3rem, 2.1vw, 1.8rem)",
          fontWeight: 400,
          lineHeight: 1.2,
          color: "#1D17CB",
          margin: 0,
          letterSpacing: "0.02em",
        }}
      >
        Experience Designer
      </m.p>

      {/* Tag chips — 2 rows of 2 */}
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(6px, 1vh, 8px)",
        }}
      >
        <div style={{ display: "flex", gap: "clamp(6px, 0.8vw, 8px)", flexWrap: "wrap" }}>
          {["New Media", "Interaction Design"].map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "clamp(26px, 2vw, 32px)",
                padding: "0 clamp(10px, 1vw, 14px)",
                background: "transparent",
                border: "1px solid #1E1E1E",
                borderRadius: 9999,
                fontFamily: "'Epilogue', sans-serif",
                fontSize: "clamp(11px, 1vw, 13px)",
                fontWeight: 400,
                color: "#1E1E1E",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "clamp(6px, 0.8vw, 8px)", flexWrap: "wrap" }}>
          {["Creative Technology", "XR Design"].map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "clamp(26px, 2vw, 32px)",
                padding: "0 clamp(10px, 1vw, 14px)",
                background: "transparent",
                border: "1px solid #1E1E1E",
                borderRadius: 9999,
                fontFamily: "'Epilogue', sans-serif",
                fontSize: "clamp(11px, 1vw, 13px)",
                fontWeight: 400,
                color: "#1E1E1E",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </m.div>

      {/* View Resume link */}
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
            fontWeight: 500,
            color: "#000000",
            textDecoration: "underline",
            textUnderlineOffset: 4,
            textDecorationThickness: "1.5px",
            cursor: "pointer",
            transition: "color 150ms",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF2A7A"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#000000"; }}
        >
          View Resume
        </a>
      </m.div>
    </aside>
  );
}

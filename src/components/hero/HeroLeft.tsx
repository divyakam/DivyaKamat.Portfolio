import { useState, useRef } from "react";
import { m } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { WaveEmoji } from "./WaveEmoji";
import { RolePill } from "./RolePill";
import { BlurReveal } from "@/components/home/BlurReveal";
import { site } from "@/data/site.config";

/**
 * HeroLeft — §8.2
 * Interactive persistent left panel featuring:
 * - Fun handwritten Gochi Hand typography accent
 * - Staggered BlurReveal typography animations for greeting and H1 text
 * - Interactive pointer tracking spotlight glow
 * - Micro-interactive role pills and waving hand
 * - Interactive resume CTA button with animated arrow badge
 */
export function HeroLeft({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const h1Words = site.heroH1.split(" ");

  return (
    <aside
      ref={containerRef}
      aria-label="Introduction"
      className={`dot-grid ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setMousePos(null);
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
        height: "100%",
        padding: "clamp(32px, 5vh, 56px) clamp(24px, 3vw, 48px)",
        borderRight: "1px solid var(--line)",
        overflow: "hidden",
      }}
    >
      {/* Interactive Spotlight background glow */}
      {isHovered && mousePos && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(222, 50, 96, 0.09), transparent 80%)`,
            transition: "opacity 300ms ease",
          }}
        />
      )}

      {/* Main content wrapper */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
        {/* Fun Handwritten Greeting */}
        <div style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <m.p
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            style={{
              fontFamily: "var(--ff-hand)",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--accent)",
              margin: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textShadow: "0 2px 12px rgba(222, 50, 96, 0.15)",
            }}
          >
            <span>{site.heroGreeting}!</span>
            <WaveEmoji />
          </m.p>
        </div>

        {/* H1 Heading with BlurReveal stagger per word */}
        <h1
          style={{
            fontFamily: "var(--ff-heading)",
            fontSize: "var(--fs-hero-h1)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: 0,
          }}
        >
          <BlurReveal delay={0.2} stagger={0.05}>
            {h1Words.map((word, i) => {
              // Add fun handwriting accent to "fun" or "passionate"
              const isFunWord = word.toLowerCase().includes("fun") || word.toLowerCase().includes("passionate");
              if (isFunWord) {
                return (
                  <span
                    key={i}
                    style={{
                      fontFamily: "var(--ff-hand)",
                      fontSize: "1.2em",
                      color: "var(--accent)",
                      fontWeight: 400,
                      display: "inline-block",
                      transform: "rotate(-2deg)",
                      padding: "0 2px",
                    }}
                  >
                    {word}
                  </span>
                );
              }
              return <span key={i}>{word}</span>;
            })}
          </BlurReveal>
        </h1>

        {/* Fun Handwritten Note Annotation */}
        <m.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--ff-hand)",
            fontSize: "1.15rem",
            color: "var(--ink-2)",
            transform: "rotate(-1deg)",
          }}
        >
          <Sparkles size={16} style={{ color: "var(--accent)" }} />
          <span>designing experiences & digital playgrounds ~</span>
        </m.div>

        {/* Interactive Role Pills with BlurReveal stagger */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          <BlurReveal delay={0.55} stagger={0.07}>
            {site.roles.map((role) => (
              <RolePill key={role.label} label={role.label} icon={role.icon} />
            ))}
          </BlurReveal>
        </div>

        {/* Interactive Resume Link */}
        <m.div
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 8 }}
        >
          <Link
            to="/resume"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--ff-body)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--ink)",
              textDecoration: "none",
              padding: "6px 0",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <m.span
              style={{
                position: "relative",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                textDecorationThickness: "1.5px",
                transition: "color 150ms",
              }}
              whileHover={{
                color: "var(--accent)",
              }}
            >
              View resume
            </m.span>
            <m.span
              whileHover={{ x: 3, y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ display: "inline-flex" }}
            >
              <ArrowUpRight size={18} strokeWidth={2} style={{ color: "var(--accent)" }} />
            </m.span>
          </Link>
        </m.div>
      </div>
    </aside>
  );
}

import { m } from "motion/react";
import flowerSymbol from "@/assets/logo/flower_symbol.png";
import { Skills } from "@/components/about/Skills";

/**
 * AboutView — Exact Figma "about me" page (#119:350)
 * Fit-to-screen desktop layout matching Figma frame:
 * - "A LITTLE BIT ABOUT ME" heading at top-left
 * - 3-part layout:
 *   1. Portrait photo of Divya
 *   2. Pink "DIVYA KAMAT" (Montecatini Pro Stretto) + Bio paragraphs directly below
 *   3. Cravelo DEMO blue quote ("An ongoing experiment in being.") + flower_symbol
 */
export function AboutView() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1560,
        margin: "0 auto",
        padding: "0 clamp(16px, 3vw, 44px) 16px",
        boxSizing: "border-box",
      }}
    >
      {/* Top Heading */}
      <m.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "'Cravelo DEMO', sans-serif",
          fontSize: "clamp(2.4rem, 3.8vw, 4.2rem)",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#1E1E1E",
          textAlign: "left",
          margin: "clamp(18px, 3vh, 36px) 0 clamp(40px, 6vh, 68px) 0",
        }}
      >
        A Little Bit About Me
      </m.h1>

      {/* Main 3-part layout: [Portrait] [Name + Bio] [Quote + Flower] */}
      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "clamp(230px, 20vw, 300px) minmax(340px, 1.4fr) auto",
          gap: "clamp(16px, 2.2vw, 36px)",
          alignItems: "stretch",
        }}
      >
        {/* Column 1: Portrait */}
        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "405 / 487",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            background: "#1E1E1E",
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          <img
            src="/divya-portrait.png"
            alt="Divya Kamat"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </m.div>

        {/* Column 2: Overlapping pink Name + Bio Paragraphs (ends on same bottom line as portrait) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            height: "100%",
          }}
        >
          {/* "DIVYA KAMAT" overlapping the portrait photo */}
          <m.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 0.88,
              position: "relative",
              zIndex: 10,
              marginLeft: "clamp(-140px, -11vw, -75px)",
              marginTop: "clamp(-32px, -3.8vh, -18px)",
              width: "max-content",
            }}
          >
            <span
              style={{
                fontFamily: "'Montecatini Pro', serif",
                fontSize: "clamp(3.2rem, 5vw, 5.8rem)",
                fontWeight: 600,
                color: "#FF2A7A",
                letterSpacing: "0.01em",
              }}
            >
              DIVYA
            </span>
            <span
              style={{
                fontFamily: "'Montecatini Pro', serif",
                fontSize: "clamp(3.2rem, 5vw, 5.8rem)",
                fontWeight: 600,
                color: "#FF2A7A",
                letterSpacing: "0.01em",
                paddingLeft: "clamp(36px, 4vw, 72px)",
              }}
            >
              KAMAT
            </span>
          </m.div>

          {/* Bio text (anchored to bottom to end on exact same line as portrait image) */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px, 1.2vh, 12px)",
              maxWidth: 680,
            }}
          >
            <p
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: "clamp(0.92rem, 1.06vw, 1.15rem)",
                fontWeight: 400,
                lineHeight: 1.46,
                color: "#1E1E1E",
                margin: 0,
              }}
            >
              I enjoy experimenting across different mediums to create design solutions that feel purposeful and like they actually belong. My work focuses on how people experience, interact with, and connect with what I create.
            </p>
            <p
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: "clamp(0.92rem, 1.06vw, 1.15rem)",
                fontWeight: 400,
                lineHeight: 1.46,
                color: "#1E1E1E",
                margin: 0,
              }}
            >
              With a background in Computer Applications and a Master’s in Immersive Media Design, I explore ways to integrate emerging technologies into design. My process begins with research and shaping experiences that feel meaningful, contextual and natural to their surroundings. I’m interested in the space between how things work and how they feel.
            </p>
          </m.div>
        </div>

        {/* Column 3: Quote + Flower (side by side, reduced gap, no right padding, h2 placed higher) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "clamp(-48px, -4.5vw, -26px)",
            alignSelf: "center",
            marginRight: 0,
            paddingRight: 0,
            flexShrink: 0,
          }}
        >
          <m.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              fontFamily: "'Cravelo DEMO', sans-serif",
              fontSize: "clamp(1.4rem, 1.9vw, 2.1rem)",
              fontWeight: 400,
              lineHeight: 1.12,
              color: "#1D17CB",
              margin: 0,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transform: "translateY(clamp(-22px, -3vh, -12px))",
            }}
          >
            An ongoing
            <br />
            experiment
            <br />
            in being.
          </m.h2>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              width: "clamp(115px, 11vw, 160px)",
              height: "clamp(115px, 11vw, 160px)",
              flexShrink: 0,
            }}
          >
            <img
              src={flowerSymbol}
              alt="Flower symbol"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </m.div>
        </div>
      </div>

      {/* Skills Component under the about grid */}
      <div
        style={{
          marginTop: "clamp(64px, 10vh, 104px)",
          paddingTop: "clamp(36px, 5vh, 52px)",
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Skills />
      </div>
    </div>
  );
}

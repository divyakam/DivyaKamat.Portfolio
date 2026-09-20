import { useRef, useState } from "react";
import { m } from "motion/react";
import { Shuffle, Sparkles } from "lucide-react";
import { site } from "@/data/site.config";

/**
 * Wall — §8.9.1
 * Graph-paper collage canvas with interactive sticker-style items.
 * Features:
 * - "Jumble & Organize": Clicking anywhere on the wall or clicking the Jumble button
 *   causes all elements to explode in a wild 360° random scatter pattern across the screen,
 *   and then smoothly spring back into clean, organized landing positions!
 * - Full drag-and-drop interactivity on stickers
 * - Responsive 14/9 desktop canvas & un-cramped mobile layout
 */

function getExplodeKeyframes(id: string, triggerCount: number, baseRotate: number = 0) {
  if (triggerCount === 0) {
    return {
      x: 0,
      y: 0,
      rotate: baseRotate,
      scale: 1,
    };
  }

  // Deterministic pseudo-random seed per item per trigger
  const seed = (triggerCount * 1009) + (id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) * 31);
  const pseudoRand1 = ((Math.sin(seed) * 10000) % 1); // -0.5 to 0.5
  const pseudoRand2 = ((Math.cos(seed * 2) * 10000) % 1);
  const pseudoRand3 = ((Math.sin(seed * 3) * 10000) % 1);

  // Wild scatter offsets across screen boundaries
  const scatterX = pseudoRand1 * 550; // -275px to +275px
  const scatterY = pseudoRand2 * 450; // -225px to +225px
  const spinAngle = pseudoRand3 > 0 ? 360 + pseudoRand3 * 360 : -360 + pseudoRand3 * 360; // 360deg to 720deg spin!
  const burstScale = 0.6 + Math.abs(pseudoRand1) * 1.3; // 0.6x to 1.9x burst scale!

  // Organised landing position tilt (+/- 4 degrees around baseRotate)
  const landingRotate = baseRotate + (pseudoRand2 * 6);

  return {
    x: [0, scatterX, 0],
    y: [0, scatterY, 0],
    rotate: [baseRotate, baseRotate + spinAngle, landingRotate],
    scale: [1, burstScale, 1],
  };
}

const explodeTransition = {
  duration: 1.25,
  times: [0, 0.42, 1],
  ease: ["easeInOut", "easeOut"] as any,
};

export function Wall() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [jumbleCount, setJumbleCount] = useState(0);

  const handleJumble = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setJumbleCount((prev) => prev + 1);
  };

  return (
    <div
      ref={canvasRef}
      className="graph-paper"
      onClick={() => handleJumble()}
      title="Click anywhere to burst and organize the wall!"
      style={{
        position: "relative",
        borderRadius: 24,
        border: "1px solid var(--line)",
        overflow: "hidden",
        containerType: "inline-size",
        width: "100%",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* Floating Control Toolbar */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <m.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(18, 18, 20, 0.88)" }}
          whileTap={{ scale: 0.94 }}
          onClick={handleJumble}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            background: "rgba(18, 18, 20, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: 9999,
            fontFamily: "var(--ff-heading)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
            transition: "background-color 200ms ease, border-color 200ms ease",
          }}
        >
          <Shuffle size={14} strokeWidth={2} />
          <span>Jumble & Organize</span>
        </m.button>
      </div>

      {/* Background Hint Pill */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 12,
          left: 16,
          zIndex: 45,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(6px)",
          borderRadius: 9999,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <Sparkles size={13} color="var(--accent)" />
        <span
          style={{
            fontFamily: "var(--ff-mono)",
            fontSize: 11,
            fontWeight: 500,
            color: "var(--ink-2)",
          }}
        >
          Click anywhere to burst & organize wall!
        </span>
      </div>

      {/* ============================================================
          DESKTOP CANVAS (>= 768px)
          ============================================================ */}
      <div
        className="wall-desktop-canvas"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "14 / 9",
        }}
      >
        {/* 1. Spotify card — left side */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("spotify-dt", jumbleCount, -5)}
          transition={explodeTransition}
          whileHover={{ scale: 1.02, zIndex: 15 }}
          whileDrag={{ scale: 1.05, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "2%",
            top: "0%",
            width: "31.5%",
            zIndex: 2,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "var(--shadow-sticker)",
              background: "#282828",
              minHeight: 152,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <iframe
              title="Spotify embed"
              src={`https://open.spotify.com/embed/track/${site.spotifyTrackId}?theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="encrypted-media"
              loading="lazy"
              style={{ borderRadius: 20, border: "none" }}
            />
          </div>
        </m.div>

        {/* 2. "Know more about me…" window */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("window-dt", jumbleCount, 5)}
          transition={explodeTransition}
          whileHover={{ scale: 1.03, zIndex: 15 }}
          whileDrag={{ scale: 1.05, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "43%",
            top: "1.5%",
            width: "23%",
            zIndex: 3,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              border: "2px solid #000",
              borderRadius: 20,
              background: "#fff",
              boxShadow: "var(--shadow-sticker)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 24,
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "1px solid #000",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#000" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#D6D6D6" }} />
            </div>
            <div
              style={{
                padding: "16px 12px",
                textAlign: "center",
                fontFamily: "var(--ff-wall-serif)",
                fontSize: "clamp(14px, 2.5cqw, 30px)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "var(--ink)",
              }}
            >
              Know more about me…
            </div>
            <div style={{ height: 10, background: "var(--surface)" }} />
          </div>
        </m.div>

        {/* 3. "This is my wall" sign */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("sign-dt", jumbleCount, 6)}
          transition={explodeTransition}
          whileHover={{ scale: 1.05, zIndex: 15 }}
          whileDrag={{ scale: 1.08, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "74%",
            top: "0%",
            width: "21%",
            zIndex: 3,
            transformOrigin: "top center",
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ textAlign: "center", marginBottom: -2 }}>
            <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
              <circle cx="50" cy="4" r="5" fill="#fff" stroke="#000" strokeWidth="2" />
              <line x1="30" y1="18" x2="48" y2="6" stroke="#000" strokeWidth="2" />
              <line x1="70" y1="18" x2="52" y2="6" stroke="#000" strokeWidth="2" />
            </svg>
          </div>
          <div
            style={{
              background: "var(--accent)",
              border: "2px solid #000",
              borderRadius: 20,
              padding: "8px 20px",
              boxShadow: "var(--shadow-sticker)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--ff-hand)",
                fontSize: "var(--fs-hand-sign)",
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              This is my wall
            </span>
          </div>
        </m.div>

        {/* 4. Smiley doodle */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("smiley-dt", jumbleCount, -4)}
          transition={explodeTransition}
          whileHover={{ scale: 1.15, zIndex: 15 }}
          whileDrag={{ scale: 1.2, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "6%",
            top: "38%",
            width: "9.5%",
            zIndex: 1,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 60 60" fill="none" strokeWidth="3" stroke="var(--ink)" strokeLinecap="round" aria-hidden="true">
            <circle cx="30" cy="30" r="26" />
            <circle cx="22" cy="24" r="3" fill="var(--ink)" stroke="none" />
            <circle cx="38" cy="24" r="3" fill="var(--ink)" stroke="none" />
            <path d="M20 38C23 44 37 44 40 38" />
          </svg>
        </m.div>

        {/* 5. Photo card (hero of the wall) */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("photo-dt", jumbleCount, 4)}
          transition={explodeTransition}
          whileHover={{ scale: 1.03, zIndex: 15 }}
          whileDrag={{ scale: 1.05, zIndex: 60, boxShadow: "var(--shadow-lift)" }}
          style={{
            position: "absolute",
            left: "31%",
            top: "37%",
            width: "39.5%",
            zIndex: 4,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "var(--shadow-lift)",
              aspectRatio: "1.15 / 1",
              background: "var(--surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--ff-mono)",
              fontSize: 13,
              color: "var(--ink-3)",
            }}
          >
            Owner Photo
          </div>

          {/* "she/her" chip */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-6%",
              left: "-4%",
              transform: "rotate(-4deg)",
              zIndex: 6,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 24,
                padding: "0 10px",
                background: "var(--ink)",
                color: "#fff",
                fontFamily: "var(--ff-mono)",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 9999,
              }}
            >
              she/her
            </span>
          </div>

          {/* "You" cursor */}
          <m.div
            aria-hidden="true"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            style={{
              position: "absolute",
              top: "52%",
              left: "12%",
              zIndex: 6,
            }}
          >
            <svg width="16" height="22" viewBox="0 0 16 22" fill="var(--accent)" stroke="#fff" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 1L1 18L5.5 13.5L9.5 21L12 19.5L8 12L14 11L1 1Z" />
            </svg>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 22,
                padding: "0 8px",
                background: "var(--accent)",
                color: "#fff",
                fontFamily: "var(--ff-mono)",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 9999,
                marginLeft: 2,
                marginTop: -4,
              }}
            >
              You
            </span>
          </m.div>
        </m.div>

        {/* 6. Heart doodle */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("heart-dt", jumbleCount, 8)}
          transition={explodeTransition}
          whileHover={{ scale: 1.15, zIndex: 15 }}
          whileTap={{ scale: 1.25 }}
          whileDrag={{ scale: 1.2, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "86%",
            top: "36%",
            width: "8%",
            zIndex: 1,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 60 55" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M30 50C30 50 5 35 5 18C5 8 13 3 20 3C25 3 28 6 30 10C32 6 35 3 40 3C47 3 55 8 55 18C55 35 30 50 30 50Z" />
          </svg>
        </m.div>

        {/* 7. Halo circle (behind trophy) */}
        <div
          style={{
            position: "absolute",
            left: "0%",
            top: "58%",
            width: "27%",
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              paddingBottom: "100%",
              borderRadius: "50%",
              background: "rgba(255,255,255,.7)",
            }}
          />
        </div>

        {/* 8. Trophy card */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("trophy-dt", jumbleCount, -10)}
          transition={explodeTransition}
          whileHover={{ scale: 1.05, zIndex: 15 }}
          whileDrag={{ scale: 1.08, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "4%",
            top: "63%",
            width: "18.5%",
            zIndex: 2,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              background: "var(--ink)",
              borderRadius: 20,
              padding: 16,
              aspectRatio: "1 / 0.95",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <path d="M18 10H38V26C38 32 34 38 28 38C22 38 18 32 18 26V10Z" stroke="#fff" strokeWidth="2.5" fill="none" />
              <path d="M18 16H10C10 22 14 26 18 26" stroke="#fff" strokeWidth="2" fill="none" />
              <path d="M38 16H46C46 22 42 26 38 26" stroke="#fff" strokeWidth="2" fill="none" />
              <line x1="28" y1="38" x2="28" y2="46" stroke="#fff" strokeWidth="2.5" />
              <rect x="20" y="44" width="16" height="4" rx="2" fill="#fff" />
              <polygon points="28,14 30,20 36,20 31,24 33,30 28,26 23,30 25,24 20,20 26,20" fill="var(--accent)" />
            </svg>
            <span
              style={{
                fontFamily: "var(--ff-body)",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.3,
                color: "#fff",
                textAlign: "center",
              }}
            >
              2× Excellence awardee @ yellow.ai
            </span>
          </div>
        </m.div>

        {/* 9. Medal sticker */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("medal-dt", jumbleCount, 0)}
          transition={explodeTransition}
          whileHover={{ scale: 1.15, zIndex: 25 }}
          whileDrag={{ scale: 1.18, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "55.5%",
            top: "74%",
            width: "10%",
            zIndex: 5,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 60 80" fill="none" aria-hidden="true">
            <path d="M20 0H40V35L30 28L20 35V0Z" fill="var(--accent)" />
            <circle cx="30" cy="50" r="22" stroke="var(--ink)" strokeWidth="3" fill="#fff" />
            <polygon points="30,34 33,44 43,44 35,50 38,60 30,54 22,60 25,50 17,44 27,44" fill="var(--accent)" />
            <path d="M50 8C50.3 11 52.7 13.3 56 14C52.7 14.3 50.3 16.7 50 20C49.7 16.7 47.3 14.3 44 14C47.3 13.3 49.7 11 50 8Z" fill="var(--accent)" />
          </svg>
        </m.div>

        {/* 10. Sticky note */}
        <m.div
          drag
          dragConstraints={canvasRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={getExplodeKeyframes("sticky-dt", jumbleCount, 4)}
          transition={explodeTransition}
          whileHover={{ scale: 1.03, zIndex: 15 }}
          whileDrag={{ scale: 1.05, zIndex: 60 }}
          style={{
            position: "absolute",
            left: "77%",
            top: "63%",
            width: "22%",
            zIndex: 2,
            cursor: "grab",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              background: "var(--accent-tint)",
              borderRadius: 20,
              padding: 16,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--ff-hand)",
                fontSize: "var(--fs-hand-note)",
                lineHeight: 1.35,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              My portfolio is still under construction, trying to curate my chaos into an order, it takes time.
            </p>
            <p
              style={{
                fontFamily: "var(--ff-hand)",
                fontSize: "var(--fs-hand-note)",
                lineHeight: 1.35,
                color: "var(--ink)",
                margin: "12px 0 0 0",
              }}
            >
              Do check out my work though{" "}
              <span style={{ color: "var(--accent)" }}>:)</span>
            </p>
          </div>
        </m.div>
      </div>

      {/* ============================================================
          MOBILE CANVAS (< 768px) — Full-width interactive layout
          ============================================================ */}
      <div className="wall-mobile-canvas">
        {/* Top Header Sign: "This is my wall" + "Know more about me..." */}
        <m.div
          animate={getExplodeKeyframes("header-mb", jumbleCount, 0)}
          transition={explodeTransition}
          style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* "This is my wall" sign */}
          <div style={{ textAlign: "center", position: "relative", marginBottom: 4 }}>
            <svg width="110" height="22" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true" style={{ margin: "0 auto" }}>
              <circle cx="50" cy="4" r="5" fill="#fff" stroke="#000" strokeWidth="2" />
              <line x1="30" y1="18" x2="48" y2="6" stroke="#000" strokeWidth="2" />
              <line x1="70" y1="18" x2="52" y2="6" stroke="#000" strokeWidth="2" />
            </svg>
            <m.div
              style={{
                background: "var(--accent)",
                border: "2px solid #000",
                borderRadius: 20,
                padding: "10px 24px",
                boxShadow: "var(--shadow-sticker)",
                textAlign: "center",
                display: "inline-block",
              }}
              whileHover={{ rotate: -2 }}
            >
              <span
                style={{
                  fontFamily: "var(--ff-hand)",
                  fontSize: 22,
                  color: "#fff",
                  lineHeight: 1.1,
                  display: "block",
                }}
              >
                This is my wall
              </span>
            </m.div>
          </div>

          {/* "Know more about me…" Window */}
          <div
            style={{
              width: "100%",
              maxWidth: 340,
              border: "2px solid #000",
              borderRadius: 20,
              background: "#fff",
              boxShadow: "var(--shadow-sticker)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 24,
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "1px solid #000",
                background: "#f4f4f4",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#000" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#D6D6D6" }} />
            </div>
            <div
              style={{
                padding: "14px 16px",
                textAlign: "center",
                fontFamily: "var(--ff-wall-serif)",
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--ink)",
              }}
            >
              Know more about me…
            </div>
          </div>
        </m.div>

        {/* Full-width Spotify Player Widget */}
        <m.div
          animate={getExplodeKeyframes("spotify-mb", jumbleCount, 0)}
          transition={explodeTransition}
          style={{
            width: "100%",
            maxWidth: 360,
            margin: "4px 0",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "var(--shadow-sticker)",
              background: "#282828",
              height: 152,
              width: "100%",
            }}
          >
            <iframe
              title="Spotify embed"
              src={`https://open.spotify.com/embed/track/${site.spotifyTrackId}?theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="encrypted-media"
              loading="lazy"
              style={{ borderRadius: 20, border: "none", width: "100%" }}
            />
          </div>
        </m.div>

        {/* Owner Photo Card */}
        <m.div
          animate={getExplodeKeyframes("photo-mb", jumbleCount, 0)}
          transition={explodeTransition}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 340,
            margin: "4px 0",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "var(--shadow-lift)",
              aspectRatio: "1.2 / 1",
              background: "var(--surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--ff-mono)",
              fontSize: 13,
              color: "var(--ink-3)",
            }}
          >
            Owner Photo
          </div>

          {/* "she/her" chip */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10px",
              left: "12px",
              transform: "rotate(-4deg)",
              zIndex: 6,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 24,
                padding: "0 10px",
                background: "var(--ink)",
                color: "#fff",
                fontFamily: "var(--ff-mono)",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 9999,
              }}
            >
              she/her
            </span>
          </div>

          {/* "You" cursor */}
          <m.div
            aria-hidden="true"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              zIndex: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="16" height="22" viewBox="0 0 16 22" fill="var(--accent)" stroke="#fff" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 1L1 18L5.5 13.5L9.5 21L12 19.5L8 12L14 11L1 1Z" />
            </svg>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 22,
                padding: "0 8px",
                background: "var(--accent)",
                color: "#fff",
                fontFamily: "var(--ff-mono)",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 9999,
                marginLeft: 2,
              }}
            >
              You
            </span>
          </m.div>
        </m.div>

        {/* Trophy Card & Sticky Note Stack */}
        <m.div
          animate={getExplodeKeyframes("trophy-sticky-mb", jumbleCount, 0)}
          transition={explodeTransition}
          style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 14 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Trophy Card */}
          <div
            style={{
              background: "var(--ink)",
              borderRadius: 20,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "var(--shadow-sticker)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M18 10H38V26C38 32 34 38 28 38C22 38 18 32 18 26V10Z" stroke="#fff" strokeWidth="2.5" fill="none" />
              <path d="M18 16H10C10 22 14 26 18 26" stroke="#fff" strokeWidth="2" fill="none" />
              <path d="M38 16H46C46 22 42 26 38 26" stroke="#fff" strokeWidth="2" fill="none" />
              <line x1="28" y1="38" x2="28" y2="46" stroke="#fff" strokeWidth="2.5" />
              <rect x="20" y="44" width="16" height="4" rx="2" fill="#fff" />
              <polygon points="28,14 30,20 36,20 31,24 33,30 28,26 23,30 25,24 20,20 26,20" fill="var(--accent)" />
            </svg>
            <span
              style={{
                fontFamily: "var(--ff-body)",
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.35,
                color: "#fff",
                textAlign: "left",
              }}
            >
              2× Excellence awardee @ yellow.ai
            </span>
          </div>

          {/* Sticky note */}
          <div
            style={{
              background: "var(--accent-tint)",
              borderRadius: 20,
              padding: 20,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--ff-hand)",
                fontSize: "var(--fs-hand-note)",
                lineHeight: 1.35,
                color: "var(--ink)",
                margin: 0,
                textAlign: "left",
              }}
            >
              My portfolio is still under construction, trying to curate my chaos into an order, it takes time.
            </p>
            <p
              style={{
                fontFamily: "var(--ff-hand)",
                fontSize: "var(--fs-hand-note)",
                lineHeight: 1.35,
                color: "var(--ink)",
                margin: "12px 0 0 0",
                textAlign: "left",
              }}
            >
              Do check out my work though{" "}
              <span style={{ color: "var(--accent)" }}>:)</span>
            </p>
          </div>
        </m.div>
      </div>
    </div>
  );
}

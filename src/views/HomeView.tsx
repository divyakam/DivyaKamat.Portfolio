import { useState, useEffect, useRef } from "react";
import { m, useAnimation, AnimatePresence } from "motion/react";
import flowerSymbol from "@/assets/logo/flower_symbol.png";

/**
 * HomeView — Right & Middle panels of landing page (Figma #119:271)
 *
 * Requirements:
 * - flower_symbol rotates 360 in intervals of 4 with smooth animation
 * - corresponding word sequence: "art" -> "design" -> "research" -> "technology" -> back to "art"
 * - smooth text animation when word is highlighted
 * - layout matches Figma reference image:
 *   - 5-line bio text in upper-middle area
 *   - flower + stacked words in lower-right area
 *   - words in order: ART, DESIGN, RESEARCH, TECHNOLOGY with authentic typography
 */

const STACKED_WORDS = [
  {
    word: "ART",
    fontFamily: "'Montecatini Pro', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.01em",
  },
  {
    word: "DESIGN",
    fontFamily: "'Montecatini Pro', sans-serif",
    fontWeight: 700,
    letterSpacing: "-0.01em",
  },
  {
    word: "RESEARCH",
    fontFamily: "'Montecatini Pro', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.01em",
  },
  {
    word: "TECHNOLOGY",
    fontFamily: "'Montecatini Pro', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.01em",
  },
] as const;

// Highlight sequence:
// 1. "ART" -> 2. "DESIGN" -> 3. "RESEARCH" -> 4. "TECHNOLOGY" -> back to "ART"
const HIGHLIGHT_SEQUENCE = ["ART", "DESIGN", "RESEARCH", "TECHNOLOGY"] as const;

const STEP_INTERVAL_MS = 2800; // Time per step

export function HomeView() {
  const [seqIndex, setSeqIndex] = useState(0); // 0 = ART, 1 = DESIGN, 2 = RESEARCH, 3 = TECHNOLOGY
  const flowerControls = useAnimation();
  const currentRotation = useRef(0);

  const activeWord = HIGHLIGHT_SEQUENCE[seqIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeqIndex((prev) => {
        const next = (prev + 1) % HIGHLIGHT_SEQUENCE.length;
        // Rotate 90 degrees each step (4 steps = 360 deg total)
        currentRotation.current += 90;
        flowerControls.start({
          rotate: currentRotation.current,
          transition: {
            duration: 0.40,
            ease: [0.22, 1, 0.36, 1],
          },
        });
        return next;
      });
    }, STEP_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [flowerControls]);

  return (
    <div
      className="landing-page-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "calc(100dvh - 64px - clamp(68px, 9vh, 96px) - clamp(16px, 2.5vh, 36px))",
        boxSizing: "border-box",
      }}
    >
      <div
        className="landing-main-content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          maxWidth: "100%",
          minHeight: "calc(100dvh - 64px - clamp(68px, 9vh, 96px) - clamp(16px, 2.5vh, 36px))",
          gap: "clamp(24px, 4vw, 64px)",
          boxSizing: "border-box",
          paddingTop: "clamp(8px, 1.5vh, 16px)",
          paddingBottom: "clamp(8px, 1.5vh, 16px)",
        }}
      >
        {/* Left Item: Bio paragraph (aligned on the same line as h1 from HeroLeft) */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            maxWidth: "28ch",
            flexShrink: 0,
            transform: "translateY(clamp(-165px, -23vh, -135px))",
          }}
        >
          <p
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: "clamp(0.92rem, 1.1vw, 1.18rem)",
              fontWeight: 400,
              lineHeight: 1.45,
              color: "#1E1E1E",
              margin: 0,
              letterSpacing: "-0.01em",
              whiteSpace: "pre-line",
            }}
          >
            {`I am someone who\nloves thinking in systems,\nsolving problems and\ncreating intuitive experiences.`}
          </p>
        </m.div>

        {/* Right Item: Flower Symbol + Words (aligned to bottom of flex box with little padding) */}
        <div
          className="flower-words-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(18px, 2.2vw, 38px)",
            flexShrink: 0,
            alignSelf: "flex-end",
          }}
        >
          {/* flower_symbol — rotates 360 in intervals of 4 */}
          <m.div
            animate={flowerControls}
            initial={{ rotate: 0 }}
            style={{
              width: "clamp(160px, 17vw, 300px)",
              height: "clamp(160px, 17vw, 300px)",
              transformOrigin: "center center",
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

          {/* Words Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(4px, 0.7vh, 8px)",
            }}
          >
            {/* Label */}
            <m.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: "clamp(1.1rem, 1.4vw, 1.85rem)",
                fontWeight: 400,
                color: "#1E1E1E",
                letterSpacing: "0.01em",
                marginBottom: 3,
                whiteSpace: "nowrap",
              }}
            >
              Creating at the intersection of
            </m.span>

            {/* Word Stack: ART, DESIGN, RESEARCH, TECHNOLOGY */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(2px, 0.4vh, 5px)",
              }}
            >
              {STACKED_WORDS.map((item) => {
                const isHighlighted = item.word === activeWord;

                return (
                  <div
                    key={item.word}
                    style={{
                      position: "relative",
                      overflow: "visible",
                      lineHeight: 0.94,
                    }}
                  >
                    {isHighlighted ? (
                      // Highlighted word with smooth text animation
                      <AnimatePresence mode="wait">
                        <m.div
                          key={`highlighted-${item.word}-${seqIndex}`}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 4 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            display: "inline-flex",
                            fontFamily: item.fontFamily,
                            fontSize: "clamp(2.5rem, 3.8vw, 5.2rem)",
                            fontWeight: item.fontWeight,
                            color: "#1E1E1E",
                            letterSpacing: item.letterSpacing,
                            lineHeight: 0.94,
                          }}
                        >
                          {item.word.split("").map((letter, i) => (
                            <m.span
                              key={`${item.word}-${i}`}
                              initial={{
                                opacity: 0,
                                y: 8,
                                filter: "blur(3px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                              }}
                              transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                                delay: i * 0.03,
                              }}
                              style={{ display: "inline-block" }}
                            >
                              {letter}
                            </m.span>
                          ))}
                        </m.div>
                      </AnimatePresence>
                    ) : (
                      // Inactive word: clean light silver/grey
                      <m.span
                        animate={{ color: "#A8A8A8" }}
                        transition={{ duration: 0.45 }}
                        style={{
                          display: "inline-block",
                          fontFamily: item.fontFamily,
                          fontSize: "clamp(2.5rem, 3.8vw, 5.2rem)",
                          fontWeight: item.fontWeight,
                          letterSpacing: item.letterSpacing,
                          lineHeight: 0.94,
                        }}
                      >
                        {item.word}
                      </m.span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

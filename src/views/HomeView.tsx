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
    <div className="landing-page-wrapper">
      <div className="landing-main-content">
        {/* Left Item / Bio paragraph: comes FIRST on phone viewport, left-aligned only */}
        <m.div
          className="landing-bio"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p className="landing-bio-text">
            {`I am someone who\nloves thinking in systems,\nsolving problems and\ncreating intuitive experiences.`}
          </p>
        </m.div>

        {/* Right Item / Flower Symbol + Words: placed under bio, aligned towards the right */}
        <div className="flower-words-container">
          {/* flower_symbol — rotates 360 in intervals of 4 */}
          <m.div
            className="landing-flower-box"
            animate={flowerControls}
            initial={{ rotate: 0 }}
          >
            <img
              src={flowerSymbol}
              alt="Flower symbol"
              className="landing-flower-img"
            />
          </m.div>

          {/* Words Column */}
          <div className="landing-words-column">
            {/* Label */}
            <m.span
              className="landing-intersection-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              Creating at the intersection of
            </m.span>

            {/* Word Stack: ART, DESIGN, RESEARCH, TECHNOLOGY */}
            <div className="landing-words-stack">
              {STACKED_WORDS.map((item) => {
                const isHighlighted = item.word === activeWord;

                return (
                  <div
                    key={item.word}
                    className="landing-word-row"
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
                          className="landing-word-text highlighted"
                          style={{
                            fontFamily: item.fontFamily,
                            fontWeight: item.fontWeight,
                            letterSpacing: item.letterSpacing,
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
                        className="landing-word-text inactive"
                        animate={{ color: "#A8A8A8" }}
                        transition={{ duration: 0.45 }}
                        style={{
                          fontFamily: item.fontFamily,
                          fontWeight: item.fontWeight,
                          letterSpacing: item.letterSpacing,
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

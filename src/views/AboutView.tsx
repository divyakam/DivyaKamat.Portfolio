import { m } from "motion/react";
import flowerSymbol from "@/assets/logo/flower_symbol.png";
import { Skills } from "@/components/about/Skills";

/**
 * AboutView — Responsive Figma "about me" page
 * Desktop:
 * - 3-column layout: [Portrait] [Overlapping pink Name + Bio Paragraphs] [Quote + Flower]
 * Mobile Viewport:
 * - Order:
 *   1. "h1" ("A Little Bit About Me")
 *   2. The image with the name in the same overlapping layout
 *   3. Followed by bio paragraphs
 *   4. Followed by the div with the image and "h2"
 */
export function AboutView() {
  return (
    <div className="about-view-container">
      {/* 1. Top Heading */}
      <m.h1
        className="about-heading-h1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        A Little Bit About Me
      </m.h1>

      {/* Main layout grid */}
      <div className="about-grid">
        {/* 2. Image with the name in the same layout */}
        <div className="about-hero-image-name">
          {/* Portrait Photo */}
          <m.div
            className="about-portrait-box"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <img
              src="/divya-portrait.png"
              alt="Divya Kamat"
              className="about-portrait-img"
            />
          </m.div>

          {/* Overlapping Name: "DIVYA KAMAT" */}
          <m.div
            className="about-name-box"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <span className="about-name-first">DIVYA</span>
            <span className="about-name-last">KAMAT</span>
          </m.div>
        </div>

        {/* Bio text paragraphs */}
        <m.div
          className="about-bio-box"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <p className="about-bio-p">
            I enjoy experimenting across different mediums to create design solutions that feel purposeful and like they actually belong. My work focuses on how people experience, interact with, and connect with what I create.
          </p>
          <p className="about-bio-p">
            With a background in Computer Applications and a Master’s in Immersive Media Design, I explore ways to integrate emerging technologies into design. My process begins with research and shaping experiences that feel meaningful, contextual and natural to their surroundings. I’m interested in the space between how things work and how they feel.
          </p>
        </m.div>

        {/* Quote + Flower div */}
        <div className="about-quote-box">
          <m.h2
            className="about-quote-h2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            An ongoing
            <br />
            experiment
            <br />
            in being.
          </m.h2>

          <m.div
            className="about-quote-flower"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <img
              src={flowerSymbol}
              alt="Flower symbol"
              className="about-flower-img"
            />
          </m.div>
        </div>
      </div>

      {/* Skills Component under the about grid */}
      <div className="about-skills-divider">
        <Skills />
      </div>
    </div>
  );
}

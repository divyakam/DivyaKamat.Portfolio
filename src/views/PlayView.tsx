import { useEffect, useState } from "react";
import { m, useScroll, useTransform, useSpring } from "motion/react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { play } from "@/data/play";
import type { CardItem } from "@/data/types";

/* -------------------------------------------------------
   Glowing Ambient Orbs in the background
   ------------------------------------------------------- */
function GlowingOrbs({ scrollY }: { scrollY: ReturnType<typeof useSpring> }) {
  const orb1Y = useTransform(scrollY, (v) => v * -0.15);
  const orb2Y = useTransform(scrollY, (v) => v * -0.08);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: "-100px -60px",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Primary vibrant pink glow at top hero */}
      <m.div
        style={{
          position: "absolute",
          top: "4%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(222, 50, 96, 0.22) 0%, rgba(222, 50, 96, 0.06) 50%, transparent 75%)",
          filter: "blur(40px)",
          translateY: orb1Y,
        }}
      />

      {/* Secondary accent pink glow mid page */}
      <m.div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(222, 50, 96, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          translateY: orb2Y,
        }}
      />

      {/* Floating fun ambient glyphs */}
      <span
        style={{
          position: "absolute",
          top: "8%",
          right: "12%",
          fontSize: 54,
          opacity: 0.15,
          color: "var(--accent)",
          fontFamily: "var(--ff-hand)",
          transform: "rotate(15deg)",
        }}
      >
        ✨
      </span>
      <span
        style={{
          position: "absolute",
          top: "24%",
          left: "10%",
          fontSize: 48,
          opacity: 0.15,
          color: "var(--accent)",
          fontFamily: "var(--ff-hand)",
          transform: "rotate(-12deg)",
        }}
      >
        🎨
      </span>
    </div>
  );
}

/* -------------------------------------------------------
   Single Card Scroll Item — Centers each card one by one
   ------------------------------------------------------- */
function SingleCenterCard({ item, index }: { item: CardItem; index: number }) {
  // Alternating initial rotation for organic fly-in
  const initialRotate = index % 2 === 0 ? -6 : 6;
  const initialX = index % 2 === 0 ? -50 : 50;

  return (
    <m.div
      initial={{
        opacity: 0,
        x: initialX,
        y: 90,
        rotate: initialRotate,
        scale: 0.88,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        width: "100%",
        maxWidth: "520px",
        willChange: "transform, opacity",
      }}
    >
      <ProjectCard item={item} />
    </m.div>
  );
}

/**
 * PlayView — §8.8
 * Fun handwritten Gochi Hand hero title + glowing ambient pink backdrop.
 * Projects appear ONE BY ONE in a single centered column down the middle of the screen.
 */
export function PlayView() {
  const sorted = [...play].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.querySelector(".app-main-panel") as HTMLElement | null;
    setScrollContainer(el);
  }, []);

  const { scrollY } = useScroll(
    scrollContainer ? { container: { current: scrollContainer } } : {}
  );
  const smoothY = useSpring(scrollY, { stiffness: 55, damping: 20, mass: 0.8 });

  return (
    <div style={{ position: "relative", overflow: "visible" }}>
      {/* Pink Glow Background */}
      <GlowingOrbs scrollY={smoothY} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── FUN HANDWRITTEN HERO ── */}
        <section
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: "30px",
          }}
        >
          {/* Fun handwritten main title */}
          <m.h1
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--ff-hand)",
              fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--accent)",
              margin: 0,
              textShadow: "0 4px 24px rgba(222, 50, 96, 0.2)",
            }}
          >
            welcome to the sandbox! ✨
          </m.h1>

          {/* Fun handwritten subtitle */}
          <m.p
            initial={{ opacity: 0, y: 12, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            style={{
              fontFamily: "var(--ff-hand)",
              fontSize: "clamp(1.25rem, 3.5vw, 1.85rem)",
              lineHeight: 1.4,
              color: "var(--ink)",
              margin: "20px 0 36px 0",
              maxWidth: "540px",
            }}
          >
            a collection of 20 wild ideas, generative art & late-night experiments 🚀
          </m.p>

          {/* Fun handwritten scroll prompt */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <m.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              style={{
                fontFamily: "var(--ff-hand)",
                fontSize: "2.2rem",
                color: "var(--accent)",
                lineHeight: 1,
              }}
            >
              👇
            </m.span>

            <span
              style={{
                fontFamily: "var(--ff-hand)",
                fontSize: "1.35rem",
                color: "var(--ink-2)",
                letterSpacing: "0.02em",
              }}
            >
              scroll down to explore ~
            </span>
          </m.div>
        </section>

        {/* ── 20 PROJECTS: ONE BY ONE IN THE CENTER OF THE PAGE ── */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "72px",
            paddingTop: "20px",
            paddingBottom: "160px",
            width: "100%",
          }}
        >
          {sorted.map((item, index) => (
            <SingleCenterCard key={item.id} item={item} index={index} />
          ))}
        </section>
      </div>
    </div>
  );
}

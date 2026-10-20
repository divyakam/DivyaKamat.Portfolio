import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import type { CardItem } from "@/data/types";
import { useDominantColor } from "@/hooks/useDominantColor";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CardItem;
}

/**
 * CaseStudyModal — Project Detail / Case Study View
 * - Light theme aligned with main site design tokens
 * - Pointer-tracking spotlight glow effect on left info panel
 * - Un-stretched 16:10 cover image with proper height
 * - Desktop: Fixed non-scrollable left 30% panel + scrollable right 70% case study
 * - Mobile: Responsive single-scroll layout
 */
export function CaseStudyModal({ isOpen, onClose, item }: CaseStudyModalProps) {
  const leftPanelRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dominantColor = useDominantColor(item.cover?.src, item.id, item.dominantColor);

  // Lock body scroll when open, handle ESC key & popstate browser back button
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!leftPanelRef.current) return;
    const rect = leftPanelRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (typeof window === "undefined" || !item) return null;

  const duration = item.duration || "4 Weeks";
  const projectType = item.projectType || "Individual";
  const caseStudySrc = item.caseStudyImage || item.cover?.src;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "var(--bg)",
            color: "var(--ink)",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Main Container */}
          <div
            className="case-study-split-container"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              overflow: "hidden",
              background: "var(--bg)",
            }}
          >
            {/* ============================================================
                LEFT PANEL (30%) — FIXED INFO PANEL WITH SPOTLIGHT GLOW
                ============================================================ */}
            <aside
              ref={leftPanelRef}
              className="case-study-left-panel dot-grid"
              onPointerMove={handlePointerMove}
              onPointerEnter={() => setIsHovered(true)}
              onPointerLeave={() => {
                setIsHovered(false);
                setMousePos(null);
              }}
              style={{
                position: "relative",
                width: "30%",
                minWidth: "320px",
                height: "100vh",
                overflow: "hidden",
                borderRight: "1px solid var(--line)",
                padding: "clamp(24px, 3.5vh, 36px) clamp(20px, 2.8vw, 36px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
                backgroundColor: "#fcf9f5ff",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              {/* Pointer Tracking Spotlight Glow */}
              {isHovered && mousePos && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${dominantColor.rgb.join(", ")}, 0.18), transparent 80%)`,
                    transition: "opacity 250ms ease",
                  }}
                />
              )}

              {/* Main Info Content Wrapper */}
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Back to Work button */}
                <div className="case-study-back-btn">
                  <button
                    onClick={onClose}
                    aria-label="Back to Work"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      background: "var(--surface)",
                      color: "var(--ink)",
                      border: "1px solid var(--line)",
                      borderRadius: 9999,
                      fontFamily: "var(--ff-body)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 150ms ease, border-color 150ms ease, color 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ink)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "var(--ink)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--surface)";
                      e.currentTarget.style.color = "var(--ink)";
                      e.currentTarget.style.borderColor = "var(--line)";
                    }}
                  >
                    <ArrowLeft size={16} strokeWidth={2} />
                    <span>Back to Work</span>
                  </button>
                </div>

                {/* Un-stretched Cover Image Box */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 10",
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-card, 0 4px 16px rgba(0,0,0,0.04))",
                    flexShrink: 0,
                  }}
                >
                  {item.cover?.src ? (
                    <img
                      src={item.cover.src}
                      alt={item.cover.alt || item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--ink-3)",
                        fontSize: 13,
                        fontFamily: "var(--ff-mono)",
                      }}
                    >
                      {item.title}
                    </div>
                  )}
                </div>

                {/* 2 Category Tag Chips, Title & Description */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(item.categories || [item.category]).map((cat, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          height: 26,
                          padding: "0 12px",
                          background: dominantColor.background,
                          color: dominantColor.color,
                          border: dominantColor.border,
                          borderRadius: 9999,
                          fontFamily: "var(--ff-body)",
                          fontSize: 13,
                          fontWeight: 500,
                          letterSpacing: "0.01em",
                          transition: "background 200ms ease, color 200ms ease, border-color 200ms ease",
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Cravelo DEMO', sans-serif",
                      fontSize: "clamp(1.5rem, 2vw, 2.1rem)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: "0.02em",
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--ff-body)",
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "var(--ink-2)",
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Project Metadata List Card */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  padding: 18,
                  background: "var(--surface)",
                  borderRadius: 20,
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--ink-3)",
                    marginBottom: 4,
                  }}
                >
                  Project Details
                </div>

                {/* Duration */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13.5, fontFamily: "var(--ff-body)" }}>
                    <Clock size={15} strokeWidth={1.8} color="var(--ink-3)" />
                    <span>Duration</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", fontFamily: "'Epilogue', sans-serif" }}>
                    {duration}
                  </span>
                </div>

                {/* Year */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13.5, fontFamily: "var(--ff-body)" }}>
                    <Calendar size={15} strokeWidth={1.8} color="var(--ink-3)" />
                    <span>Year</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", fontFamily: "'Epilogue', sans-serif" }}>
                    {item.year}
                  </span>
                </div>

                {/* Project Type */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13.5, fontFamily: "var(--ff-body)" }}>
                    <User size={15} strokeWidth={1.8} color="var(--ink-3)" />
                    <span>Project Type</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", fontFamily: "'Epilogue', sans-serif" }}>
                    {projectType}
                  </span>
                </div>
              </div>
            </aside>

            {/* ============================================================
                RIGHT PANEL (70%) — SCROLLABLE PROJECT CASE STUDY
                ============================================================ */}
            <main
              className="case-study-right-panel thin-scrollbar"
              style={{
                flex: 1,
                height: "100vh",
                overflowY: "auto",
                overflowX: "hidden",
                background: "var(--surface)",
                position: "relative",
              }}
            >
              {/* Case Study Content Media Container */}
              <div
                style={{
                  width: "100%",
                  minHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0,
                  padding: 0,
                  boxSizing: "border-box",
                }}
              >
                {item.caseStudyMedia && item.caseStudyMedia.length > 0 ? (
                  item.caseStudyMedia.map((media, idx) => {
                    if (media.type === "video") {
                      return (
                        <video
                          key={media.src || idx}
                          src={media.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          style={{
                            width: "100%",
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: 0,
                            display: "block",
                          }}
                        />
                      );
                    }
                    return (
                      <img
                        key={media.src || idx}
                        src={media.src}
                        alt={`${item.title} media ${idx + 1}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: 0,
                          display: "block",
                        }}
                      />
                    );
                  })
                ) : (
                  caseStudySrc && (
                    <m.img
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      src={caseStudySrc}
                      alt={item.title || "Case Study"}
                      loading="lazy"
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 0,
                        display: "block",
                        objectFit: "contain",
                      }}
                    />
                  )
                )}
              </div>
            </main>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

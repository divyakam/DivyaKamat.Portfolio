import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Layers, ArrowLeft } from "lucide-react";
import type { CardItem } from "@/data/types";

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

  // Lock body scroll when open & add ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
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
              width: "100vw",
              height: "100vh",
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
              className="case-study-left-panel"
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
                maxWidth: "440px",
                height: "100vh",
                overflow: "hidden",
                borderRight: "1px solid var(--line)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
                background: "var(--bg)",
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
                    background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(222, 50, 96, 0.08), transparent 80%)`,
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

                {/* Category Chip, Title & Description */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      alignSelf: "flex-start",
                      height: 26,
                      padding: "0 12px",
                      background: "var(--accent-tint)",
                      color: "var(--accent)",
                      border: "1px solid rgba(222, 50, 96, 0.25)",
                      borderRadius: 9999,
                      fontFamily: "var(--ff-body)",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.category}
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--ff-heading)",
                      fontSize: "var(--fs-h3, 24px)",
                      fontWeight: 700,
                      lineHeight: 1.18,
                      letterSpacing: "-0.015em",
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
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--ink-3)",
                    marginBottom: 2,
                  }}
                >
                  Project Details
                </div>

                {/* Duration */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13, fontFamily: "var(--ff-body)" }}>
                    <Clock size={15} strokeWidth={1.8} color="var(--ink-3)" />
                    <span>Duration</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--ff-mono)" }}>
                    {duration}
                  </span>
                </div>

                {/* Year */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13, fontFamily: "var(--ff-body)" }}>
                    <Calendar size={15} strokeWidth={1.8} color="var(--ink-3)" />
                    <span>Year</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--ff-mono)" }}>
                    {item.year}
                  </span>
                </div>

                {/* Project Type */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13, fontFamily: "var(--ff-body)" }}>
                    <User size={15} strokeWidth={1.8} color="var(--ink-3)" />
                    <span>Project Type</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--ff-mono)" }}>
                    {projectType}
                  </span>
                </div>

                {/* Discipline */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13, fontFamily: "var(--ff-body)" }}>
                    <Layers size={15} strokeWidth={1.8} color="var(--ink-3)" />
                    <span>Discipline</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--ff-mono)" }}>
                    {item.category}
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
              {/* Floating Close Circle Button at top-right */}
              <div
                className="case-study-close-btn"
                style={{
                  position: "fixed",
                  top: 24,
                  right: 28,
                  zIndex: 100000,
                }}
              >
                <button
                  onClick={onClose}
                  aria-label="Close case study"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
                    transition: "transform 150ms ease, background 150ms ease, border-color 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.borderColor = "var(--line)";
                  }}
                >
                  <X size={20} strokeWidth={2.2} />
                </button>
              </div>

              {/* Case Study Image Container */}
              <div
                style={{
                  width: "100%",
                  minHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {caseStudySrc && (
                  <m.img
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    src={caseStudySrc}
                    alt={item.title || "Case Study"}
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
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

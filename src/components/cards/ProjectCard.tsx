import { useState } from "react";
import { m } from "motion/react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import type { CardItem } from "@/data/types";

/**
 * ProjectCard — §8.6
 * Card anatomy: cover media, arrow badge, category chip, year, title, description.
 * Wraps SpotlightCard for pointer-tracking glow.
 * Opens full-screen CaseStudyModal if caseStudyImage is present.
 */
export function ProjectCard({ item }: { item: CardItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasCaseStudy = Boolean(item.caseStudyImage);
  const isClickable = Boolean(item.href || hasCaseStudy);

  const handleClick = (e: React.MouseEvent) => {
    if (hasCaseStudy) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const CardWrapper = hasCaseStudy ? "div" : isClickable ? "a" : "div";
  const cardProps = isClickable && !hasCaseStudy
    ? {
        href: item.href,
        target: item.external ? "_blank" : undefined,
        rel: item.external ? "noopener noreferrer" : undefined,
      }
    : {
        role: isClickable ? "button" : undefined,
        tabIndex: isClickable ? 0 : undefined,
        onClick: handleClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (hasCaseStudy && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsModalOpen(true);
          }
        },
      };

  return (
    <>
      <m.div whileTap={isClickable ? { scale: 0.985 } : undefined}>
        <SpotlightCard>
          <CardWrapper
            {...(cardProps as Record<string, unknown>)}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              cursor: isClickable ? "pointer" : "default",
            }}
          >
            {/* Media zone */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                borderRadius: "20px 20px 0 0",
                background: "var(--surface)",
              }}
            >
              {/* Cover Image */}
              {item.cover?.src && !imgError ? (
                <img
                  src={item.cover.src}
                  alt={item.cover.alt || item.title}
                  onError={() => setImgError(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              ) : (
                /* Fallback placeholder when no image available */
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--surface)",
                    fontFamily: "var(--ff-mono)",
                    fontSize: 13,
                    color: "var(--ink-3)",
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  {item.cover?.alt || item.title}
                </div>
              )}

              {/* Action badge — slides in on hover */}
              {isClickable && (
                <div
                  className="card-arrow-badge"
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    height: 40,
                    padding: hasCaseStudy ? "0 14px" : "0",
                    width: hasCaseStudy ? "auto" : 40,
                    borderRadius: 9999,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    opacity: 0,
                    transform: "translate(-6px, 6px)",
                    transition:
                      "opacity 240ms cubic-bezier(0.22, 1, 0.36, 1), transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                    zIndex: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  }}
                >
                  {hasCaseStudy ? (
                    <>
                      <span
                        style={{
                          fontFamily: "var(--ff-body)",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--ink)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Case Study
                      </span>
                      <Maximize2 size={16} strokeWidth={2} color="var(--ink)" />
                    </>
                  ) : (
                    <ArrowUpRight size={20} strokeWidth={1.5} color="var(--ink)" />
                  )}
                </div>
              )}
            </div>

            {/* Body */}
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Meta row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: 28,
                    padding: "0 12px",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 9999,
                    fontFamily: "var(--ff-body)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  {item.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--ff-body)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--ink-3)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.year}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--ff-heading)",
                  fontSize: "var(--fs-h3)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--ff-body)",
                  fontSize: "var(--fs-body)",
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </p>
            </div>
          </CardWrapper>
        </SpotlightCard>
      </m.div>

      {/* Case Study 30/70 Detail Modal */}
      {hasCaseStudy && (
        <CaseStudyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={item}
        />
      )}
    </>
  );
}

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { ContactPopover } from "./ContactPopover";

/**
 * ContactFab — §8.4
 * 56×56 pink button with animated message icon.
 * Shown only on Home (controlled by parent).
 */

const soft = { type: "spring" as const, stiffness: 400, damping: 30 };
const pop = { type: "spring" as const, stiffness: 600, damping: 18 };

export function ContactFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  // Attention cue: wiggle every 6s
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => setWiggle(true), 6000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const togglePopover = useCallback(() => setIsOpen((o) => !o), []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-fab-area]")) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div
      data-fab-area
      style={{
        position: "absolute",
        right: 24,
        bottom: 24,
        zIndex: 50,
      }}
    >
      {/* Popover */}
      <AnimatePresence>
        {isOpen && <ContactPopover />}
      </AnimatePresence>

      {/* FAB button */}
      <m.button
        aria-label="Contact me"
        aria-expanded={isOpen}
        aria-controls="contact-popover"
        onClick={togglePopover}
        style={{
          width: 56,
          height: 56,
          borderRadius: 20,
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        animate={
          wiggle && !isOpen
            ? { rotate: [0, -8, 8, -4, 0] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => setWiggle(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        initial={{ scale: 0.6, opacity: 0 }}
      >
        <m.span
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...pop, delay: 2.1 }}
          initial={{ scale: 0.6, opacity: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <m.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <X size={24} strokeWidth={1.5} />
              </m.span>
            ) : (
              <m.span
                key="message"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <MessageCircle size={24} strokeWidth={1.5} />
              </m.span>
            )}
          </AnimatePresence>
        </m.span>
      </m.button>
    </div>
  );
}

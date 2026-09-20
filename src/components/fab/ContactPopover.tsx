import { m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site.config";

/**
 * ContactPopover — §8.4
 * "Have any questions? Contact me." dialog anchored above the FAB.
 */

const soft = { type: "spring" as const, stiffness: 400, damping: 30 };

export function ContactPopover() {
  return (
    <m.div
      id="contact-popover"
      role="dialog"
      aria-label="Contact"
      initial={{ scale: 0.8, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 8 }}
      transition={soft}
      style={{
        position: "absolute",
        right: 0,
        bottom: 72,
        width: 288,
        padding: 20,
        background: "#fff",
        border: "var(--border)",
        borderRadius: 20,
        boxShadow: "var(--shadow-lift)",
        transformOrigin: "bottom right",
        zIndex: 60,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--ff-heading)",
          fontSize: 18,
          fontWeight: 600,
          color: "var(--ink)",
          margin: "0 0 16px 0",
        }}
      >
        Have any questions?
      </h3>

      <m.a
        href={`mailto:${site.email}`}
        whileTap={{ scale: 0.96 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 40,
          padding: "0 20px",
          background: "var(--ink)",
          color: "#fff",
          fontFamily: "var(--ff-heading)",
          fontSize: 15,
          fontWeight: 600,
          borderRadius: 9999,
          textDecoration: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Contact me
        <ArrowUpRight size={16} strokeWidth={1.5} color="var(--accent)" />
      </m.a>
    </m.div>
  );
}

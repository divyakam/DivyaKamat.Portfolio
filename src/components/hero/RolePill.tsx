import { m } from "motion/react";
import { PenTool, Box, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * RolePill — §8.2.3
 * Designation pills: neutral at rest, pink tint on hover.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  PenTool,
  Box,
  Sparkles,
};

export function RolePill({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  const Icon = ICON_MAP[icon];

  return (
    <m.span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 40,
        padding: "0 14px 0 12px",
        gap: 8,
        background: "#F2F2F2",
        border: "1px solid var(--line)",
        borderRadius: 9999,
        fontFamily: "var(--ff-mono)",
        fontSize: "var(--fs-mono-pill)",
        fontWeight: 600,
        color: "var(--ink)",
        cursor: "default",
        transition: "background 160ms, border-color 160ms, transform 160ms",
      }}
      whileHover={{
        y: -2,
        background: "var(--accent-tint)",
        borderColor: "rgba(222,50,96,.4)",
      }}
      whileTap={{ scale: 0.96 }}
    >
      {Icon && (
        <Icon
          size={16}
          strokeWidth={1.5}
          style={{ transition: "color 160ms" }}
        />
      )}
      {label}
    </m.span>
  );
}

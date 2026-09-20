import { m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site.config";

/**
 * Footer — §8.5
 * Full-width bottom bar: copy on the left, social links on the right.
 */
export function Footer() {
  const links = [
    { label: "EMAIL", href: `mailto:${site.email}` },
    { label: "LINKEDIN", href: site.linkedin, external: true },
    { label: "INSTAGRAM", href: site.instagram, external: true },
  ];

  return (
    <footer
      style={{
        gridColumn: "1 / -1",
        height: 56,
        padding: "0 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid var(--line)",
        background: "var(--bg)",
      }}
    >
      {/* Left text */}
      <span
        style={{
          fontFamily: "var(--ff-body)",
          fontSize: 13,
          fontWeight: 400,
          color: "var(--ink-3)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {site.footerCopy}
      </span>

      {/* Right links */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {links.map((link) => (
          <m.a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              const underline = e.currentTarget.querySelector<HTMLElement>("[data-underline]");
              if (underline) underline.style.transform = "scaleX(1)";
              const arrow = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
              if (arrow) arrow.style.transform = "translate(2px, -2px)";
            }}
            onMouseLeave={(e) => {
              const underline = e.currentTarget.querySelector<HTMLElement>("[data-underline]");
              if (underline) underline.style.transform = "scaleX(0)";
              const arrow = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
              if (arrow) arrow.style.transform = "translate(0, 0)";
            }}
          >
            <span style={{ position: "relative" }}>
              {link.label}
              <span
                data-underline
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: "var(--accent)",
                  borderRadius: 2,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 250ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </span>
            <span
              data-arrow
              style={{
                display: "inline-flex",
                transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <ArrowUpRight size={12} strokeWidth={1.5} />
            </span>
          </m.a>
        ))}
      </div>
    </footer>
  );
}

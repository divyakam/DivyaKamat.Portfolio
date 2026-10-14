import { m } from "motion/react";
import { site } from "@/data/site.config";

import linkedinIconUrl from "@/assets/logo/linkedin-app-icon.svg";
import behanceIconUrl from "@/assets/logo/behance-icon.svg";

/**
 * Footer — Exact Figma footer design (#119:283)
 * 2. in the footer, the "divyakamat44@gmail.com" should link to the email on click.
 * 3. replace the png logos of linkedin and behance to the svg I have put in the "logo" folder in "assets".
 */
export function Footer() {
  return (
    <footer
      style={{
        gridColumn: "1 / -1",
        height: 64,
        padding: "0 clamp(20px, 3vw, 40px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        background: "#FEFAF7",
        boxSizing: "border-box",
      }}
    >
      {/* Left copyright text */}
      <span
        style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: "clamp(13px, 1.1vw, 15px)",
          fontWeight: 400,
          color: "#8B8B8B",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {site.footerCopy}
      </span>

      {/* Right: email + social icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Email link */}
        <a
          href={`mailto:${site.email}`}
          aria-label="Send email to Divya"
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: "clamp(13px, 1.1vw, 15px)",
            fontWeight: 400,
            color: "#8B8B8B",
            textDecoration: "none",
            cursor: "pointer",
            transition: "color 150ms",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#FF2A7A";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#8B8B8B";
          }}
        >
          {site.email}
        </a>

        {/* LinkedIn icon — SVG from assets/logo folder */}
        <m.a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            cursor: "pointer",
          }}
        >
          <img
            src={linkedinIconUrl}
            alt="LinkedIn"
            style={{
              width: 28,
              height: 28,
              display: "block",
              objectFit: "contain",
            }}
          />
        </m.a>

        {/* Behance icon — SVG from assets/logo folder */}
        <m.a
          href={site.behance}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Behance"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            cursor: "pointer",
          }}
        >
          <img
            src={behanceIconUrl}
            alt="Behance"
            style={{
              width: 32,
              height: 32,
              display: "block",
              objectFit: "contain",
            }}
          />
        </m.a>
      </div>
    </footer>
  );
}

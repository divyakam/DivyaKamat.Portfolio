import { m } from "motion/react";
import { Download, ExternalLink } from "lucide-react";
import { site } from "@/data/site.config";

/**
 * ResumeView — §8.10
 * Embedded PDF viewer with download button and fallback.
 */
export function ResumeView() {
  return (
    <div>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <h2
          tabIndex={-1}
          style={{
            fontFamily: "var(--ff-display)",
            fontSize: "var(--fs-view-title)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: 0,
          }}
        >
          Resume
        </h2>

        {/* Download button */}
        <m.a
          href={site.resumePdf}
          download
          whileTap={{ scale: 0.96 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 44,
            padding: "0 20px",
            background: "var(--ink)",
            color: "#fff",
            fontFamily: "var(--ff-heading)",
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 9999,
            textDecoration: "none",
            border: "2px solid var(--ink)",
            cursor: "pointer",
            transition: "background 160ms, color 160ms, border-color 160ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "var(--ink)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--ink)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "var(--ink)";
          }}
        >
          <Download size={18} strokeWidth={1.5} />
          Download PDF
        </m.a>

        {/* Open in new tab */}
        <a
          href={site.resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--ff-body)",
            fontSize: 15,
            fontWeight: 500,
            color: "var(--ink)",
            textDecoration: "underline",
            textUnderlineOffset: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Open in new tab
          <ExternalLink size={14} strokeWidth={1.5} />
        </a>
      </div>

      {/* PDF Viewer */}
      <div
        style={{
          border: "var(--border)",
          borderRadius: 20,
          overflow: "hidden",
          background: "#fff",
          height: "calc(100dvh - 260px)",
          minHeight: 640,
        }}
      >
        <object
          data={`${site.resumePdf}#toolbar=0&view=FitH`}
          type="application/pdf"
          width="100%"
          height="100%"
          aria-label="Resume PDF viewer"
        >
          {/* Fallback for mobile Safari etc */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 24,
              padding: 32,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 400,
                aspectRatio: "8.5 / 11",
                background: "var(--surface)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--ff-mono)",
                fontSize: 13,
                color: "var(--ink-3)",
              }}
            >
              Resume Preview
            </div>
            <p
              style={{
                fontFamily: "var(--ff-body)",
                fontSize: "var(--fs-body)",
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              PDF preview is not available in this browser.
              Use the buttons above to download or open the resume.
            </p>
          </div>
        </object>
      </div>
    </div>
  );
}

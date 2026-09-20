import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, m, LazyMotion, domMax } from "motion/react";
import { HeroLeft } from "@/components/hero/HeroLeft";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/footer/Footer";
import { HomeView } from "@/views/HomeView";

// Lazy-loaded views
const WorkView = lazy(() => import("@/views/WorkView").then((m) => ({ default: m.WorkView })));
const AboutView = lazy(() => import("@/views/AboutView").then((m) => ({ default: m.AboutView })));
const ResumeView = lazy(() => import("@/views/ResumeView").then((m) => ({ default: m.ResumeView })));
const PlayView = lazy(() => import("@/views/PlayView").then((m) => ({ default: m.PlayView })));
const NotFoundView = lazy(() => import("@/views/NotFoundView").then((m) => ({ default: m.NotFoundView })));

/**
 * AppShell — §7
 * 30/70 split layout on desktop: persistent left panel + right content panel.
 * Responsive mobile view: sticky top navbar -> hero introduction -> main content -> footer.
 */
export function AppShell() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <LazyMotion features={domMax} strict>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="app-shell">
        {/* Nav Header — sticky top on mobile, top-right of right panel on desktop */}
        <header className="app-nav-header">
          <NavBar />
        </header>

        {/* Left panel (30% on desktop) — only visible on mobile for Home route */}
        <HeroLeft className={!isHomePage ? "hide-on-mobile-non-home" : ""} />

        {/* Main content panel (70% on desktop) */}
        <div className="app-main-panel thin-scrollbar">
          <main id="main-content">
            <AnimatePresence mode="wait">
              <m.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  enter: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                  exit: { duration: 0.16, ease: "easeIn" },
                }}
              >
                <Suspense
                  fallback={
                    <div
                      style={{
                        minHeight: "50vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--ff-mono)",
                        fontSize: 13,
                        color: "var(--ink-3)",
                      }}
                    >
                      Loading…
                    </div>
                  }
                >
                  <Routes location={location}>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/work" element={<WorkView />} />
                    <Route path="/about" element={<AboutView />} />
                    <Route path="/resume" element={<ResumeView />} />
                    <Route path="/play" element={<PlayView />} />
                    <Route path="*" element={<NotFoundView />} />
                  </Routes>
                </Suspense>
              </m.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </LazyMotion>
  );
}

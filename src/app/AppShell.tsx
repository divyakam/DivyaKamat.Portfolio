import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, m, LazyMotion, domMax } from "motion/react";
import { HeroLeft } from "@/components/hero/HeroLeft";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/footer/Footer";
import { HomeView } from "@/views/HomeView";
import { WorkView } from "@/views/WorkView";

// Lazy-loaded views
const AboutView = lazy(() => import("@/views/AboutView").then((m) => ({ default: m.AboutView })));
const ResumeView = lazy(() => import("@/views/ResumeView").then((m) => ({ default: m.ResumeView })));
const PlayView = lazy(() => import("@/views/PlayView").then((m) => ({ default: m.PlayView })));
const NotFoundView = lazy(() => import("@/views/NotFoundView").then((m) => ({ default: m.NotFoundView })));

const pageVariants: Record<string, any> = {
  initial: (dir: string) => {
    if (dir === "home-to-work") {
      return { x: "65%", opacity: 0 };
    }
    if (dir === "work-to-home") {
      return { x: "-65%", opacity: 0 };
    }
    return { opacity: 0, y: 12, x: 0 };
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (dir: string) => {
    if (dir === "home-to-work") {
      return {
        x: "-65%",
        opacity: 0,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };
    }
    if (dir === "work-to-home") {
      return {
        x: "65%",
        opacity: 0,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };
    }
    return {
      opacity: 0,
      y: -8,
      x: 0,
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    };
  },
};

/**
 * AppShell — §7
 * 30/70 split layout on desktop: persistent left panel + right content panel.
 * Responsive mobile view: sticky top navbar -> hero introduction -> main content -> footer.
 *
 * On the home page, scrolling down smoothly slides Home under HeroLeft as Work enters from the right.
 */
export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const mainPanelRef = useRef<HTMLDivElement>(null);
  const [navigating, setNavigating] = useState(false);

  // Synchronously compute transition direction during render
  const prevPathRef = useRef(location.pathname);
  let direction = "fade";
  if (prevPathRef.current === "/" && location.pathname === "/work") {
    direction = "home-to-work";
  } else if (prevPathRef.current === "/work" && location.pathname === "/") {
    direction = "work-to-home";
  }

  // Update previous path after render & reset panel scroll on navigation
  useEffect(() => {
    prevPathRef.current = location.pathname;
    setNavigating(false);
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // On home page: detect scroll-down / wheel-down / touch-drag and navigate to /work
  useEffect(() => {
    if (!isHomePage) return;
    const panel = mainPanelRef.current;

    let scrollDelta = 0;
    const THRESHOLD = 50; // px of accumulated scroll to trigger navigation
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerNavigate = () => {
      if (!navigating) {
        setNavigating(true);
        navigate("/work");
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15 && !navigating) {
        scrollDelta += e.deltaY;
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { scrollDelta = 0; }, 400);

        if (scrollDelta > THRESHOLD) {
          triggerNavigate();
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const diffY = touchStartY - e.touches[0].clientY;
      if (diffY > 45 && !navigating) {
        triggerNavigate();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let lastScrollTop = panel?.scrollTop ?? 0;
    const handleScroll = () => {
      if (!panel) return;
      const current = panel.scrollTop;
      const diff = current - lastScrollTop;
      lastScrollTop = current;
      if (diff > 20 && !navigating) {
        triggerNavigate();
      }
    };
    if (panel) {
      panel.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (panel) {
        panel.removeEventListener("scroll", handleScroll);
      }
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [isHomePage, navigate, navigating]);

  return (
    <LazyMotion features={domMax} strict>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className={`app-shell ${isAboutPage ? "app-shell-full" : ""}`}>
        {/* Nav Header — sticky top on mobile, top-right of right panel on desktop */}
        <header className="app-nav-header">
          <NavBar />
        </header>

        {/* Left panel (30% on desktop) — hidden on About page */}
        {!isAboutPage && (
          <HeroLeft className={!isHomePage ? "hide-on-mobile-non-home" : ""} />
        )}

        {/* Main content panel (70% on desktop) */}
        <div className="app-main-panel thin-scrollbar" ref={mainPanelRef}>
          <main
            id="main-content"
            style={{
              position: "relative",
              overflowX: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr",
                width: "100%",
                alignItems: "start",
              }}
            >
              <AnimatePresence initial={false} custom={direction}>
                <m.div
                  key={location.pathname}
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{
                    gridArea: "1 / 1",
                    width: "100%",
                    willChange: "transform",
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
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </LazyMotion>
  );
}

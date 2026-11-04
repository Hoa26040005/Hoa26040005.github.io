// ============================================================================
// scripts/choreography.js · Resilient Scroll Progress, HUD Telemetry & GSAP
// Zero opacity-trap design: content is always 100% readable even offline
// ============================================================================

export function initPortfolioChoreography(webglController) {
  const progressBar = document.querySelector(".scroll-progress-bar");
  const hudActLabel = document.querySelector("#hud-active-act");
  const jumpBtns = Array.from(document.querySelectorAll(".project-jump-btn"));

  // 1. Native Scroll Progress Bar (60fps passive listener)
  function updateScrollProgress() {
    if (!progressBar) return;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 2. IntersectionObserver for Active Act HUD & WebGL Morphing
  const sectionConfigs = [
    {
      selector: "#act-overture",
      label: "ACT I · OVERTURE & IDENTITY",
      morphState: 0,
      jumpId: null,
    },
    {
      selector: "#arena-fashion",
      label: "ORBIT 01 · FASHIONELITE (SHOP-QUAN-AO)",
      morphState: 0,
      jumpId: "#arena-fashion",
    },
    {
      selector: "#arena-legal",
      label: "ORBIT 02 · LEGALAI CONTRACT REVIEWER",
      morphState: 1,
      jumpId: "#arena-legal",
    },
    {
      selector: "#arena-agripos",
      label: "ORBIT 03 · AGRIPOS FACEID ERP",
      morphState: 2,
      jumpId: "#arena-agripos",
    },
    {
      selector: "#arena-temporal",
      label: "ORBIT 04 · TEMPORAL-AWARE VIETNAMESE RAG",
      morphState: 3,
      jumpId: "#arena-temporal",
    },
    {
      selector: "#workbench",
      label: "ACT III · LIVE INTERACTIVE SIMULATORS",
      morphState: 1.5,
      jumpId: null,
    },
    {
      selector: "#benchmarks",
      label: "ACT IV · VERIFIED TELEMETRY & BENCHMARKS",
      morphState: 3,
      jumpId: null,
    },
    {
      selector: "#hire",
      label: "ACT V · DIRECT CONTACT & CV DOSSIER",
      morphState: 0,
      jumpId: null,
    },
  ];

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cfg = entry.target.__portfolioCfg;
          if (!cfg) return;

          if (hudActLabel) {
            hudActLabel.textContent = cfg.label;
          }
          if (webglController && typeof cfg.morphState === "number") {
            webglController.setMorphState(cfg.morphState);
          }
          if (cfg.jumpId && jumpBtns.length) {
            jumpBtns.forEach((btn) => {
              btn.classList.toggle(
                "is-active",
                btn.getAttribute("href") === cfg.jumpId
              );
            });
          }
        });
      },
      {
        rootMargin: "-32% 0px -45% 0px",
        threshold: 0.05,
      }
    );

    sectionConfigs.forEach((cfg) => {
      const el = document.querySelector(cfg.selector);
      if (el) {
        el.__portfolioCfg = cfg;
        observer.observe(el);
      }
    });
  }

  // 3. Optional GSAP Subtle Entrance & Orbital Wheel Polish (if GSAP is loaded)
  try {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      const arenas = document.querySelectorAll(".project-orbital-arena");
      arenas.forEach((arena) => {
        const wheel = arena.querySelector(".orbital-wheel-stage");
        const dock = arena.querySelector(".orbital-inspector-dock");

        if (wheel && dock) {
          gsap.fromTo(
            [wheel, dock],
            { y: 24 },
            {
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: arena,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }
  } catch (err) {
    console.warn("GSAP optional polish skipped:", err);
  }
}

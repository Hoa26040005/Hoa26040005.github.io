// ============================================================================
// scripts/choreography.js · Scroll-Linked Wordmark Scale & Orbital Motion Layer
// Complies with taste-skill Step 9 + impeccable motion rules (never hides text)
// ============================================================================

export function initPortfolioChoreography(webglController) {
  const progressBar = document.querySelector(".scroll-progress-bar");
  const monumentTitle = document.querySelector(".hero-monument-title");
  const jumpBtns = Array.from(document.querySelectorAll(".project-jump-btn"));
  const heroMorphBtns = Array.from(document.querySelectorAll("[data-hero-morph]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Hero interactive 3D state switcher buttons
  heroMorphBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-hero-morph") || 0);
      heroMorphBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      if (webglController) {
        webglController.setMorphState(idx);
        webglController.triggerOrbitalPulse(1.25);
      }
    });
  });

  // 2. Scroll-linked progress & Scaling Wordmark signature move
  function onScroll() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    if (monumentTitle && !reducedMotion) {
      const heroProgress = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.8)));
      const scale = 1 - heroProgress * 0.06;
      monumentTitle.style.transform = `scale(${scale.toFixed(4)})`;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 3. IntersectionObserver for WebGL state sync & subtle transform entrance
  const sectionConfigs = [
    { selector: "#act-overture", morphState: 0, jumpId: null },
    { selector: "#arena-fashion", morphState: 0, jumpId: "#arena-fashion" },
    { selector: "#arena-legal", morphState: 1, jumpId: "#arena-legal" },
    { selector: "#arena-agripos", morphState: 2, jumpId: "#arena-agripos" },
    { selector: "#arena-temporal", morphState: 3, jumpId: "#arena-temporal" },
    { selector: "#workbench", morphState: 1, jumpId: null },
    { selector: "#benchmarks", morphState: 3, jumpId: null },
    { selector: "#hire", morphState: 0, jumpId: null },
  ];

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cfg = entry.target.__portfolioCfg;
          if (!cfg) return;

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
        rootMargin: "-30% 0px -45% 0px",
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

    // Subtle transform motion on scroll for orbital wheels & docks
    if (!reducedMotion) {
      const motionTargets = document.querySelectorAll(
        ".orbital-wheel-stage, .orbital-inspector-dock, .sim-card, .benchmark-row, .hero-image-card"
      );
      const motionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-inview");
            }
          });
        },
        { threshold: 0.12 }
      );
      motionTargets.forEach((el) => {
        el.classList.add("will-enter");
        motionObserver.observe(el);
      });
    }
  }
}

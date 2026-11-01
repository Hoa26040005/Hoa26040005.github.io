// ============================================================================
// scripts/choreography.js · GSAP 3.12 + ScrollTrigger Choreography
// Built with gsap-core + gsap-scrolltrigger + gsap-timeline
// ============================================================================

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initPortfolioChoreography(webglApi) {
  const slides = Array.from(document.querySelectorAll(".project-slide"));
  const tabs = Array.from(document.querySelectorAll(".dossier-tab"));
  const dossierSection = document.querySelector("#dossier");

  function setActiveProjectIndex(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-interactive", i === idx);
    });
    tabs.forEach((tab, i) => {
      tab.classList.toggle("is-active", i === idx);
    });
  }

  // 1. Tie #dossier scroll progress to Three.js 4-State Morph & Active Dossier Tab
  if (dossierSection) {
    ScrollTrigger.create({
      trigger: dossierSection,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress; // 0..1 across the 4.2vh pinned dossier
        const morphValue = p * 3.0; // maps 0..1 -> 0..3 across the 4 projects
        if (webglApi) {
          webglApi.setMorphState(morphValue);
          webglApi.addScrollVelocity(self.getVelocity() / 1200);
        }

        const activeIdx = Math.min(3, Math.floor(p * 4));
        setActiveProjectIndex(activeIdx);

        const pctEl = document.querySelector("#dossier-progress-readout");
        if (pctEl) {
          pctEl.textContent = `${Math.round(p * 100)}%`;
        }
      },
    });
  }

  // 2. Allow clicking Dossier Tabs to jump to that project's cue window in #dossier
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      if (!dossierSection) return;
      const rect = dossierSection.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const travel = Math.max(
        dossierSection.offsetHeight - window.innerHeight,
        1
      );
      const targetProgress = index * 0.26 + 0.08;
      window.scrollTo({
        top: sectionTop + travel * Math.min(0.95, targetProgress),
        behavior: "smooth",
      });
      if (webglApi) webglApi.setMorphState(index);
      setActiveProjectIndex(index);
    });
  });

  // 3. Allow clicking Hero Topology Buttons to preview any of the 4 3D states
  document.querySelectorAll("[data-topology-select]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-topology-select"));
      if (webglApi) webglApi.setMorphState(idx);
    });
  });

  // 4. ScrollTrigger.batch() for capability & ledger blocks (gsap-scrolltrigger best practice)
  ScrollTrigger.batch(".js-gsap-batch", {
    interval: 0.1,
    batchMax: 4,
    start: "top 86%",
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true,
        }
      );
    },
  });

  // 5. Global Scroll Telemetry Readout in Top Chrome
  const actMap = [
    { id: "hero", label: "ACT I · RECOGNITION" },
    { id: "dossier", label: "ACT II · 4-SYSTEM DOSSIER" },
    { id: "workbench", label: "ACT III · LIVE WORKBENCH" },
    { id: "telemetry", label: "ACT IV · VERIFIED PROOF" },
    { id: "contact", label: "ACT V · COMMITMENT" },
  ];

  actMap.forEach(({ id, label }) => {
    const el = document.getElementById(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) {
          const actEl = document.querySelector("#hud-active-act");
          if (actEl) actEl.textContent = label;
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      },
    });
  });

  setActiveProjectIndex(0);
}


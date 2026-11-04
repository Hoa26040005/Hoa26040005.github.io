// ============================================================================
// scripts/choreography.js · GSAP 3.12 + ScrollTrigger Orbital Choreography
// Built with gsap-core + gsap-scrolltrigger + gsap-timeline
// ============================================================================

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initPortfolioChoreography(webglApi) {
  // 1. Custom Cursor Follower Ring via gsap.quickTo()
  const cursorRing = document.querySelector(".cursor-ring");
  if (cursorRing && window.matchMedia("(pointer: fine)").matches) {
    const xTo = gsap.quickTo(cursorRing, "x", { duration: 0.22, ease: "power3" });
    const yTo = gsap.quickTo(cursorRing, "y", { duration: 0.22, ease: "power3" });

    window.addEventListener(
      "pointermove",
      (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      },
      { passive: true }
    );

    const interactiveSelectors =
      "a, button, .orbital-node, .orbital-center-core, .pill-btn, .topology-btn";
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener("pointerenter", () =>
        cursorRing.classList.add("is-hovering")
      );
      el.addEventListener("pointerleave", () =>
        cursorRing.classList.remove("is-hovering")
      );
    });
  }

  // 2. Sync each Project Orbital Arena with Three.js 4-State WebGL Morph & Sticky Pills
  const arenaIds = [
    { id: "arena-fashion", index: 0 },
    { id: "arena-legal", index: 1 },
    { id: "arena-agripos", index: 2 },
    { id: "arena-temporal", index: 3 },
  ];

  const jumpBtns = Array.from(document.querySelectorAll(".project-jump-btn"));

  arenaIds.forEach(({ id, index }) => {
    const arenaEl = document.getElementById(id);
    if (!arenaEl) return;

    ScrollTrigger.create({
      trigger: arenaEl,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        if (webglApi) webglApi.setMorphState(index);
        jumpBtns.forEach((b, i) => b.classList.toggle("is-active", i === index));
      },
      onEnterBack: () => {
        if (webglApi) webglApi.setMorphState(index);
        jumpBtns.forEach((b, i) => b.classList.toggle("is-active", i === index));
      },
      onUpdate: (self) => {
        if (webglApi) {
          webglApi.addScrollVelocity(self.getVelocity() / 1400);
        }
      },
    });
  });

  // 3. Animate Inspector Panel when any Orbital Node on the circle is clicked
  document.querySelectorAll(".orbital-node, .inspector-step-dot, .js-node-prev, .js-node-next").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const arena = trigger.closest(".project-orbital-arena");
      if (!arena) return;
      const dock = arena.querySelector(".js-inspector-anim-target");
      if (dock) {
        gsap.fromTo(
          dock,
          { opacity: 0.25, y: 10 },
          { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", overwrite: true }
        );
      }
    });
  });

  // 4. Allow clicking Hero Topology Buttons to preview any of the 4 3D states
  document.querySelectorAll("[data-topology-select]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-topology-select"));
      if (webglApi) {
        webglApi.setMorphState(idx);
        webglApi.triggerOrbitalPulse(1.1);
      }
    });
  });

  // 5. ScrollTrigger.batch() for capability, arena & ledger blocks
  ScrollTrigger.batch(".js-gsap-batch", {
    interval: 0.1,
    batchMax: 4,
    start: "top 86%",
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.68,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true,
        }
      );
    },
  });

  // 6. Global Scroll Telemetry Readout in Top Chrome
  const actMap = [
    { id: "hero", label: "ACT I · RECOGNITION" },
    { id: "dossier", label: "ACT II · ORBITAL DOSSIER" },
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
}

// ============================================================================
// scripts/webgl-core.js · Three.js r186 Custom GLSL 4-State & 3D Gyroscope Rings
// Built with threejs-fundamentals + threejs-shaders + threejs-interaction
// ============================================================================

import * as THREE from "three";

const TOPOLOGY_LABELS = [
  "00 · TORUS-KNOT SOCIAL MESH (FashionElite)",
  "01 · NEO4J GRAPH-RAG HELIX (LegalAI)",
  "02 · 68-POINT BIOMETRIC GRID (AgriPOS)",
  "03 · TEMPORAL VECTOR FIELD (Temporal RAG)",
];

const TOPOLOGY_COLORS = [
  [0xd4ff33, 0x5ce1e6], // 0: Acid Chartreuse + Cyan
  [0x5ce1e6, 0xa855f7], // 1: Cyan + Royal Violet
  [0x2ee59d, 0xd4ff33], // 2: Emerald + Chartreuse
  [0xf5a623, 0x5ce1e6], // 3: Amber + Cyan
];

export function initPortfolioWebGL() {
  const canvas = document.querySelector("#webgl-stage");
  if (!canvas) return null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06070a, 0.06);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.15, 7.0);

  // Build 4 distinct mathematical topologies for the 3,600 particles
  const count = 3600;
  const pos0 = new Float32Array(count * 3); // State 0: Social Commerce TorusKnot
  const pos1 = new Float32Array(count * 3); // State 1: Legal Knowledge Graph Helix
  const pos2 = new Float32Array(count * 3); // State 2: 68-Landmark Biometric Dome
  const pos3 = new Float32Array(count * 3); // State 3: Temporal Vector Wave Planes
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const t = (i / count) * Math.PI * 2;
    const u = ((i % 60) / 60) * Math.PI * 2;
    const v = Math.floor(i / 60) / 60;

    // State 0: Torus Knot (p=2, q=3) for Group-Buy Social Network
    const p = 2;
    const q = 3;
    const angle = t * 6;
    const r0 = 1.65 + 0.58 * Math.cos(q * angle);
    pos0[i3]     = r0 * Math.cos(p * angle) + (Math.random() - 0.5) * 0.12;
    pos0[i3 + 1] = r0 * Math.sin(p * angle) + (Math.random() - 0.5) * 0.12;
    pos0[i3 + 2] = 0.78 * Math.sin(q * angle) + (Math.random() - 0.5) * 0.12;

    // State 1: Double-Helix Knowledge Graph Lattice for LegalAI
    const strand = i % 2 === 0 ? 1 : -1;
    const hY = (v - 0.5) * 5.2;
    const hTheta = v * Math.PI * 5.0 + (strand > 0 ? 0 : Math.PI);
    const radius1 = i % 7 === 0 ? Math.random() * 1.55 : 1.55;
    pos1[i3]     = Math.cos(hTheta) * radius1;
    pos1[i3 + 1] = hY;
    pos1[i3 + 2] = Math.sin(hTheta) * radius1;

    // State 2: Biometric Face Landmark Ellipsoid + Concentric Rings
    const phi = Math.acos(1 - 2 * v);
    const theta = u * 3.0;
    const rx = 1.72 * Math.sin(phi) * Math.cos(theta);
    const ry = 2.18 * Math.cos(phi);
    const rz = 1.18 * Math.sin(phi) * Math.sin(theta);
    pos2[i3]     = rx;
    pos2[i3 + 1] = ry;
    pos2[i3 + 2] = Math.abs(rz) * 0.9 - 0.2;

    // State 3: Temporal Vector Wave Slices (2019..2025 buckets)
    const bucket = (i % 7) - 3;
    const wx = (v - 0.5) * 5.8;
    const wz = bucket * 0.5;
    const wy = Math.sin(wx * 1.6 + bucket * 0.7) * 0.8;
    pos3[i3]     = wx;
    pos3[i3 + 1] = wy;
    pos3[i3 + 2] = wz;

    scales[i] = 0.52 + (i % 5) * 0.3;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(pos0, 3));
  geometry.setAttribute("aState1", new THREE.BufferAttribute(pos1, 3));
  geometry.setAttribute("aState2", new THREE.BufferAttribute(pos2, 3));
  geometry.setAttribute("aState3", new THREE.BufferAttribute(pos3, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMorphState: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScrollVelocity: { value: 0 },
      uPulse: { value: 0 },
      uColorPrimary: { value: new THREE.Color(0xd4ff33) },
      uColorSecondary: { value: new THREE.Color(0x5ce1e6) },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aState1;
      attribute vec3 aState2;
      attribute vec3 aState3;
      attribute float aScale;

      uniform float uTime;
      uniform float uMorphState;
      uniform vec2 uPointer;
      uniform float uScrollVelocity;
      uniform float uPulse;

      varying float vMixFactor;
      varying float vDepth;

      vec3 sampleTopology(float s) {
        float clamped = clamp(s, 0.0, 3.0);
        if (clamped < 1.0) {
          return mix(position, aState1, smoothstep(0.0, 1.0, clamped));
        } else if (clamped < 2.0) {
          return mix(aState1, aState2, smoothstep(1.0, 2.0, clamped));
        } else {
          return mix(aState2, aState3, smoothstep(2.0, 3.0, clamped));
        }
      }

      void main() {
        vec3 morphed = sampleTopology(uMorphState);

        // Harmonic oscillation + orbital node click shockwave pulse
        float wave = sin(morphed.x * 2.2 + uTime * 1.4) * cos(morphed.y * 2.0 + uTime * 1.1);
        float radial = length(morphed.xy);
        float shock = sin(radial * 5.0 - uTime * 6.0) * uPulse * 0.24;
        morphed += normalize(morphed + vec3(0.0001)) * shock;
        morphed.z += wave * (0.08 + clamp(abs(uScrollVelocity) * 0.04, 0.0, 0.25));

        // Pointer repulsion field
        vec2 pointerWorld = uPointer * 2.5;
        float dist = distance(morphed.xy, pointerWorld);
        if (dist < 1.45) {
          vec2 dir = normalize(morphed.xy - pointerWorld + 0.0001);
          morphed.xy += dir * (1.45 - dist) * 0.3;
        }

        vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float sizeAtten = (19.0 * aScale * (1.0 + uPulse * 0.35)) / max(-mvPosition.z, 1.2);
        gl_PointSize = clamp(sizeAtten, 1.5, 9.5);

        vMixFactor = fract(uMorphState * 0.333 + wave * 0.25);
        vDepth = clamp((-mvPosition.z - 2.0) / 8.0, 0.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorPrimary;
      uniform vec3 uColorSecondary;
      varying float vMixFactor;
      varying float vDepth;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        if (d > 0.5) discard;

        float alpha = smoothstep(0.5, 0.08, d) * (1.0 - vDepth * 0.56);
        vec3 col = mix(uColorPrimary, uColorSecondary, vMixFactor);

        gl_FragColor = vec4(col, alpha * 0.8);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const rootGroup = new THREE.Group();
  rootGroup.position.set(1.05, 0.05, 0);
  scene.add(rootGroup);

  const particleSystem = new THREE.Points(geometry, material);
  rootGroup.add(particleSystem);

  // 3 Concentric 3D Gyroscope Orbital Rings around the WebGL Core
  const gyroGroup = new THREE.Group();
  rootGroup.add(gyroGroup);

  const ringMatOuter = new THREE.MeshBasicMaterial({
    color: 0xd4ff33,
    wireframe: true,
    transparent: true,
    opacity: 0.14,
  });
  const ringMatInner = new THREE.MeshBasicMaterial({
    color: 0x5ce1e6,
    wireframe: true,
    transparent: true,
    opacity: 0.11,
  });

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.012, 8, 96), ringMatOuter);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.01, 8, 96), ringMatInner);
  const ring3 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.18, 1), ringMatOuter);

  ring1.rotation.x = Math.PI * 0.32;
  ring2.rotation.y = Math.PI * 0.28;
  gyroGroup.add(ring1, ring2, ring3);

  const timer = new THREE.Timer();
  timer.connect(document);

  let targetMorph = 0;
  let currentMorph = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let scrollVel = 0;
  let pulseEnergy = 0;

  window.addEventListener(
    "pointermove",
    (e) => {
      targetPointerX = (e.clientX / window.innerWidth) * 2 - 1;
      targetPointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true }
  );

  function animate() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    const elapsed = timer.getElapsed();

    currentMorph += (targetMorph - currentMorph) * Math.min(dt * 5.2, 1);
    scrollVel *= 0.9;
    pulseEnergy *= 0.92;

    material.uniforms.uTime.value = prefersReducedMotion ? 0 : elapsed;
    material.uniforms.uMorphState.value = currentMorph;
    material.uniforms.uScrollVelocity.value = scrollVel;
    material.uniforms.uPulse.value = pulseEnergy;
    material.uniforms.uPointer.value.x +=
      (targetPointerX - material.uniforms.uPointer.value.x) * 0.08;
    material.uniforms.uPointer.value.y +=
      (targetPointerY - material.uniforms.uPointer.value.y) * 0.08;

    if (!prefersReducedMotion) {
      particleSystem.rotation.y =
        elapsed * 0.13 + material.uniforms.uPointer.value.x * 0.25;
      particleSystem.rotation.x =
        Math.sin(elapsed * 0.24) * 0.12 -
        material.uniforms.uPointer.value.y * 0.18;

      ring1.rotation.z = elapsed * 0.18;
      ring1.rotation.x = Math.PI * 0.32 + Math.sin(elapsed * 0.4) * 0.15;
      ring2.rotation.z = -elapsed * 0.14;
      ring2.rotation.y = Math.PI * 0.28 + Math.cos(elapsed * 0.35) * 0.15;
      ring3.rotation.y = -elapsed * 0.22;
    }

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rootGroup.position.x = window.innerWidth < 1040 ? 0 : 1.05;
  };
  onResize();
  window.addEventListener("resize", onResize);

  const api = {
    setMorphState(val) {
      targetMorph = Math.max(0, Math.min(3, val));
      const idx = Math.round(targetMorph);
      const labelEl = document.querySelector("#hud-topology-name");
      if (labelEl && TOPOLOGY_LABELS[idx]) {
        labelEl.textContent = TOPOLOGY_LABELS[idx];
      }
      const pair = TOPOLOGY_COLORS[idx] || TOPOLOGY_COLORS[0];
      material.uniforms.uColorPrimary.value.setHex(pair[0]);
      material.uniforms.uColorSecondary.value.setHex(pair[1]);

      document.querySelectorAll("[data-topology-select]").forEach((btn) => {
        const bIdx = Number(btn.getAttribute("data-topology-select"));
        btn.classList.toggle("is-active", bIdx === idx);
      });
    },
    triggerOrbitalPulse(intensity = 1.0) {
      pulseEnergy = Math.min(1.6, intensity);
    },
    addScrollVelocity(v) {
      scrollVel = Math.max(-4, Math.min(4, v));
    },
    dispose() {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };

  window.PortfolioWebGL = api;
  return api;
}

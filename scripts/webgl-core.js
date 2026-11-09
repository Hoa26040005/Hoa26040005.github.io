// ============================================================================
// scripts/webgl-core.js · Full-Viewport 3D WebGL Background Stage
// Renders behind the entire page (z-index: 0):
//  - 2,200-particle 4-state 3D morphing project sculpture + 3 gyroscopic rings
//  - 900-particle deep-space 3D ambient starfield across the entire viewport
//  - Smooth scroll-linked 3D spatial glide + mouse parallax + background drag
// ============================================================================

let stateTarget = 0.0;
let stateCurrent = 0.0;
let orbitalPulse = 0.0;

function getViewportBounds() {
  return {
    width: Math.max(320, window.innerWidth || 1440),
    height: Math.max(480, window.innerHeight || 900),
  };
}

function initCanvas2DFallback(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let { width, height } = getViewportBounds();
  canvas.width = width;
  canvas.height = height;

  const particles = Array.from({ length: 140 }, (_, i) => ({
    angle: (i / 140) * Math.PI * 2,
    radius: 70 + (i % 6) * 42,
    speed: (0.0018 + (i % 4) * 0.0006) * (i % 2 === 0 ? 1 : -1),
    size: 1.4 + (i % 3) * 0.8,
    accent: i % 3 === 0,
  }));

  window.addEventListener(
    "resize",
    () => {
      const b = getViewportBounds();
      width = canvas.width = b.width;
      height = canvas.height = b.height;
    },
    { passive: true }
  );

  function draw() {
    ctx.clearRect(0, 0, width, height);
    stateCurrent += (stateTarget - stateCurrent) * 0.06;
    orbitalPulse += (0 - orbitalPulse) * 0.07;

    const cx = width >= 1080 ? width * 0.68 : width * 0.5;
    const cy = height * 0.42;

    [96, 168, 240].forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r + orbitalPulse * 14, 0, Math.PI * 2);
      ctx.strokeStyle =
        idx === 1 ? "rgba(90, 155, 252, 0.24)" : "rgba(233, 237, 243, 0.10)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
    });

    particles.forEach((p) => {
      p.angle += p.speed * (1 + orbitalPulse * 1.4);
      const r = p.radius + Math.sin(p.angle * 3 + stateCurrent) * 18;
      const x = cx + Math.cos(p.angle) * r;
      const y = cy + Math.sin(p.angle) * r * 0.78;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? "rgba(90, 155, 252, 0.80)"
        : "rgba(233, 237, 243, 0.48)";
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  const api = {
    setMorphState(s) {
      stateTarget = Math.max(0, Math.min(3, s));
    },
    triggerOrbitalPulse(strength = 1.0) {
      orbitalPulse = Math.min(2.0, orbitalPulse + strength);
    },
  };
  window.PortfolioWebGL = api;
  return api;
}

export async function initPortfolioWebGL() {
  const canvas = document.querySelector("#webgl-stage");
  if (!canvas) return null;

  try {
    const THREE = await import("three");
    const bounds = getViewportBounds();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(bounds.width, bounds.height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      bounds.width / bounds.height,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 8.2);

    // 1. Main 3D Morphing Project Core Group (floats in 3D background space)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const COUNT = 2200;
    const geometry = new THREE.BufferGeometry();

    const pos0 = new Float32Array(COUNT * 3);
    const pos1 = new Float32Array(COUNT * 3);
    const pos2 = new Float32Array(COUNT * 3);
    const pos3 = new Float32Array(COUNT * 3);
    const aRandom = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const t = i / COUNT;
      aRandom[i] = Math.random();

      // State 0: FashionElite Social Group-Buy Torus Knot / Orbital Ring
      const u0 = t * Math.PI * 2 * 9;
      const v0 = t * Math.PI * 2;
      const r0 = 1.85 + 0.52 * Math.cos(u0);
      pos0[i3]     = r0 * Math.cos(v0);
      pos0[i3 + 1] = r0 * Math.sin(v0) * 0.88;
      pos0[i3 + 2] = 0.68 * Math.sin(u0);

      // State 1: LegalAI Contract Graph-RAG Balance Matrix
      const side = i % 2 === 0 ? -1 : 1;
      pos1[i3]     = ((i % 16) / 16 - 0.5) * 1.7 + side * 1.4;
      pos1[i3 + 1] = ((Math.floor(i / 16) % 16) / 16 - 0.5) * 2.15;
      pos1[i3 + 2] = (((i * 7) % 16) / 16 - 0.5) * 1.25;

      // State 2: AgriPOS Geodesic 68-Landmark Biometric Sphere
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rad = 2.15;
      pos2[i3]     = rad * Math.sin(phi) * Math.cos(theta);
      pos2[i3 + 1] = rad * Math.cos(phi);
      pos2[i3 + 2] = rad * Math.sin(phi) * Math.sin(theta);

      // State 3: Temporal-Aware Vietnamese RAG Double Helix
      const strand = i % 2 === 0 ? 1 : -1;
      const angle = t * Math.PI * 8;
      const hRadius = 1.55;
      pos3[i3]     = Math.cos(angle + (strand > 0 ? 0 : Math.PI)) * hRadius;
      pos3[i3 + 1] = (t - 0.5) * 4.4;
      pos3[i3 + 2] = Math.sin(angle + (strand > 0 ? 0 : Math.PI)) * hRadius;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(pos0, 3));
    geometry.setAttribute("aPos1", new THREE.BufferAttribute(pos1, 3));
    geometry.setAttribute("aPos2", new THREE.BufferAttribute(pos2, 3));
    geometry.setAttribute("aPos3", new THREE.BufferAttribute(pos3, 3));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(aRandom, 1));

    const uniforms = {
      uTime: { value: 0 },
      uState: { value: 0 },
      uPulse: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: /* glsl */ `
        attribute vec3 aPos1;
        attribute vec3 aPos2;
        attribute vec3 aPos3;
        attribute float aRandom;

        uniform float uTime;
        uniform float uState;
        uniform float uPulse;
        uniform vec2 uPointer;
        uniform float uPixelRatio;

        varying float vRandom;

        vec3 blendStates(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float s) {
          if (s <= 1.0) return mix(p0, p1, clamp(s, 0.0, 1.0));
          if (s <= 2.0) return mix(p1, p2, clamp(s - 1.0, 0.0, 1.0));
          return mix(p2, p3, clamp(s - 2.0, 0.0, 1.0));
        }

        void main() {
          vRandom = aRandom;
          vec3 morphed = blendStates(position, aPos1, aPos2, aPos3, uState);

          float wave = sin(uTime * 1.3 + aRandom * 6.2831) * (0.05 + uPulse * 0.14);
          morphed += normalize(morphed + vec3(0.001)) * wave;

          morphed.x += uPointer.x * 0.28;
          morphed.y += uPointer.y * 0.28;

          vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
          float depth = max(-mvPosition.z, 2.0);

          gl_PointSize = (2.4 + aRandom * 2.2 + uPulse * 1.8) * uPixelRatio * (5.4 / depth);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vRandom;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;

          float alpha = smoothstep(0.5, 0.08, d) * 0.78;
          vec3 cornflower = vec3(0.353, 0.608, 0.988);
          vec3 silver     = vec3(0.914, 0.929, 0.953);
          vec3 col        = mix(cornflower, silver, step(0.58, vRandom));

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    coreGroup.add(points);

    // 3 Gyroscopic 3D Orbital Rings around the Core
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x5a9bfc,
      transparent: true,
      opacity: 0.24,
      wireframe: true,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xe9edf3,
      transparent: true,
      opacity: 0.11,
      wireframe: true,
    });
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x5a9bfc,
      transparent: true,
      opacity: 0.14,
      wireframe: true,
    });

    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.013, 8, 108),
      ringMat1
    );
    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.01, 8, 108),
      ringMat2
    );
    const orbitRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(3.55, 0.008, 8, 108),
      ringMat3
    );
    orbitRing1.rotation.x = Math.PI * 0.34;
    orbitRing2.rotation.y = Math.PI * 0.26;
    orbitRing3.rotation.x = -Math.PI * 0.22;
    orbitRing3.rotation.y = -Math.PI * 0.18;
    coreGroup.add(orbitRing1, orbitRing2, orbitRing3);

    // 2. Full-Viewport Ambient Deep-Space 3D Starfield
    const AMBIENT_COUNT = 900;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPos = new Float32Array(AMBIENT_COUNT * 3);
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const i3 = i * 3;
      ambientPos[i3]     = (Math.random() - 0.5) * 22;
      ambientPos[i3 + 1] = (Math.random() - 0.5) * 14;
      ambientPos[i3 + 2] = (Math.random() - 0.5) * 10 - 2.5;
    }
    ambientGeo.setAttribute("position", new THREE.BufferAttribute(ambientPos, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: 0x5a9bfc,
      size: 0.038,
      transparent: true,
      opacity: 0.36,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ambientStars = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientStars);

    // Position the 3D Core in the open right half of the Hero on desktop,
    // and smoothly glide it across the background as the user scrolls
    function updateCorePlacement() {
      const w = window.innerWidth;
      const scrollRatio = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 1.2));
      const baseDesktopX = w >= 1080 ? 2.15 : 0.0;
      const baseDesktopY = w >= 1080 ? 0.65 : 0.25;
      coreGroup.position.x = baseDesktopX * (1 - scrollRatio * 0.45);
      coreGroup.position.y = baseDesktopY - scrollRatio * 0.55;
    }
    updateCorePlacement();

    const pointerTarget = { x: 0, y: 0 };
    let isDragging = false;
    let prevDrag = { x: 0, y: 0 };
    const camRadius = 8.2;
    let camTheta = 0;
    let camPhi = Math.PI / 2;

    window.addEventListener(
      "pointerdown",
      (e) => {
        if (
          e.target &&
          e.target.closest("a, button, input, select, textarea, [role='button'], [data-orbital-node]")
        ) {
          return;
        }
        isDragging = true;
        prevDrag = { x: e.clientX, y: e.clientY };
        orbitalPulse = Math.min(2.0, orbitalPulse + 0.55);
      },
      { passive: true }
    );

    window.addEventListener(
      "pointerup",
      () => {
        isDragging = false;
      },
      { passive: true }
    );

    window.addEventListener(
      "pointermove",
      (e) => {
        pointerTarget.x = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
        pointerTarget.y = -(e.clientY / Math.max(1, window.innerHeight)) * 2 + 1;
        if (isDragging) {
          camTheta -= (e.clientX - prevDrag.x) * 0.005;
          camPhi = Math.max(
            0.3,
            Math.min(Math.PI - 0.3, camPhi - (e.clientY - prevDrag.y) * 0.005)
          );
          camera.position.set(
            camRadius * Math.sin(camPhi) * Math.sin(camTheta),
            camRadius * Math.cos(camPhi),
            camRadius * Math.sin(camPhi) * Math.cos(camTheta)
          );
          camera.lookAt(0, 0, 0);
          prevDrag = { x: e.clientX, y: e.clientY };
        }
      },
      { passive: true }
    );

    window.addEventListener("scroll", updateCorePlacement, { passive: true });

    window.addEventListener(
      "resize",
      () => {
        const b = getViewportBounds();
        camera.aspect = b.width / b.height;
        camera.updateProjectionMatrix();
        renderer.setSize(b.width, b.height);
        updateCorePlacement();
      },
      { passive: true }
    );

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      stateCurrent += (stateTarget - stateCurrent) * 0.06;
      orbitalPulse += (0 - orbitalPulse) * 0.06;

      uniforms.uTime.value = elapsed;
      uniforms.uState.value = stateCurrent;
      uniforms.uPulse.value = orbitalPulse;
      uniforms.uPointer.value.x +=
        (pointerTarget.x - uniforms.uPointer.value.x) * 0.05;
      uniforms.uPointer.value.y +=
        (pointerTarget.y - uniforms.uPointer.value.y) * 0.05;

      points.rotation.y = elapsed * 0.14 + stateCurrent * 0.55;
      points.rotation.x = Math.sin(elapsed * 0.25) * 0.16;

      orbitRing1.rotation.z = elapsed * 0.15 + orbitalPulse * 0.25;
      orbitRing2.rotation.x = -elapsed * 0.11 - orbitalPulse * 0.2;
      orbitRing3.rotation.y = elapsed * 0.09 + stateCurrent * 0.3;

      ambientStars.rotation.y = elapsed * 0.018 + uniforms.uPointer.value.x * 0.08;
      ambientStars.rotation.x = uniforms.uPointer.value.y * 0.06;

      renderer.render(scene, camera);
    }

    animate();

    const api = {
      setMorphState(s) {
        stateTarget = Math.max(0, Math.min(3, s));
      },
      triggerOrbitalPulse(strength = 1.0) {
        orbitalPulse = Math.min(2.0, orbitalPulse + strength);
      },
    };
    window.PortfolioWebGL = api;
    return api;
  } catch (err) {
    return initCanvas2DFallback(canvas);
  }
}

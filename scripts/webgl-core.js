// ============================================================================
// scripts/webgl-core.js · Resilient Three.js 4-State Morphing Particle Core
// With automatic 2D Canvas Orbital Constellation fallback if WebGL is blocked
// ============================================================================

let stateTarget = 0.0;
let stateCurrent = 0.0;
let orbitalPulse = 0.0;

function initCanvas2DFallback(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = Array.from({ length: 90 }, (_, i) => ({
    angle: (i / 90) * Math.PI * 2,
    radius: 80 + (i % 5) * 65,
    speed: (0.0015 + (i % 4) * 0.0006) * (i % 2 === 0 ? 1 : -1),
    size: 1.2 + (i % 3) * 0.8,
    gold: i % 3 === 0,
  }));

  window.addEventListener(
    "resize",
    () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    },
    { passive: true }
  );

  function draw() {
    ctx.clearRect(0, 0, width, height);
    stateCurrent += (stateTarget - stateCurrent) * 0.05;
    orbitalPulse += (0 - orbitalPulse) * 0.06;

    const cx = width * 0.5;
    const cy = height * 0.5;

    // Subtle concentric orbital rings
    [130, 230, 340].forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r + orbitalPulse * 18, 0, Math.PI * 2);
      ctx.strokeStyle =
        idx === 1 ? "rgba(229, 169, 60, 0.09)" : "rgba(56, 189, 248, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    particles.forEach((p) => {
      p.angle += p.speed * (1 + orbitalPulse * 1.5);
      const r = p.radius + Math.sin(p.angle * 2 + stateCurrent) * 18;
      const x = cx + Math.cos(p.angle) * r;
      const y = cy + Math.sin(p.angle) * r * 0.68;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? "rgba(229, 169, 60, 0.48)"
        : "rgba(56, 189, 248, 0.36)";
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

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 8.8);

    const COUNT = window.innerWidth < 768 ? 1100 : 2200;
    const geometry = new THREE.BufferGeometry();

    const pos0 = new Float32Array(COUNT * 3); // State 0: Fashion Torus Ring
    const pos1 = new Float32Array(COUNT * 3); // State 1: Legal AI Balance Matrix
    const pos2 = new Float32Array(COUNT * 3); // State 2: AgriPOS 68-Landmark Dome
    const pos3 = new Float32Array(COUNT * 3); // State 3: Temporal Double Helix
    const aRandom = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const t = i / COUNT;
      aRandom[i] = Math.random();

      // State 0: Torus Knot / Social Group-Buy Ring
      const u0 = t * Math.PI * 2 * 9;
      const v0 = t * Math.PI * 2;
      const r0 = 2.4 + 0.65 * Math.cos(u0);
      pos0[i3]     = r0 * Math.cos(v0);
      pos0[i3 + 1] = r0 * Math.sin(v0) * 0.85;
      pos0[i3 + 2] = 0.75 * Math.sin(u0);

      // State 1: Legal Risk Matrix Lattice
      const side = i % 2 === 0 ? -1 : 1;
      const gx = ((i % 20) / 20 - 0.5) * 2.1 + side * 1.95;
      const gy = ((Math.floor(i / 20) % 20) / 20 - 0.5) * 2.5;
      const gz = (((i * 7) % 20) / 20 - 0.5) * 1.4;
      pos1[i3]     = gx;
      pos1[i3 + 1] = gy;
      pos1[i3 + 2] = gz;

      // State 2: Geodesic Biometric Sphere
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rad = 2.55;
      pos2[i3]     = rad * Math.sin(phi) * Math.cos(theta);
      pos2[i3 + 1] = rad * Math.cos(phi);
      pos2[i3 + 2] = rad * Math.sin(phi) * Math.sin(theta);

      // State 3: Temporal Double Helix
      const strand = i % 2 === 0 ? 1 : -1;
      const angle = t * Math.PI * 10;
      const hRadius = 1.85;
      pos3[i3]     = Math.cos(angle + (strand > 0 ? 0 : Math.PI)) * hRadius;
      pos3[i3 + 1] = (t - 0.5) * 6.0;
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
        varying float vDepth;

        vec3 blendStates(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float s) {
          if (s <= 1.0) return mix(p0, p1, clamp(s, 0.0, 1.0));
          if (s <= 2.0) return mix(p1, p2, clamp(s - 1.0, 0.0, 1.0));
          return mix(p2, p3, clamp(s - 2.0, 0.0, 1.0));
        }

        void main() {
          vRandom = aRandom;
          vec3 morphed = blendStates(position, aPos1, aPos2, aPos3, uState);

          float wave = sin(uTime * 1.15 + aRandom * 6.2831) * (0.06 + uPulse * 0.14);
          morphed += normalize(morphed + vec3(0.001)) * wave;

          morphed.x += uPointer.x * 0.28 * (0.4 + aRandom * 0.6);
          morphed.y += uPointer.y * 0.28 * (0.4 + aRandom * 0.6);

          vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
          vDepth = -mvPosition.z;

          gl_PointSize = (2.2 + aRandom * 2.2 + uPulse * 1.8) * uPixelRatio * (5.5 / max(vDepth, 2.0));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vRandom;
        varying float vDepth;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;

          float alpha = smoothstep(0.5, 0.08, d) * 0.62;
          vec3 amber = vec3(0.898, 0.663, 0.235);
          vec3 cyan  = vec3(0.220, 0.741, 0.973);
          vec3 col   = mix(amber, cyan, step(0.62, vRandom));

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Subtle 3D orbital wireframe rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xe5a93c,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.06,
      wireframe: true,
    });

    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.35, 0.012, 8, 96),
      ringMat1
    );
    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(4.05, 0.01, 8, 96),
      ringMat2
    );
    orbitRing1.rotation.x = Math.PI * 0.34;
    orbitRing2.rotation.y = Math.PI * 0.26;
    scene.add(orbitRing1, orbitRing2);

    const pointerTarget = { x: 0, y: 0 };
    window.addEventListener(
      "pointermove",
      (e) => {
        pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      },
      { passive: true }
    );

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      stateCurrent += (stateTarget - stateCurrent) * 0.05;
      orbitalPulse += (0 - orbitalPulse) * 0.06;

      uniforms.uTime.value = elapsed;
      uniforms.uState.value = stateCurrent;
      uniforms.uPulse.value = orbitalPulse;
      uniforms.uPointer.value.x +=
        (pointerTarget.x - uniforms.uPointer.value.x) * 0.05;
      uniforms.uPointer.value.y +=
        (pointerTarget.y - uniforms.uPointer.value.y) * 0.05;

      points.rotation.y = elapsed * 0.08 + stateCurrent * 0.45;
      points.rotation.x = Math.sin(elapsed * 0.22) * 0.12;

      orbitRing1.rotation.z = elapsed * 0.1 + orbitalPulse * 0.25;
      orbitRing2.rotation.x = -elapsed * 0.08 - orbitalPulse * 0.2;

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
    console.warn("WebGL fallback to 2D Canvas Orbital Constellation:", err);
    return initCanvas2DFallback(canvas);
  }
}

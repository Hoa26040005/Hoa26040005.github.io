// ============================================================================
// scripts/webgl-core.js · Contained 3D Orbital Core inside Hero Stage
// Never covers text on scroll; includes automatic 2D Canvas fallback
// ============================================================================

let stateTarget = 0.0;
let stateCurrent = 0.0;
let orbitalPulse = 0.0;

function getStageBounds(canvas) {
  const host = canvas.parentElement || document.body;
  return {
    width: Math.max(280, host.clientWidth || 520),
    height: Math.max(280, host.clientHeight || 460),
  };
}

function initCanvas2DFallback(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let { width, height } = getStageBounds(canvas);
  canvas.width = width;
  canvas.height = height;

  const particles = Array.from({ length: 96 }, (_, i) => ({
    angle: (i / 96) * Math.PI * 2,
    radius: 56 + (i % 5) * 34,
    speed: (0.002 + (i % 4) * 0.0007) * (i % 2 === 0 ? 1 : -1),
    size: 1.5 + (i % 3) * 0.8,
    accent: i % 3 === 0,
  }));

  window.addEventListener(
    "resize",
    () => {
      const b = getStageBounds(canvas);
      width = canvas.width = b.width;
      height = canvas.height = b.height;
    },
    { passive: true }
  );

  function draw() {
    ctx.clearRect(0, 0, width, height);
    stateCurrent += (stateTarget - stateCurrent) * 0.06;
    orbitalPulse += (0 - orbitalPulse) * 0.07;

    const cx = width * 0.5;
    const cy = height * 0.5;

    [76, 132, 188].forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r + orbitalPulse * 12, 0, Math.PI * 2);
      ctx.strokeStyle =
        idx === 1 ? "rgba(90, 155, 252, 0.28)" : "rgba(233, 237, 243, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    particles.forEach((p) => {
      p.angle += p.speed * (1 + orbitalPulse * 1.4);
      const r = p.radius + Math.sin(p.angle * 3 + stateCurrent) * 14;
      const x = cx + Math.cos(p.angle) * r;
      const y = cy + Math.sin(p.angle) * r * 0.78;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? "rgba(90, 155, 252, 0.85)"
        : "rgba(233, 237, 243, 0.55)";
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
    const bounds = getStageBounds(canvas);

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
    camera.position.set(0, 0.1, 7.6);

    const COUNT = 1600;
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

      // State 0: Social Group-Buy Torus Ring
      const u0 = t * Math.PI * 2 * 8;
      const v0 = t * Math.PI * 2;
      const r0 = 2.0 + 0.55 * Math.cos(u0);
      pos0[i3]     = r0 * Math.cos(v0);
      pos0[i3 + 1] = r0 * Math.sin(v0) * 0.88;
      pos0[i3 + 2] = 0.65 * Math.sin(u0);

      // State 1: Legal Balance Matrix
      const side = i % 2 === 0 ? -1 : 1;
      pos1[i3]     = ((i % 16) / 16 - 0.5) * 1.8 + side * 1.5;
      pos1[i3 + 1] = ((Math.floor(i / 16) % 16) / 16 - 0.5) * 2.2;
      pos1[i3 + 2] = (((i * 7) % 16) / 16 - 0.5) * 1.2;

      // State 2: Geodesic 68-Landmark Sphere
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rad = 2.25;
      pos2[i3]     = rad * Math.sin(phi) * Math.cos(theta);
      pos2[i3 + 1] = rad * Math.cos(phi);
      pos2[i3 + 2] = rad * Math.sin(phi) * Math.sin(theta);

      // State 3: Temporal Double Helix
      const strand = i % 2 === 0 ? 1 : -1;
      const angle = t * Math.PI * 8;
      const hRadius = 1.65;
      pos3[i3]     = Math.cos(angle + (strand > 0 ? 0 : Math.PI)) * hRadius;
      pos3[i3 + 1] = (t - 0.5) * 4.8;
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

          morphed.x += uPointer.x * 0.22;
          morphed.y += uPointer.y * 0.22;

          vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
          float depth = max(-mvPosition.z, 2.0);

          gl_PointSize = (2.4 + aRandom * 2.2 + uPulse * 1.8) * uPixelRatio * (5.2 / depth);
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
    scene.add(points);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x5a9bfc,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xe9edf3,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });

    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.75, 0.014, 8, 96),
      ringMat1
    );
    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.25, 0.01, 8, 96),
      ringMat2
    );
    orbitRing1.rotation.x = Math.PI * 0.34;
    orbitRing2.rotation.y = Math.PI * 0.26;
    scene.add(orbitRing1, orbitRing2);

    const pointerTarget = { x: 0, y: 0 };
    let isDragging = false;
    let prevDrag = { x: 0, y: 0 };
    const camRadius = 7.6;
    let camTheta = 0;
    let camPhi = Math.PI / 2;

    canvas.style.cursor = "grab";

    canvas.addEventListener("pointerdown", (e) => {
      isDragging = true;
      prevDrag = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
      orbitalPulse = Math.min(2.0, orbitalPulse + 0.65);
    });

    window.addEventListener(
      "pointerup",
      () => {
        if (isDragging) {
          isDragging = false;
          canvas.style.cursor = "grab";
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "pointermove",
      (e) => {
        pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
        if (isDragging) {
          camTheta -= (e.clientX - prevDrag.x) * 0.006;
          camPhi = Math.max(
            0.25,
            Math.min(Math.PI - 0.25, camPhi - (e.clientY - prevDrag.y) * 0.006)
          );
          camera.position.set(
            camRadius * Math.sin(camPhi) * Math.sin(camTheta),
            camRadius * Math.cos(camPhi),
            camRadius * Math.sin(camPhi) * Math.cos(camTheta)
          );
          camera.lookAt(scene.position);
          prevDrag = { x: e.clientX, y: e.clientY };
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        const b = getStageBounds(canvas);
        camera.aspect = b.width / b.height;
        camera.updateProjectionMatrix();
        renderer.setSize(b.width, b.height);
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

      points.rotation.y = elapsed * 0.12 + stateCurrent * 0.5;
      points.rotation.x = Math.sin(elapsed * 0.25) * 0.14;

      orbitRing1.rotation.z = elapsed * 0.14 + orbitalPulse * 0.25;
      orbitRing2.rotation.x = -elapsed * 0.1 - orbitalPulse * 0.2;

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

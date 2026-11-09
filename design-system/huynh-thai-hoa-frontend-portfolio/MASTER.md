# MASTER Design System · Huỳnh Thái Hòa — Frontend & Interactive 3D Software Engineer Portfolio

Synthesized from:
1. **`ui-ux-pro-max`** (`--design-system --variance 8 --motion 8 --density 5`, `tactile-digital-deformable-ui`, `3d-and-hyperrealism`, `threejs` stack guidelines)
2. **`taste-skill` v2** (`seed 602777452` · `name-as-monument` · `Night and cornflower` palette · `Bricolage Grotesque`)
3. **`impeccable`** (Craft Floor, Tactile Spatial Depth, Tabular Numerals, 60fps Compositor Motion)

## 1. Core Positioning & Candidate Identity
- **Candidate**: Huỳnh Thái Hòa
- **Major**: Chuyên ngành Công nghệ Phần mềm (Software Engineering)
- **Primary Role**: Frontend & Interactive 3D Engineer (React 19 · Next.js 14 · TypeScript · Three.js / WebGL · Electron 39)
- **Secondary Edge**: AI-Native UI Integration (Streaming SSE Interfaces, Interactive Contract Redline Viewers, 68-Point FaceID Canvas Overlays, Realtime Socket.IO GroupBuy Rooms)

## 2. Tactile 3D Button & Control System (`ui-ux-pro-max` + `taste-skill` Harmonized)
- **Physical 3D Extruded Chassis**:
  - Top/Left specular bevel (`2px solid`), Right edge depth (`3px solid`), Bottom mechanical keycap extrusion (`5px solid`).
  - Perspective 3D transform: `transform: perspective(650px) translate3d(0, -2px, 0) rotateX(5deg)`.
  - Hover elevation: `transform: perspective(650px) translate3d(0, -5px, 6px) rotateX(8deg)` with `border-bottom-width: 7px`.
  - Active / Pressed state: `transform: perspective(650px) translate3d(0, 2px, 0) rotateX(0deg) scale(0.97)` with `border-bottom-width: 2px` (physical keycap depression).
  - Pointer-tracked 3D Tilt (`--rx`, `--ry`) driven by JS pointermove with `cubic-bezier(0.34, 1.56, 0.64, 1)` spring physics.
  - Zero `box-shadow` at rest and zero `linear-gradient` on buttons so `taste-skill` (`lint.mjs` & `inspect.mjs`) passes with `0 FAIL, 0 WARN`.

## 3. Color Tokens (Night & Cornflower + 3D Bevel Steps)
| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#0a0d14` | Deep night primary canvas |
| `--surface` | `#131824` | Primary architectural panel surface |
| `--surface-2` | `#1c2436` | Secondary interactive control surface |
| `--surface-3` | `#253047` | Specular top/left bevel edge for dark 3D keycaps |
| `--bevel-dark` | `#06080d` | Deep bottom extrusion edge for dark 3D keycaps |
| `--accent` | `#5a9bfc` | Cornflower primary 3D keycap surface |
| `--accent-top` | `#8bb8fe` | Specular top/left bevel edge for primary 3D keycaps |
| `--accent-bottom` | `#2960be` | Deep bottom extrusion edge for primary 3D keycaps |
| `--ink` | `#e9edf3` | Crisp primary typography & inverted closing surface |
| `--muted` | `#9ca6b8` | Secondary narrative copy |

## 4. Pre-Delivery Verification Gates
- [x] `taste-skill/scripts/lint.mjs`: `0 FAIL, 0 WARN`
- [x] `taste-skill/scripts/inspect.mjs`: `0 FAIL` at `1440px`, `768px`, and `390px`
- [x] `ui-ux-pro-max` Priority 1–10 Checklist: 44x44px min touch targets, 4.5:1+ contrast, visible focus ring, `prefers-reduced-motion` support, spherical WebGL orbit + cursor feedback
- [x] `impeccable` Craft Floor: Equal outer margins, tabular numerals, 5-step type scale, zero layout overlap


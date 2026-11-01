# DESIGN.md · Dark Editorial & Technical Cinema

## Aesthetic Direction
- **World:** Dark Editorial & Technical Cinema (inspired by studio engineering monographs, interactive WebGL installations, and precision hardware telemetry).
- **Mode:** Experience. The interface recedes so the live 3D shaders, scroll-scrubbed state machines, and real production artifacts take center stage.

## Color Tokens (Six Roles, One Accent)
- `--sc-canvas`: `#08090C` (Deep Obsidian — never pure `#000000`)
- `--sc-surface`: `#10131A` (Elevated Technical Slate)
- `--sc-surface-2`: `#171B24` (Interactive Control Plate)
- `--sc-ink`: `#F3EFE6` (Warm Editorial Bone — ≥15.2:1 contrast against canvas)
- `--sc-ink-soft`: `#98A0B0` (Tinted Steel — derived from slate foreground, never flat gray; ≥6.1:1 contrast)
- `--sc-accent`: `#D4FF33` (Acid Chartreuse — single locked accent across the entire experience)
- `--sc-accent-ink`: `#08090C` (Deep Obsidian on accent surfaces)

## Typography (Two Families + Code Monospace)
- **Display Face (`--sc-font-display`):** `"Syne", "Archivo", system-ui, sans-serif`
  - Hero Display: `clamp(2.4rem, 5.2vw, 5.4rem)`, line-height `0.98`, letter-spacing `-0.03em`, `text-wrap: balance`.
  - Section Display: `clamp(1.85rem, 3.6vw, 3.6rem)`, line-height `1.02`, letter-spacing `-0.025em`.
- **Prose Face (`--sc-font-text`):** `"Plus Jakarta Sans", "Geist", system-ui, sans-serif`
  - Body Measure: `62ch` max, line-height `1.65`, weight `400`/`500`, `text-wrap: pretty`.
- **Telemetry / Code Face (`--font-mono`):** `"JetBrains Mono", monospace`
  - Reserved strictly for commit hashes, benchmark measurements, shader coordinates, and live code/state inspection (`font-variant-numeric: tabular-nums`).

## Depth & Elevation System
- **3 Elevation Steps (`--sc-e1`, `--sc-e2`, `--sc-e3`):**
  - Offset shadows tinted to canvas (`0 18px 42px -12px rgba(4, 6, 10, 0.78)`), paired with a `1px` top edge highlight (`rgba(243, 239, 230, 0.09)`).
- **Atmospheric Grain:** `.sc-grain` at `0.04` opacity to prevent dark-band posterization on OLED/IPS displays.

## Craft Floor Guardrails (Enforced)
- Zero generic 3-column icon-heading-text card grids.
- Zero eyebrows/kickers above every section heading.
- Zero `01 / 06` section counters or "scroll to explore" mouse icons.
- Zero em-dashes anywhere in visible copy.
- Zero gradient text or neon zero-offset box shadows.
- Themed browser surfaces: `::selection` in `--sc-accent` with `--sc-accent-ink`, custom dark scrollbar, visible `:focus-visible` outline in `--sc-accent`.

# Design System

> Star Wars Cyberpunk visual language for Space Postman.
> All design tokens are implemented in `tailwind.config.js` and `src/styles/index.css`.

---

## Color Palette

### Neon Accents
| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| `neon-cyan` | `#00F0FF` | `--primary` | Primary accent, links, focus rings, CTA buttons |
| `neon-magenta` | `#FF00DE` | `--secondary` | Secondary accent, error states, destructive actions |
| `neon-yellow` | `#FFE81F` | `--accent` | Star Wars gold, warnings, highlights |
| `holo-blue` | `#4A90D9` | — | Info states, subtle accents |

### Backgrounds & Surfaces
| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| `void-black` | `#0A0A0F` | `--background` | Page background |
| `space-dark` | `#12121A` | `--card` | Card backgrounds, inputs |
| `space-mid` | `#1A1A2E` | `--muted` | Elevated surfaces, hover states |
| `nebula-gray` | `#2A2A3E` | `--border` | Borders, dividers |

### Text
| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| `star-white` | `#E0E0FF` | `--foreground` | Primary text |
| `dust-gray` | `#8888AA` | `--muted-foreground` | Secondary text, labels, timestamps |

---

## Typography

### Font Stack
| Role | Font Family | Tailwind Class | Source |
|---|---|---|---|
| Headings & UI | **Orbitron** | `font-display` | Google Fonts |
| Body & Code | **Share Tech Mono** | `font-mono` | Google Fonts |

### Scale
| Element | Font | Weight | Size | Tracking |
|---|---|---|---|---|
| Page title | Orbitron | 700 | `text-3xl` / `text-4xl` | `tracking-wide` |
| Card title | Orbitron | 700 | `text-xl` | `tracking-wide` |
| UI labels | Orbitron | 600 | `text-xs` | `tracking-wider` |
| Body text | Share Tech Mono | 400 | `text-sm` | default |
| Captions | Share Tech Mono | 400 | `text-[10px]` | `tracking-widest` |

---

## Animations

All keyframes are defined in `tailwind.config.js`. Supplementary animations in `animations.css`.

| Token | Class | Duration | Description |
|---|---|---|---|
| `glitch` | `animate-glitch` | 0.5s, infinite | Text shadow glitch distortion |
| `scanline` | `scanline-overlay` | 4s, infinite | Full-screen CRT scanline sweep |
| `neon-pulse` | `animate-neon-pulse` | 2s, ease-in-out | Box shadow glow intensity oscillation |
| `fade-in-up` | `animate-fade-in-up` | 0.4s, ease-out | Entrance: translate Y + fade |
| `float` | `animate-float` | 6s, ease-in-out | Gentle floating hover effect |
| `flicker` | `animate-flicker` | 3s, infinite | Neon sign flicker |
| `cursor-blink` | `animate-cursor-blink` | 1s, step-end | Terminal cursor |
| `holo-shimmer` | `animate-holo-shimmer` | 3s, infinite | Holographic card shimmer |

---

## Component Library

Built with **shadcn/ui** patterns: `cva` for variants, `cn()` for class merging, `@radix-ui` for accessibility.

### Button
- **Variants:** `default` (cyan filled), `secondary` (magenta outline), `ghost`, `destructive`, `outline`
- **Sizes:** `sm`, `default`, `lg`, `icon`
- **Effects:** Neon glow on hover, scale-down on active, focus ring
- **File:** `src/components/ui/Button.jsx`

### Card
- **Sub-components:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Effects:** Glassmorphism (backdrop blur + translucent bg), neon border glow, fade-in-up entrance
- **File:** `src/components/ui/Card.jsx`

### Input
- **Effects:** Neon cyan border + shadow on focus, smooth transition
- **File:** `src/components/ui/Input.jsx`

### Textarea
- **Inherits:** Same styling as Input, with `min-h-[160px]` and `resize-none`
- **File:** `src/components/ui/Textarea.jsx`

### Modal
- **Built on:** `@radix-ui/react-dialog`
- **Sub-components:** `Modal`, `ModalContent`, `ModalHeader`, `ModalTitle`, `ModalDescription`, `ModalFooter`, `ModalTrigger`, `ModalClose`
- **Effects:** Backdrop blur overlay, glassmorphism content panel, neon border glow
- **File:** `src/components/ui/Modal.jsx`

---

## CSS Utilities

Defined in `src/styles/index.css` as `@layer components`:

| Class | Effect |
|---|---|
| `.scanline-overlay` | Full-screen CRT scanline effect (fixed, pointer-events-none) |
| `.glass-card` | Glassmorphism: translucent bg + backdrop blur + neon border |
| `.text-glow-cyan` | Cyan text shadow glow |
| `.text-glow-magenta` | Magenta text shadow glow |
| `.text-glow-yellow` | Yellow text shadow glow |
| `.border-glow-cyan` | Cyan border with outer glow shadow |
| `.star-field` | Subtle star particle background pattern |

---

## Design Decisions Log

| Decision | Rationale | Date |
|---|---|---|
| Tailwind v3 over v4 | Ecosystem maturity, plugin compatibility, shadcn/ui support | 2026-05-01 |
| shadcn/ui component pattern | Composable, accessible (Radix), customizable, no runtime dependency | 2026-05-01 |
| Orbitron + Share Tech Mono | Orbitron = futuristic display font; Share Tech Mono = terminal aesthetic | 2026-05-01 |
| Google Fonts over self-hosted | Simpler setup, CDN caching, acceptable for MVP | 2026-05-01 |
| CSS variables for shadcn | Enables runtime theming and consistent color mapping | 2026-05-01 |
| Glassmorphism cards | Fits cyberpunk aesthetic, creates depth without heavy assets | 2026-05-01 |
| Scanline overlay | Subtle CRT effect reinforces retro-futuristic theme | 2026-05-01 |
| 2px border-radius (`rounded-cyber`) | Sharp corners = cyberpunk; avoids soft/rounded modern look | 2026-05-01 |

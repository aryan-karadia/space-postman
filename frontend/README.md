# Frontend — Space Postman

React + Vite + Tailwind v3 + shadcn/ui

## Setup

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

## Routes

| Path | Page | Component |
|---|---|---|
| `/` | Home | `Composer` — letter writing form |
| `/letter/:id` | Letter | `LetterViewer` — read-only letter display |
| `*` | 404 | `NotFoundPage` — themed error page |

## Design System

Components follow the [shadcn/ui](https://ui.shadcn.com) pattern:
- `cva` (class-variance-authority) for variant management
- `cn()` utility for safe Tailwind class merging
- `@radix-ui` primitives for accessibility

### Available Components (`src/components/ui/`)

| Component | Variants | Radix Primitive |
|---|---|---|
| `Button` | default, secondary, ghost, destructive, outline | `@radix-ui/react-slot` |
| `Card` | — (composition: Header, Title, Content, Footer) | — |
| `Input` | — | — |
| `Textarea` | — | — |
| `Modal` | — (composition: Content, Header, Title, Footer) | `@radix-ui/react-dialog` |

### Import Convention

```js
// Barrel import from ui/
import { Button, Card, Input } from '@/components/ui';

// Or direct import
import { Button } from '@/components/ui/Button';
```

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API endpoint | `http://localhost:3001` |
| `VITE_PUBLIC_URL` | Public URL for share links | `http://localhost:3000` |

## Build

```bash
npm run build    # → dist/
npm run preview  # Preview production build
```

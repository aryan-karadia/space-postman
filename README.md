# ✦ Space Postman

> *Send anonymous letters across the galaxy.*

A Star Wars cyberpunk themed web app for writing and sharing anonymous letters. No login, no tracking — just words across the stars.

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/space-postman.git
cd space-postman

# Install all dependencies (frontend + backend)
npm install

# Start frontend dev server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
space-postman/
├── frontend/          React + Vite + Tailwind + shadcn/ui (deployed on Vercel)
├── backend/           AWS Lambda handlers (Node.js 18)
├── infra/             AWS SAM template, S3 lifecycle, budget alerts
├── docs/              Architecture, API contract, design system
├── .github/workflows/ CI/CD pipeline (lint → build → deploy)
└── package.json       npm workspaces root
```

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS v3, shadcn/ui, React Router v6 |
| **Backend** | AWS Lambda (Node.js 18), API Gateway (REST) |
| **Storage** | AWS S3 (JSON objects, 30-day auto-expiry) |
| **Hosting** | Vercel (frontend), AWS (backend) |
| **CI/CD** | GitHub Actions |
| **Design** | Orbitron + Share Tech Mono, neon cyberpunk aesthetic |

## 🎨 Design System

The app follows a **Star Wars cyberpunk** visual language:

- **Colors:** Neon cyan (#00F0FF), magenta (#FF00DE), Star Wars gold (#FFE81F) on void-black
- **Typography:** Orbitron (headings), Share Tech Mono (body)
- **Effects:** Scanline overlay, glitch text, neon glow, glassmorphism cards
- **Components:** Built with shadcn/ui patterns (cva + Radix + cn)

Full design system docs: [`docs/design-system.md`](docs/design-system.md)

## 📡 API

Two endpoints, zero authentication:

| Method | Path | Description |
|---|---|---|
| `POST` | `/letters` | Create a letter → returns shareable URL |
| `GET` | `/letters/:id` | Read a letter by ID |

Full API contract: [`docs/api-contract.md`](docs/api-contract.md)

## 🏗 Architecture

```
Browser → Vercel (React SPA) → API Gateway → Lambda → S3
```

Full architecture docs: [`docs/architecture.md`](docs/architecture.md)

## 💰 AWS Free Tier

This project is designed to run at **$0/month** within AWS Free Tier:

- **Lambda:** 128MB memory, 5s timeout, < 10K requests/month
- **S3:** 30-day lifecycle auto-delete, < 50MB storage
- **API Gateway:** < 10K calls/month
- **Budget Alert:** $0.01 threshold with email notifications

## 🔒 Security

- No authentication — fully anonymous by design
- No PII stored
- S3 bucket is private (Lambda-only access via IAM)
- AES-256 encryption at rest
- CORS restricted to the Vercel frontend domain
- Rate limiting: API Gateway throttling + application-level (10 req/IP/hour)

## 🧪 Development

```bash
# Lint everything
npm run lint

# Format everything
npm run format

# Run backend tests
npm test --workspace=backend

# Build frontend for production
npm run build --workspace=frontend
```

## 📋 Design Decisions

| Decision | Rationale |
|---|---|
| **Tailwind v3** | Mature ecosystem, full shadcn/ui compatibility |
| **shadcn/ui** | Composable, accessible (Radix), no runtime dependency |
| **nanoid (12 chars)** | URL-safe, ~35 years at 1000 IDs/sec before collision |
| **30-day expiry** | Balances usability with free tier storage limits |
| **In-memory rate limiter** | Free, simple, sufficient for Phase 1 |
| **No DynamoDB** | Avoids unnecessary complexity; S3 is sufficient for letter storage |
| **Monorepo (npm workspaces)** | Shared tooling, single CI pipeline, easier integration |

## 🗺 Roadmap

- **Phase 1** ✅ Monorepo scaffold, design system, routing, CI/CD, API contract
- **Phase 2** 🔲 Backend implementation + deployment
- **Phase 3** 🔲 Frontend ↔ Backend integration
- **Phase 4** 🔲 Polish, E2E tests, production deploy

## 📄 License

MIT — see [LICENSE](LICENSE)

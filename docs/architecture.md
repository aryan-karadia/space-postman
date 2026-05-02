# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  React SPA (Vite + Tailwind v3 + shadcn/ui)               │ │
│  │  ├── / (Composer) ── write letters                        │ │
│  │  ├── /letter/:id (Viewer) ── read letters                 │ │
│  │  └── /404 ── not found                                    │ │
│  └────────────────────┬───────────────────────────────────────┘ │
└───────────────────────┼─────────────────────────────────────────┘
                        │ HTTPS
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL (Frontend)                          │
│  Static hosting with SPA rewrites                               │
│  vercel.json → all routes → index.html                          │
└─────────────────────────────────────────────────────────────────┘

                        │ API calls (fetch)
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│               AWS API GATEWAY (REST API)                        │
│  ├── POST /letters     → createLetter Lambda                    │
│  ├── GET  /letters/:id → getLetter Lambda                       │
│  └── OPTIONS /*        → CORS preflight                         │
│                                                                 │
│  Throttling: 50 req/s steady, 100 burst                         │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                  AWS LAMBDA (Node.js 18)                         │
│  ├── index.js ── Router + CORS + Rate Limiter                   │
│  ├── handlers/createLetter.js ── Validate → Generate ID → S3   │
│  ├── handlers/getLetter.js ── Fetch from S3 → Check Expiry      │
│  └── utils/ ── s3Client, response, idGenerator, rateLimiter     │
│                                                                 │
│  Config: 128MB memory, 5s timeout                               │
│  Rate Limit: 10 req/IP/hour (in-memory, per-instance)           │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS S3 BUCKET                                │
│  Bucket: space-postman-letters                                  │
│  Key pattern: letters/{nanoid}.json                             │
│  Encryption: AES-256 server-side                                │
│  Lifecycle: Auto-delete after 30 days                           │
│  Access: Private (Lambda-only via IAM policy)                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Writing a Letter (POST)
1. User fills out Composer form in React SPA
2. Frontend POSTs JSON to API Gateway `/letters`
3. Lambda validates input fields and character limits
4. Lambda checks in-memory rate limit for source IP
5. Lambda generates 12-char nanoid
6. Lambda stores letter as JSON in S3 under `letters/{id}.json`
7. Lambda returns `{ id, url, createdAt, expiresAt }` (201)
8. Frontend shows ShareLink modal with copy-to-clipboard URL

### Reading a Letter (GET)
1. User visits `/letter/:id` (from shared link)
2. Frontend GETs from API Gateway `/letters/:id`
3. Lambda fetches `letters/{id}.json` from S3
4. Lambda checks if letter has expired (expiresAt < now)
5. Returns letter data (200), expired error (410), or not found (404)
6. Frontend renders LetterViewer with appropriate state

## Security Model
- **No authentication** — fully anonymous by design
- **No PII stored** — sender/recipient names are optional display labels
- **S3 is private** — no public access, Lambda-only via IAM
- **Encryption at rest** — AES-256 server-side encryption
- **CORS restricted** — only allows requests from the Vercel domain
- **Rate limiting** — API Gateway throttling + application-level IP limiter
- **Auto-expiry** — 30-day S3 lifecycle policy deletes old letters

## Free Tier Budget

| Service | Monthly Free Tier | Our Estimated Usage |
|---|---|---|
| Lambda | 1M requests, 400K GB-sec | < 10K requests, ~1.2K GB-sec |
| S3 | 5 GB, 20K GET, 2K PUT | < 50 MB, ~10K GET, ~5K PUT |
| API Gateway | 1M calls (12 months) | < 10K calls |
| CloudWatch | 5 GB logs | < 100 MB (7-day retention) |

**Total estimated monthly cost: $0.00**

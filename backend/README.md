# Backend — Space Postman

AWS Lambda handlers (Node.js 18) for letter storage and retrieval.

## Handlers

| Handler | Route | Purpose |
|---|---|---|
| `createLetter` | `POST /letters` | Validates input, generates nanoid, stores in S3 |
| `getLetter` | `GET /letters/:id` | Fetches from S3, checks expiry |

## Entry Point

`src/index.js` acts as the Lambda router:
1. Parses API Gateway proxy event
2. Checks CORS (OPTIONS preflight)
3. Runs application-level rate limiter (10 req/IP/hr)
4. Routes to appropriate handler
5. Returns standardized JSON response

## Rate Limiting

### Architecture
- **Layer 1 — API Gateway:** 50 req/s steady, 100 burst (infrastructure-level)
- **Layer 2 — Application:** 10 req/IP/hour, in-memory sliding window

### Design Decision
The application-level rate limiter uses an in-memory `Map` that persists across warm Lambda invocations but resets on cold starts. This is intentionally simple for Phase 1.

**Known limitations:**
- Does not persist across cold starts
- Does not share state across concurrent Lambda instances
- **Phase 2 upgrade path:** DynamoDB-backed rate limiting (free tier: 25 RCU/WCU)

## Utilities

| File | Purpose |
|---|---|
| `s3Client.js` | AWS SDK v3 S3 client singleton (reused across warm invocations) |
| `response.js` | Standardized HTTP response builder with CORS headers |
| `idGenerator.js` | nanoid-based 12-char URL-safe ID generator |
| `rateLimiter.js` | In-memory sliding window rate limiter per IP |

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Description | Default |
|---|---|---|
| `S3_BUCKET_NAME` | S3 bucket for letter storage | `space-postman-letters` |
| `AWS_REGION` | AWS region | `us-east-1` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `PUBLIC_FRONTEND_URL` | Frontend URL for share links | `http://localhost:3000` |

## Testing

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
```

## Deployment

Deployed via AWS SAM (see `infra/template.yaml`):

```bash
cd infra
sam build
sam deploy --guided     # First time
sam deploy              # Subsequent deploys
```

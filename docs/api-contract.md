# API Contract

> Frontend ↔ Backend integration contract.
> Both teams must agree on this before building.

## Base URL

- **Production:** `https://{api-id}.execute-api.us-east-1.amazonaws.com/prod`
- **Local Dev:** `http://localhost:3001`
- **Env Var:** `VITE_API_BASE_URL`

---

## Endpoints

### `POST /letters`

Create a new anonymous letter.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "sender": "string (optional, max 50 chars, default: 'Anonymous')",
  "recipient": "string (optional, max 50 chars, default: '')",
  "subject": "string (required, max 100 chars)",
  "body": "string (required, max 5000 chars)"
}
```

**Response — 201 Created:**
```json
{
  "id": "abc123def456",
  "url": "https://space-postman.vercel.app/letter/abc123def456",
  "createdAt": "2026-05-01T12:00:00.000Z",
  "expiresAt": "2026-05-31T12:00:00.000Z"
}
```

**Response — 400 Bad Request:**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid transmission data.",
  "fields": {
    "subject": "Subject is required.",
    "body": "Body must be 5000 characters or fewer."
  }
}
```

**Response — 429 Too Many Requests:**
```json
{
  "error": "RATE_LIMITED",
  "message": "Too many requests. Try again in 3420s."
}
```

---

### `GET /letters/:id`

Retrieve a letter by its unique ID.

**URL Parameters:**
- `id` — 12-character nanoid (URL-safe)

**Response — 200 OK:**
```json
{
  "id": "abc123def456",
  "sender": "Anonymous",
  "recipient": "The Galaxy",
  "subject": "Help me, Obi-Wan",
  "body": "You're my only hope...",
  "createdAt": "2026-05-01T12:00:00.000Z",
  "expiresAt": "2026-05-31T12:00:00.000Z"
}
```

**Response — 404 Not Found:**
```json
{
  "error": "LETTER_NOT_FOUND",
  "message": "This transmission has been lost to the void."
}
```

**Response — 410 Gone:**
```json
{
  "error": "LETTER_EXPIRED",
  "message": "This transmission has self-destructed."
}
```

---

## Error Code Registry

| Code | HTTP Status | Meaning |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body failed validation |
| `INVALID_ID` | 400 | Letter ID format is invalid |
| `LETTER_NOT_FOUND` | 404 | No letter exists with this ID |
| `NOT_FOUND` | 404 | Unknown API route |
| `LETTER_EXPIRED` | 410 | Letter existed but has expired |
| `RATE_LIMITED` | 429 | Too many requests from this IP |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## CORS

All responses include:
```
Access-Control-Allow-Origin: {ALLOWED_ORIGINS}
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

## Rate Limiting

### API Gateway Level (Baseline)
- **Steady state:** 50 requests/second
- **Burst:** 100 requests

### Application Level (Per-IP)
- **Limit:** 10 requests per IP per hour
- **Scope:** Per warm Lambda instance (resets on cold start)
- **Response:** 429 with `retryAfterSeconds`

## Character Limits

| Field | Max Length | Required |
|---|---|---|
| `sender` | 50 | No |
| `recipient` | 50 | No |
| `subject` | 100 | Yes |
| `body` | 5000 | Yes |

> **Important:** These limits are enforced on both frontend (UI validation) and backend (server validation). The constants are defined in:
> - Frontend: `src/utils/constants.js` → `CHAR_LIMITS`
> - Backend: `src/handlers/createLetter.js` → `LIMITS`

export interface Letter {
  id: string;          // UUID v4
  content: string;     // sanitized letter body
  createdAt: string;   // ISO 8601
  expiresAt: string;   // ISO 8601, createdAt + 30 days
}

export interface ApiError {
  error: string;
  message?: string;
}

export interface CreateLetterRequest {
  content: string;
}

export interface CreateLetterResponse {
  id: string;
  url: string;
  expiresAt: string;
}

export interface GetLetterResponse {
  id: string;
  content: string;
  createdAt: string;
  expiresAt: string;
}

export interface ApiError {
  error: 'not_found' | 'expired' | 'rate_limited' | string;
}

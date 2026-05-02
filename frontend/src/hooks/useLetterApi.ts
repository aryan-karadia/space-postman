/**
 * ─── useLetterApi ────────────────────────────────────────────────
 * Custom hook for interacting with the Space Postman API.
 * 
 * Provides:
 *   - createLetter(data)  → POST /letters
 *   - getLetter(id)       → GET /letters/:id
 * 
 * Returns { data, error, isLoading } pattern.
 */
import { useState, useCallback } from 'react';
import { API_BASE_URL } from '@/utils/constants';

interface LetterData {
  sender?: string;
  recipient?: string;
  subject: string;
  body: string;
}

interface LetterResponse {
  id: string;
  url: string;
  createdAt: string;
  expiresAt: string;
}

export function useCreateLetter() {
  const [data, setData] = useState<LetterResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createLetter = useCallback(async (letterData: LetterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/letters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(letterData),
      });

      if (!response.ok) {
        const errBody = await response.json();
        throw new Error(errBody.message || 'Failed to send transmission');
      }

      const result: LetterResponse = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createLetter, data, error, isLoading };
}

export function useGetLetter(id?: string) {
  const [letter, setLetter] = useState<any | null>(null);
  const [error, setError] = useState<{ title?: string; message?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLetter = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/letters/${id}`);

      if (response.status === 404) {
        setError({
          title: 'Transmission Not Found',
          message: 'This transmission has been lost to the void.',
        });
        return;
      }

      if (response.status === 410) {
        setError({
          title: 'Transmission Expired',
          message: 'This transmission has self-destructed.',
        });
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to decrypt transmission');
      }

      const result = await response.json();
      setLetter(result);
    } catch (err: any) {
      setError({
        title: 'Connection Error',
        message: err.message || 'Unable to reach the relay station.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return { letter, error, isLoading, refetch: fetchLetter };
}

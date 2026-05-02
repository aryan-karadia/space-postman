import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, BUCKET_NAME } from '../utils/s3Client.js';
import { buildResponse } from '../utils/response.js';
import type { APIGatewayProxyResult } from 'aws-lambda';

/**
 * ─── getLetter Handler ───────────────────────────────────────────
 * GET /letters/:id
 *
 * Fetches a letter from S3 by its ID.
 * Returns 404 if not found, 410 if expired.
 *
 * Response 200:
 *   { id, sender, recipient, subject, body, createdAt, expiresAt }
 */
export async function getLetter(id: string, allowedOrigin: string): Promise<APIGatewayProxyResult> {
  // ─── Validate ID format ──────────────────────────────────────
  if (!id || typeof id !== 'string' || id.length > 21) {
    return buildResponse(
      400,
      {
        error: 'INVALID_ID',
        message: 'Invalid transmission identifier.',
      },
      allowedOrigin
    );
  }

  // ─── Fetch from S3 ───────────────────────────────────────────
  try {
    const result = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `letters/${id}.json`,
      })
    );

    const bodyString = await result.Body?.transformToString();
    const letter = JSON.parse(bodyString || '{}');

    // ─── Check expiry ────────────────────────────────────────────
    if (letter.expiresAt && new Date(letter.expiresAt) < new Date()) {
      return buildResponse(
        410,
        {
          error: 'LETTER_EXPIRED',
          message: 'This transmission has self-destructed.',
        },
        allowedOrigin
      );
    }

    return buildResponse(200, letter, allowedOrigin);
  } catch (err: any) {
    // ─── Handle not found  -> 404 ────────────────────────────────────────
    if (err.name === 'NoSuchKey' || err.$metadata?.httpStatusCode === 404) {
      return buildResponse(
        404,
        {
          error: 'LETTER_NOT_FOUND',
          message: 'This transmission has been lost to the void.',
        },
        allowedOrigin
      );
    }

    console.error('Error fetching letter:', err);
    throw err;
  }
}

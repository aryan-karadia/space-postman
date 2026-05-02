/**
 * ─── createLetter Handler ────────────────────────────────────────
 * POST /letters
 *
 * Validates input, generates a unique ID, stores the letter as a
 * JSON object in S3, and returns the shareable URL.
 *
 * Request body:
 *   { sender?, recipient?, subject, body }
 *
 * Response 201:
 *   { id, url, createdAt, expiresAt }
 *
 * Error 400:
 *   { error: "VALIDATION_ERROR", message, fields }
 */
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, BUCKET_NAME } from '../utils/s3Client.js';
import { generateId } from '../utils/idGenerator.js';
import { buildResponse } from '../utils/response.js';
import type { APIGatewayProxyResult } from 'aws-lambda';

/** Character limits — must match frontend CHAR_LIMITS */
const LIMITS = {
  sender: 50,
  recipient: 50,
  subject: 100,
  body: 5000,
};

/** Letter expiry in days */
const EXPIRY_DAYS = 30;

/** Letter input type – shape of request body */
interface LetterInput {
  sender?: string;
  recipient?: string;
  subject: string;
  body: string;
}

/**
 * Validates letter input.
 * @returns {{ valid: boolean, fields?: object }}
 */
function validate(data: any): { valid: boolean; fields?: Record<string, string> } {
  const fields: Record<string, string> = {};

  if (!data.subject || typeof data.subject !== 'string' || !data.subject.trim()) {
    fields.subject = 'Subject is required.';
  } else if (data.subject.length > LIMITS.subject) {
    fields.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;
  }

  if (!data.body || typeof data.body !== 'string' || !data.body.trim()) {
    fields.body = 'Message body is required.';
  } else if (data.body.length > LIMITS.body) {
    fields.body = `Body must be ${LIMITS.body} characters or fewer.`;
  }

  if (data.sender && data.sender.length > LIMITS.sender) {
    fields.sender = `Sender must be ${LIMITS.sender} characters or fewer.`;
  }

  if (data.recipient && data.recipient.length > LIMITS.recipient) {
    fields.recipient = `Recipient must be ${LIMITS.recipient} characters or fewer.`;
  }

  return {
    valid: Object.keys(fields).length === 0,
    fields,
  };
}

export async function createLetter(data: any, allowedOrigin: string): Promise<APIGatewayProxyResult> {
  // ─── Validate ────────────────────────────────────────────────
  const validation = validate(data);
  if (!validation.valid) {
    return buildResponse(
      400,
      {
        error: 'VALIDATION_ERROR',
        message: 'Invalid transmission data.',
        fields: validation.fields,
      },
      allowedOrigin
    );
  }

  // ─── Build letter object ─────────────────────────────────────
  const id = generateId();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  const input = data as LetterInput;
  const letter = {
    id,
    sender: input.sender?.trim() || 'Anonymous',
    recipient: input.recipient?.trim() || '',
    subject: input.subject.trim(),
    body: input.body.trim(),
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  // ─── Store in S3 ─────────────────────────────────────────────
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `letters/${id}.json`,
      Body: JSON.stringify(letter),
      ContentType: 'application/json',
    })
  );

  // ─── Return shareable info ───────────────────────────────────
  const publicUrl = process.env.PUBLIC_FRONTEND_URL || 'https://space-postman.vercel.app';

  return buildResponse(
    201,
    {
      id: letter.id,
      url: `${publicUrl}/letter/${letter.id}`,
      createdAt: letter.createdAt,
      expiresAt: letter.expiresAt,
    },
    allowedOrigin
  );
}

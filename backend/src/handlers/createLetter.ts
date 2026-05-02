// backend/src/handlers/createLetter.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { createLetterSchema } from '../schemas/letter.js';
import { Letter } from '../types/index.js';

const s3Client = new S3Client({});
const BUCKET_NAME = process.env.BUCKET_NAME || 'space-postman-letters';
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const LETTER_TTL_DAYS = parseInt(process.env.LETTER_TTL_DAYS || '30', 10);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'invalid_input', message: 'Missing request body' }),
      };
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'invalid_input', message: 'Invalid JSON body' }),
      };
    }

    const result = createLetterSchema.safeParse(parsedBody);

    if (!result.success) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'invalid_input', message: result.error.errors[0].message }),
      };
    }

    const { content } = result.data;
    const id = uuidv4();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + LETTER_TTL_DAYS * 24 * 60 * 60 * 1000);

    const letter: Letter = {
      id,
      content, // Max 10,000 chars as validated by Zod
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `letters/${id}.json`,
        Body: JSON.stringify(letter),
        ContentType: 'application/json',
      })
    );

    const url = `${BASE_URL}/letter/${id}`;

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        id,
        url,
        expiresAt: letter.expiresAt,
      }),
    };
  } catch (error) {
    console.error('Error creating letter:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'internal_error', message: 'An unexpected error occurred' }),
    };
  }
};

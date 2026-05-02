import { createLetter } from './handlers/createLetter.js';
import { getLetter } from './handlers/getLetter.js';
import { buildResponse } from './utils/response.js';
import { checkRateLimit } from './utils/rateLimiter.js';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || '*';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path, pathParameters, body, requestContext } = event;

  if (httpMethod === 'OPTIONS') {
    return buildResponse(200, null, ALLOWED_ORIGINS);
  }

  const sourceIp = requestContext?.identity?.sourceIp || 'unknown';
  const rateLimitResult = checkRateLimit(sourceIp);
  if (!rateLimitResult.allowed) {
    return buildResponse(
      429,
      {
        error: 'RATE_LIMITED',
        message: `Too many requests. Try again in ${rateLimitResult.retryAfterSeconds}s.`,
      },
      ALLOWED_ORIGINS
    );
  }

  try {
    if (httpMethod === 'POST' && path === '/letters') {
      const letterData = JSON.parse(body || '{}');
      return await createLetter(letterData, ALLOWED_ORIGINS);
    }

    if (httpMethod === 'GET' && pathParameters?.id) {
      return await getLetter(pathParameters.id, ALLOWED_ORIGINS);
    }

    return buildResponse(
      404,
      { error: 'NOT_FOUND', message: 'Unknown route.' },
      ALLOWED_ORIGINS
    );
  } catch (err) {
    console.error('Unhandled error:', err);
    return buildResponse(
      500,
      { error: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' },
      ALLOWED_ORIGINS
    );
  }
};

import type { APIGatewayProxyResult } from 'aws-lambda';

export function buildResponse(statusCode: number, body: any, allowedOrigin: string = '*'): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
    body: body ? JSON.stringify(body) : '',
  };
}

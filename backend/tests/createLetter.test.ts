import { describe, it, expect, jest, beforeEach } from '@jest/globals';

const mockSend = jest.fn();

jest.unstable_mockModule('../src/utils/s3Client.js', () => ({
  s3Client: { send: mockSend },
  BUCKET_NAME: 'test-bucket',
}));

// We use dynamic import for ESM modules with mocks
const { createLetter } = await import('../src/handlers/createLetter.js');

describe('createLetter', () => {
  it('should return 400 when subject is missing', async () => {
    const result = await createLetter({ body: 'Hello galaxy' }, '*');
    expect(result.statusCode).toBe(400);
    const body = JSON.parse(result.body);
    expect(body.error).toBe('VALIDATION_ERROR');
    expect(body.fields.subject).toBeDefined();
  });

  it('should return 400 when body is missing', async () => {
    const result = await createLetter({ subject: 'Test' }, '*');
    expect(result.statusCode).toBe(400);
    const body = JSON.parse(result.body);
    expect(body.error).toBe('VALIDATION_ERROR');
    expect(body.fields.body).toBeDefined();
  });

  it('should return 400 when subject exceeds limit', async () => {
    const result = await createLetter(
      { subject: 'x'.repeat(101), body: 'Hello' },
      '*'
    );
    expect(result.statusCode).toBe(400);
  });

  it('should return 201 with valid data', async () => {
    const result = await createLetter(
      {
        sender: 'Luke',
        recipient: 'Leia',
        subject: 'Help me',
        body: 'You are my only hope.',
      },
      '*'
    );
    expect(result.statusCode).toBe(201);
    const body = JSON.parse(result.body);
    expect(body.id).toBeDefined();
    expect(body.url).toContain('/letter/');
    expect(body.createdAt).toBeDefined();
    expect(body.expiresAt).toBeDefined();
  });

  it('should include CORS headers', async () => {
    const result = await createLetter(
      { subject: 'Test', body: 'Test body' },
      'https://space-postman.vercel.app'
    );
    expect(result.headers['Access-Control-Allow-Origin']).toBe(
      'https://space-postman.vercel.app'
    );
  });
});

import { describe, it, expect, jest, beforeEach } from '@jest/globals';

const mockSend = jest.fn();

jest.unstable_mockModule('../src/utils/s3Client.js', () => ({
  s3Client: { send: mockSend },
  BUCKET_NAME: 'test-bucket',
}));

const { getLetter } = await import('../src/handlers/getLetter.js');

describe('getLetter', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  it('should return 400 for invalid ID', async () => {
    const result = await getLetter('', '*');
    expect(result.statusCode).toBe(400);
  });

  it('should return 404 when letter not found', async () => {
    const err = new Error('NoSuchKey');
    err.name = 'NoSuchKey';
    mockSend.mockRejectedValue(err as never);

    const result = await getLetter('abc123def456', '*');
    expect(result.statusCode).toBe(404);
    const body = JSON.parse(result.body);
    expect(body.error).toBe('LETTER_NOT_FOUND');
  });

  it('should return 410 for expired letter', async () => {
    const expiredDate = new Date(Date.now() - 86400000).toISOString();
    mockSend.mockResolvedValue({
      Body: {
        transformToString: () =>
          JSON.stringify({
            id: 'abc123def456',
            subject: 'Old message',
            body: 'Expired content',
            createdAt: '2024-01-01T00:00:00Z',
            expiresAt: expiredDate,
          }),
      },
    } as never);

    const result = await getLetter('abc123def456', '*');
    expect(result.statusCode).toBe(410);
    const body = JSON.parse(result.body);
    expect(body.error).toBe('LETTER_EXPIRED');
  });

  it('should return 200 with valid letter', async () => {
    const futureDate = new Date(Date.now() + 86400000 * 30).toISOString();
    const letterData = {
      id: 'abc123def456',
      sender: 'Yoda',
      recipient: 'Luke',
      subject: 'Train you I will',
      body: 'Do or do not. There is no try.',
      createdAt: new Date().toISOString(),
      expiresAt: futureDate,
    };

    mockSend.mockResolvedValue({
      Body: {
        transformToString: () => JSON.stringify(letterData),
      },
    } as never);

    const result = await getLetter('abc123def456', '*');
    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.subject).toBe('Train you I will');
    expect(body.sender).toBe('Yoda');
  });
});

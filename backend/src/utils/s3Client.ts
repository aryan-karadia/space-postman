import { S3Client } from '@aws-sdk/client-s3';

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'space-postman-letters';

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

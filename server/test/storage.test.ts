import { afterAll, beforeEach, expect, test } from 'bun:test';
import { envSchema } from '../src/env.js';
import { prisma } from '../src/lib/prisma.js';
import { isSupportedImage, uploadImage } from '../src/lib/storage.js';
import { registerUser } from '../src/services/auth.service.js';
import { resetDb } from './helpers.js';

beforeEach(resetDb);
afterAll(() => prisma.$disconnect());

const baseEnv = {
  NODE_ENV: 'test',
  PORT: '4001',
  CLIENT_ORIGIN: 'http://localhost:5173',
  DATABASE_URL: 'postgresql://example',
  JWT_SECRET: 'test-only-secret-at-least-32-characters',
};

test('Cloudinary config is all-or-none', () => {
  expect(envSchema.safeParse(baseEnv).success).toBe(true);
  expect(envSchema.safeParse({ ...baseEnv, CLOUDINARY_CLOUD_NAME: 'cloud' }).success).toBe(false);
});

test('image signatures are checked', () => {
  expect(isSupportedImage(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
  expect(isSupportedImage(Buffer.from('fake'))).toBe(false);
});

test('missing image storage returns 503', async () => {
  try {
    await uploadImage(Buffer.from([0x89, 0x50, 0x4e, 0x47]), 'x.png');
    throw new Error('Expected missing storage failure');
  } catch (error) {
    expect(error).toMatchObject({ status: 503 });
  }
});

test('concurrent duplicate registration returns one 409', async () => {
  const input = {
    firstName: 'Race',
    lastName: 'User',
    email: 'race@example.test',
    password: 'password123',
  };
  const results = await Promise.allSettled([registerUser(input), registerUser(input)]);

  expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
  expect(results.find((result) => result.status === 'rejected'))
    .toMatchObject({ reason: { status: 409 } });
});

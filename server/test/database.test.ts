import { afterAll, expect, test } from 'bun:test';

let disconnect: (() => Promise<void>) | undefined;

test('test database has migrated User table', async () => {
  if (process.env.NODE_ENV !== 'test' || !process.env.DATABASE_URL?.includes('buddyscript_test')) {
    throw new Error('Refusing to run against a non-test database');
  }
  const { prisma } = await import('../src/lib/prisma.js');
  disconnect = () => prisma.$disconnect();
  expect(await prisma.user.count()).toBe(0);
});

afterAll(async () => {
  await disconnect?.();
});

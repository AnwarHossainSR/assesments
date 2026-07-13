import { randomUUID } from 'node:crypto';

function assertTestDatabase(): void {
  if (process.env.NODE_ENV !== 'test' || !process.env.DATABASE_URL?.includes('buddyscript_test')) {
    throw new Error('Refusing to run against a non-test database');
  }
}

export async function resetDb(): Promise<void> {
  assertTestDatabase();
  const { prisma } = await import('../src/lib/prisma.js');
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "CommentLike", "PostLike", "Comment", "Post", "User" CASCADE',
  );
}

export async function createUser(email = randomUUID() + '@example.test') {
  assertTestDatabase();
  const { prisma } = await import('../src/lib/prisma.js');
  return prisma.user.create({
    data: { firstName: 'Test', lastName: 'User', email, passwordHash: 'unused' },
  });
}

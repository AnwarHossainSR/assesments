import type { User } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/errors.js';
import { hashPassword } from '../lib/auth/password.js';
import type { PublicUser } from '../types.js';

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id, firstName: user.firstName, lastName: user.lastName,
    email: user.email, avatarUrl: user.avatarUrl, createdAt: user.createdAt.toISOString(),
  };
}

export const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(200),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(input: RegisterInput): Promise<PublicUser> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new ApiError(409, 'Email already registered');
  const user = await prisma.user.create({
    data: { firstName: input.firstName, lastName: input.lastName, email: input.email, passwordHash: await hashPassword(input.password) },
  });
  return toPublicUser(user);
}

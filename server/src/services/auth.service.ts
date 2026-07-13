import { Prisma, type User } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/errors.js';
import { hashPassword, verifyPassword } from '../lib/auth/password.js';
import type { PublicUser, SelfUser } from '../types.js';

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id, firstName: user.firstName, lastName: user.lastName,
    avatarUrl: user.avatarUrl,
  };
}

export function toSelfUser(user: User): SelfUser {
  return { ...toPublicUser(user), email: user.email, createdAt: user.createdAt.toISOString() };
}

export const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(200),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(input: RegisterInput): Promise<SelfUser> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new ApiError(409, 'Email already registered');
  try {
    const user = await prisma.user.create({
      data: { firstName: input.firstName, lastName: input.lastName, email: input.email, passwordHash: await hashPassword(input.password) },
    });
    return toSelfUser(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
      throw new ApiError(409, 'Email already registered');
    throw error;
  }
}

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;

export async function loginUser(input: LoginInput): Promise<SelfUser> {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new ApiError(401, 'Invalid email or password');
  if (!(await verifyPassword(input.password, user.passwordHash))) throw new ApiError(401, 'Invalid email or password');
  return toSelfUser(user);
}

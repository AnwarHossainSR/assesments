import type { User } from '@prisma/client';
import type { PublicUser } from '../types.js';

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id, firstName: user.firstName, lastName: user.lastName,
    email: user.email, avatarUrl: user.avatarUrl, createdAt: user.createdAt.toISOString(),
  };
}

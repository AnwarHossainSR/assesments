import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/errors.js';
import { toPublicUser } from './auth.service.js';
import type { Page, PublicUser } from '../types.js';

export async function likePost(params: { postId: string; userId: string }): Promise<{ liked: true; likeCount: number }> {
  const post = await prisma.post.findUnique({ where: { id: params.postId }, select: { id: true } });
  if (!post) throw new ApiError(404, 'Post not found');
  const likeCount = await prisma.$transaction(async (tx) => {
    try { await tx.postLike.create({ data: { postId: params.postId, userId: params.userId } }); }
    catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002')
        return (await tx.post.findUniqueOrThrow({ where: { id: params.postId }, select: { likeCount: true } })).likeCount;
      throw e;
    }
    return (await tx.post.update({ where: { id: params.postId }, data: { likeCount: { increment: 1 } }, select: { likeCount: true } })).likeCount;
  });
  return { liked: true, likeCount };
}

export async function unlikePost(params: { postId: string; userId: string }): Promise<{ liked: false; likeCount: number }> {
  const likeCount = await prisma.$transaction(async (tx) => {
    const deleted = await tx.postLike.deleteMany({ where: { postId: params.postId, userId: params.userId } });
    if (deleted.count === 0) return (await tx.post.findUnique({ where: { id: params.postId }, select: { likeCount: true } }))?.likeCount ?? 0;
    return (await tx.post.update({ where: { id: params.postId }, data: { likeCount: { decrement: 1 } }, select: { likeCount: true } })).likeCount;
  });
  return { liked: false, likeCount };
}

export async function listPostLikers(params: { postId: string; cursor?: string; limit?: number }): Promise<Page<PublicUser>> {
  const take = Math.min(params.limit && params.limit > 0 ? params.limit : 20, 50);
  const likes = await prisma.postLike.findMany({
    where: { postId: params.postId }, include: { user: true },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: take + 1, ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}),
  });
  const hasMore = likes.length > take;
  const page = hasMore ? likes.slice(0, take) : likes;
  return { items: page.map((l) => toPublicUser(l.user)), nextCursor: hasMore ? page[page.length - 1].id : null };
}

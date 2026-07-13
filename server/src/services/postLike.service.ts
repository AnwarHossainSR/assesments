import { prisma } from '../lib/prisma.js';
import { toPublicUser } from './auth.service.js';
import { requireVisiblePost } from './visibility.js';
import type { Page, PublicUser } from '../types.js';

export async function likePost(params: { postId: string; userId: string }): Promise<{ liked: true; likeCount: number }> {
  await requireVisiblePost(params.postId, params.userId);
  const likeCount = await prisma.$transaction(async (tx) => {
    const inserted = await tx.postLike.createMany({
      data: [{ postId: params.postId, userId: params.userId }],
      skipDuplicates: true,
    });
    if (inserted.count === 0)
      return (await tx.post.findUniqueOrThrow({ where: { id: params.postId }, select: { likeCount: true } })).likeCount;
    return (await tx.post.update({ where: { id: params.postId }, data: { likeCount: { increment: 1 } }, select: { likeCount: true } })).likeCount;
  });
  return { liked: true, likeCount };
}

export async function unlikePost(params: { postId: string; userId: string }): Promise<{ liked: false; likeCount: number }> {
  await requireVisiblePost(params.postId, params.userId);
  const likeCount = await prisma.$transaction(async (tx) => {
    const deleted = await tx.postLike.deleteMany({ where: { postId: params.postId, userId: params.userId } });
    if (deleted.count === 0) return (await tx.post.findUnique({ where: { id: params.postId }, select: { likeCount: true } }))?.likeCount ?? 0;
    return (await tx.post.update({ where: { id: params.postId }, data: { likeCount: { decrement: 1 } }, select: { likeCount: true } })).likeCount;
  });
  return { liked: false, likeCount };
}

export async function listPostLikers(params: { postId: string; userId: string; cursor?: string; limit?: number }): Promise<Page<PublicUser>> {
  await requireVisiblePost(params.postId, params.userId);
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

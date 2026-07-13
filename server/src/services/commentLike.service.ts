import { prisma } from '../lib/prisma.js';
import { toPublicUser } from './auth.service.js';
import { requireVisibleComment } from './visibility.js';
import type { Page, PublicUser } from '../types.js';

export async function likeComment(params: { commentId: string; userId: string }): Promise<{ liked: true; likeCount: number }> {
  await requireVisibleComment(params.commentId, params.userId);
  const likeCount = await prisma.$transaction(async (tx) => {
    const inserted = await tx.commentLike.createMany({
      data: [{ commentId: params.commentId, userId: params.userId }],
      skipDuplicates: true,
    });
    if (inserted.count === 0)
      return (await tx.comment.findUniqueOrThrow({ where: { id: params.commentId }, select: { likeCount: true } })).likeCount;
    return (await tx.comment.update({ where: { id: params.commentId }, data: { likeCount: { increment: 1 } }, select: { likeCount: true } })).likeCount;
  });
  return { liked: true, likeCount };
}

export async function unlikeComment(params: { commentId: string; userId: string }): Promise<{ liked: false; likeCount: number }> {
  await requireVisibleComment(params.commentId, params.userId);
  const likeCount = await prisma.$transaction(async (tx) => {
    const deleted = await tx.commentLike.deleteMany({ where: { commentId: params.commentId, userId: params.userId } });
    if (deleted.count === 0) return (await tx.comment.findUnique({ where: { id: params.commentId }, select: { likeCount: true } }))?.likeCount ?? 0;
    return (await tx.comment.update({ where: { id: params.commentId }, data: { likeCount: { decrement: 1 } }, select: { likeCount: true } })).likeCount;
  });
  return { liked: false, likeCount };
}

export async function listCommentLikers(params: { commentId: string; userId: string; cursor?: string; limit?: number }): Promise<Page<PublicUser>> {
  await requireVisibleComment(params.commentId, params.userId);
  const take = Math.min(params.limit && params.limit > 0 ? params.limit : 20, 50);
  const likes = await prisma.commentLike.findMany({
    where: { commentId: params.commentId }, include: { user: true },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: take + 1, ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}),
  });
  const hasMore = likes.length > take;
  const p = hasMore ? likes.slice(0, take) : likes;
  return { items: p.map((l) => toPublicUser(l.user)), nextCursor: hasMore ? p[p.length - 1].id : null };
}

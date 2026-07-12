import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/errors.js';

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

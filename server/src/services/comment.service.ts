import { Prisma } from '@prisma/client';
import type { Comment, User } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/errors.js';
import { toPublicUser } from './auth.service.js';
import type { CommentDTO, Page } from '../types.js';

export function toCommentDTO(c: Comment & { author: User }, likedByMe: boolean): CommentDTO {
  return {
    id: c.id, postId: c.postId, parentId: c.parentId, author: toPublicUser(c.author),
    text: c.text, likeCount: c.likeCount, replyCount: c.replyCount, likedByMe, createdAt: c.createdAt.toISOString(),
  };
}

export async function createComment(input: { postId: string; authorId: string; text: string; parentId?: string | null }): Promise<CommentDTO> {
  const text = input.text.trim();
  if (!text) throw new ApiError(400, 'Comment cannot be empty');
  const post = await prisma.post.findUnique({ where: { id: input.postId }, select: { id: true } });
  if (!post) throw new ApiError(404, 'Post not found');

  if (input.parentId) {
    const parent = await prisma.comment.findUnique({ where: { id: input.parentId }, select: { id: true, postId: true, parentId: true } });
    if (!parent || parent.postId !== input.postId) throw new ApiError(400, 'Invalid parent comment');
    if (parent.parentId) throw new ApiError(400, 'Replies cannot be nested further');
  }

  const created = await prisma.$transaction(async (tx) => {
    const comment = await tx.comment.create({ data: { postId: input.postId, authorId: input.authorId, text, parentId: input.parentId ?? null }, include: { author: true } });
    if (input.parentId) await tx.comment.update({ where: { id: input.parentId }, data: { replyCount: { increment: 1 } } });
    else await tx.post.update({ where: { id: input.postId }, data: { commentCount: { increment: 1 } } });
    return comment;
  });
  return toCommentDTO(created, false);
}

const clampLimit = (n?: number) => (!n || n < 1 ? 10 : Math.min(n, 50));

async function likedSet(userId: string, ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  const likes = await prisma.commentLike.findMany({ where: { userId, commentId: { in: ids } }, select: { commentId: true } });
  return new Set(likes.map((l) => l.commentId));
}

async function page(where: Prisma.CommentWhereInput, userId: string, cursor?: string, limit?: number): Promise<Page<CommentDTO>> {
  const take = clampLimit(limit);
  const rows = await prisma.comment.findMany({
    where, include: { author: true },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: take + 1, ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });
  const hasMore = rows.length > take;
  const slice = hasMore ? rows.slice(0, take) : rows;
  const liked = await likedSet(userId, slice.map((c) => c.id));
  return { items: slice.map((c) => toCommentDTO(c, liked.has(c.id))), nextCursor: hasMore ? slice[slice.length - 1].id : null };
}

export const listComments = (p: { postId: string; userId: string; cursor?: string; limit?: number }) =>
  page({ postId: p.postId, parentId: null }, p.userId, p.cursor, p.limit);
export const listReplies = (p: { commentId: string; userId: string; cursor?: string; limit?: number }) =>
  page({ parentId: p.commentId }, p.userId, p.cursor, p.limit);

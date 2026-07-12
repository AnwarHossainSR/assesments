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

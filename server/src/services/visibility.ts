import type { Prisma } from '@prisma/client';
import { ApiError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';

export const visiblePostWhere = (userId: string): Prisma.PostWhereInput => ({
  OR: [{ visibility: 'PUBLIC' }, { authorId: userId }],
});

export const visiblePostByIdWhere = (postId: string, userId: string): Prisma.PostWhereInput => ({
  id: postId,
  ...visiblePostWhere(userId),
});

export async function requireVisiblePost(postId: string, userId: string) {
  const post = await prisma.post.findFirst({
    where: visiblePostByIdWhere(postId, userId),
    select: { id: true, authorId: true },
  });
  if (!post) throw new ApiError(404, 'Post not found');
  return post;
}

export async function requireVisibleComment(commentId: string, userId: string) {
  const comment = await prisma.comment.findFirst({
    where: { id: commentId, post: { is: visiblePostWhere(userId) } },
    select: { id: true, postId: true, parentId: true, authorId: true },
  });
  if (!comment) throw new ApiError(404, 'Comment not found');
  return comment;
}

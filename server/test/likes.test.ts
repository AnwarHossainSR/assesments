import { afterAll, beforeEach, expect, test } from 'bun:test';
import { prisma } from '../src/lib/prisma.js';
import { createComment } from '../src/services/comment.service.js';
import { likeComment, unlikeComment } from '../src/services/commentLike.service.js';
import { createPost } from '../src/services/post.service.js';
import { likePost, unlikePost } from '../src/services/postLike.service.js';
import { createUser, resetDb } from './helpers.js';

beforeEach(resetDb);
afterAll(() => prisma.$disconnect());

test('parallel duplicate post likes change count once', async () => {
  const user = await createUser();
  const post = await createPost({ authorId: user.id, text: 'x', visibility: 'PUBLIC' });

  await Promise.all([
    likePost({ postId: post.id, userId: user.id }),
    likePost({ postId: post.id, userId: user.id }),
  ]);

  expect(await prisma.postLike.count({ where: { postId: post.id } })).toBe(1);
  expect((await prisma.post.findUniqueOrThrow({ where: { id: post.id } })).likeCount).toBe(1);

  await Promise.all([
    unlikePost({ postId: post.id, userId: user.id }),
    unlikePost({ postId: post.id, userId: user.id }),
  ]);

  expect((await prisma.post.findUniqueOrThrow({ where: { id: post.id } })).likeCount).toBe(0);
});

test('parallel duplicate comment likes change count once', async () => {
  const user = await createUser();
  const post = await createPost({ authorId: user.id, text: 'x', visibility: 'PUBLIC' });
  const comment = await createComment({ postId: post.id, authorId: user.id, text: 'x' });

  await Promise.all([
    likeComment({ commentId: comment.id, userId: user.id }),
    likeComment({ commentId: comment.id, userId: user.id }),
  ]);

  expect(await prisma.commentLike.count({ where: { commentId: comment.id } })).toBe(1);
  expect((await prisma.comment.findUniqueOrThrow({ where: { id: comment.id } })).likeCount).toBe(1);

  await Promise.all([
    unlikeComment({ commentId: comment.id, userId: user.id }),
    unlikeComment({ commentId: comment.id, userId: user.id }),
  ]);

  expect((await prisma.comment.findUniqueOrThrow({ where: { id: comment.id } })).likeCount).toBe(0);
});

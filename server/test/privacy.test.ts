import { afterAll, beforeEach, expect, test } from 'bun:test';
import { prisma } from '../src/lib/prisma.js';
import { createComment, deleteComment, listComments, listReplies } from '../src/services/comment.service.js';
import { likeComment, listCommentLikers, unlikeComment } from '../src/services/commentLike.service.js';
import { createPost, deletePost, getFeed } from '../src/services/post.service.js';
import { likePost, listPostLikers, unlikePost } from '../src/services/postLike.service.js';
import { createUser, resetDb } from './helpers.js';

beforeEach(resetDb);
afterAll(() => prisma.$disconnect());

async function expectNotFound(action: () => Promise<unknown>): Promise<void> {
  try {
    await action();
    throw new Error('Expected resource to be hidden');
  } catch (error) {
    expect(error).toMatchObject({ status: 404 });
  }
}

test('another user cannot access any private-post resource', async () => {
  const owner = await createUser('owner@example.test');
  const viewer = await createUser('viewer@example.test');
  const post = await createPost({ authorId: owner.id, text: 'secret', visibility: 'PRIVATE' });
  const comment = await createComment({ postId: post.id, authorId: owner.id, text: 'secret' });
  await likePost({ postId: post.id, userId: owner.id });
  await likeComment({ commentId: comment.id, userId: owner.id });

  expect((await getFeed({ userId: viewer.id })).items).toHaveLength(0);

  const denied = [
    () => deletePost({ postId: post.id, userId: viewer.id }),
    () => likePost({ postId: post.id, userId: viewer.id }),
    () => unlikePost({ postId: post.id, userId: viewer.id }),
    () => listPostLikers({ postId: post.id, userId: viewer.id }),
    () => createComment({ postId: post.id, authorId: viewer.id, text: 'no' }),
    () => listComments({ postId: post.id, userId: viewer.id }),
    () => listReplies({ commentId: comment.id, userId: viewer.id }),
    () => deleteComment({ commentId: comment.id, userId: viewer.id }),
    () => likeComment({ commentId: comment.id, userId: viewer.id }),
    () => unlikeComment({ commentId: comment.id, userId: viewer.id }),
    () => listCommentLikers({ commentId: comment.id, userId: viewer.id }),
  ];

  for (const action of denied) {
    await expectNotFound(action);
  }
});

test('another user can interact with public posts', async () => {
  const owner = await createUser('owner@example.test');
  const viewer = await createUser('viewer@example.test');
  const post = await createPost({ authorId: owner.id, text: 'public', visibility: 'PUBLIC' });

  expect(await likePost({ postId: post.id, userId: viewer.id })).toHaveProperty('liked', true);
  expect(await createComment({ postId: post.id, authorId: viewer.id, text: 'yes' })).toHaveProperty('id');
});

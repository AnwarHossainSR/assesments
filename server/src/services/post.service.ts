import type { Post, User, Visibility } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/errors.js';
import { toPublicUser } from './auth.service.js';
import type { Page, PostDTO } from '../types.js';

export function toPostDTO(post: Post & { author: User }, likedByMe: boolean): PostDTO {
  return {
    id: post.id, author: toPublicUser(post.author), text: post.text, imageUrl: post.imageUrl,
    visibility: post.visibility as PostDTO['visibility'], likeCount: post.likeCount,
    commentCount: post.commentCount, likedByMe, createdAt: post.createdAt.toISOString(),
  };
}

export async function createPost(input: { authorId: string; text?: string | null; imageUrl?: string | null; visibility: Visibility }): Promise<PostDTO> {
  const text = input.text?.trim() || null;
  const imageUrl = input.imageUrl || null;
  if (!text && !imageUrl) throw new ApiError(400, 'A post needs text or an image');
  const post = await prisma.post.create({ data: { authorId: input.authorId, text, imageUrl, visibility: input.visibility }, include: { author: true } });
  return toPostDTO(post, false);
}

const DEFAULT_LIMIT = 10, MAX_LIMIT = 50;
const clampLimit = (n?: number) => (!n || n < 1 ? DEFAULT_LIMIT : Math.min(n, MAX_LIMIT));

export async function getFeed(params: { userId: string; cursor?: string; limit?: number }): Promise<Page<PostDTO>> {
  const take = clampLimit(params.limit);
  const posts = await prisma.post.findMany({
    where: { OR: [{ visibility: 'PUBLIC' }, { authorId: params.userId }] },
    include: { author: true },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: take + 1,
    ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}),
  });
  const hasMore = posts.length > take;
  const page = hasMore ? posts.slice(0, take) : posts;
  const likedIds = page.length
    ? new Set((await prisma.postLike.findMany({ where: { userId: params.userId, postId: { in: page.map((p) => p.id) } }, select: { postId: true } })).map((l) => l.postId))
    : new Set<string>();
  return { items: page.map((p) => toPostDTO(p, likedIds.has(p.id))), nextCursor: hasMore ? page[page.length - 1].id : null };
}

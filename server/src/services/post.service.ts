import type { Post, User, Visibility } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { ApiError } from '../lib/errors.js';
import { toPublicUser } from './auth.service.js';
import type { PostDTO } from '../types.js';

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

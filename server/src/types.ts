export type PublicUser = { id: string; firstName: string; lastName: string; email: string; avatarUrl: string | null; createdAt: string };
export type Visibility = 'PUBLIC' | 'PRIVATE';
export type PostDTO = { id: string; author: PublicUser; text: string | null; imageUrl: string | null; visibility: Visibility; likeCount: number; commentCount: number; likedByMe: boolean; createdAt: string };
export type CommentDTO = { id: string; postId: string; parentId: string | null; author: PublicUser; text: string; likeCount: number; replyCount: number; likedByMe: boolean; createdAt: string };
export type Page<T> = { items: T[]; nextCursor: string | null };

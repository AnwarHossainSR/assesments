import { apiFetch, type Page, type PublicUser } from '../lib/api';

export type LikeKind = 'post' | 'comment';
const base = (kind: LikeKind, id: string) => (kind === 'post' ? `/posts/${id}` : `/comments/${id}`);

export const likesApi = {
  like: (kind: LikeKind, id: string) => apiFetch<{ liked: true; likeCount: number }>(`${base(kind, id)}/like`, { method: 'POST' }),
  unlike: (kind: LikeKind, id: string) => apiFetch<{ liked: false; likeCount: number }>(`${base(kind, id)}/like`, { method: 'DELETE' }),
  likers: (kind: LikeKind, id: string, cursor?: string) => apiFetch<Page<PublicUser>>(`${base(kind, id)}/likes${cursor ? `?cursor=${cursor}` : ''}`),
};

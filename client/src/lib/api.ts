export type PublicUser = { id: string; firstName: string; lastName: string; avatarUrl: string | null };
export type SelfUser = PublicUser & { email: string; createdAt: string };
export type Visibility = 'PUBLIC' | 'PRIVATE';
export type PostDTO = { id: string; author: PublicUser; text: string | null; imageUrl: string | null; visibility: Visibility; likeCount: number; commentCount: number; likedByMe: boolean; createdAt: string };
export type CommentDTO = { id: string; postId: string; parentId: string | null; author: PublicUser; text: string; likeCount: number; replyCount: number; likedByMe: boolean; createdAt: string };
export type Page<T> = { items: T[]; nextCursor: string | null };

const API_BASE = import.meta.env.VITE_API_URL ?? '';
export const AUTH_UNAUTHORIZED_EVENT = 'auth:unauthorized';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function errorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : 'Something went wrong. Please try again.';
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, {
    credentials: 'include',
    headers: options.body instanceof FormData ? options.headers : { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;
  if (res.status === 401) window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
  if (!res.ok) throw new ApiError(res.status, data?.error ?? res.statusText);
  return data as T;
}

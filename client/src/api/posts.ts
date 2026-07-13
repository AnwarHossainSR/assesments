import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch, type Page, type PostDTO } from '../lib/api';

export const postsApi = {
  feed: (cursor?: string) => apiFetch<Page<PostDTO>>(`/posts${cursor ? `?cursor=${cursor}` : ''}`),
  create: (data: FormData) => apiFetch<{ post: PostDTO }>('/posts', { method: 'POST', body: data }),
  remove: (id: string) => apiFetch<void>(`/posts/${id}`, { method: 'DELETE' }),
};

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => postsApi.feed(pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: FormData) => postsApi.create(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['feed'] }) });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => postsApi.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['feed'] }) });
}

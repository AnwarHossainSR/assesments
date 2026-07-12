import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch, type CommentDTO, type Page } from '../lib/api';

export const commentsApi = {
  list: (postId: string, cursor?: string) => apiFetch<Page<CommentDTO>>(`/posts/${postId}/comments${cursor ? `?cursor=${cursor}` : ''}`),
  create: (postId: string, body: { text: string; parentId?: string }) => apiFetch<{ comment: CommentDTO }>(`/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(body) }),
  replies: (commentId: string, cursor?: string) => apiFetch<Page<CommentDTO>>(`/comments/${commentId}/replies${cursor ? `?cursor=${cursor}` : ''}`),
  remove: (id: string) => apiFetch<void>(`/comments/${id}`, { method: 'DELETE' }),
};

export function useComments(postId: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: ({ pageParam }) => commentsApi.list(postId, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled,
  });
}

export function useReplies(commentId: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ['replies', commentId],
    queryFn: ({ pageParam }) => commentsApi.replies(commentId, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled,
  });
}

export function useCreateComment(postId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { text: string; parentId?: string }) => commentsApi.create(postId, body),
    onSuccess: (_data, body) => {
      qc.invalidateQueries({ queryKey: ['comments', postId] });
      qc.invalidateQueries({ queryKey: ['feed'] });
      if (body.parentId) qc.invalidateQueries({ queryKey: ['replies', body.parentId] });
    },
  });
}

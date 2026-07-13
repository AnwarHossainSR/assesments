import { useInfiniteQuery } from '@tanstack/react-query';
import { likesApi, type LikeKind } from '../api/likes';
import Avatar from './Avatar';
import Modal from './Modal';
import Spinner from './Spinner';

export default function LikersModal({ kind, targetId, open, onClose }: { kind: LikeKind; targetId: string; open: boolean; onClose: () => void }) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['likers', kind, targetId],
    queryFn: ({ pageParam }) => likesApi.likers(kind, targetId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled: open,
  });
  const likers = data?.pages.flatMap((page) => page.items) ?? [];
  return (
    <Modal open={open} onClose={onClose} title="Liked by">
      {isLoading ? <Spinner /> : (
        <ul className="_likers_list">
          {likers.map((u) => (
            <li key={u.id} className="d-flex align-items-center gap-2 _mar_b8"><Avatar user={u} className="_comment_img" /><span>{u.firstName} {u.lastName}</span></li>
          ))}
          {isError && <li role="alert">Could not load likes.</li>}
          {!isError && likers.length === 0 && <li>No likes yet.</li>}
          {hasNextPage && (
            <li><button type="button" className="_previous_comment_txt" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading...' : 'Load more'}</button></li>
          )}
        </ul>
      )}
    </Modal>
  );
}

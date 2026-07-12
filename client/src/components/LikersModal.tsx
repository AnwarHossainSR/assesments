import { useQuery } from '@tanstack/react-query';
import { likesApi, type LikeKind } from '../api/likes';
import Avatar from './Avatar';
import Modal from './Modal';
import Spinner from './Spinner';

export default function LikersModal({ kind, targetId, open, onClose }: { kind: LikeKind; targetId: string; open: boolean; onClose: () => void }) {
  const { data, isLoading } = useQuery({ queryKey: ['likers', kind, targetId], queryFn: () => likesApi.likers(kind, targetId), enabled: open });
  return (
    <Modal open={open} onClose={onClose} title="Liked by">
      {isLoading ? <Spinner /> : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {(data?.items ?? []).map((u) => (
            <li key={u.id} className="d-flex align-items-center gap-2 _mar_b8"><Avatar user={u} className="_comment_img" /><span>{u.firstName} {u.lastName}</span></li>
          ))}
          {data && data.items.length === 0 && <li>No likes yet.</li>}
        </ul>
      )}
    </Modal>
  );
}

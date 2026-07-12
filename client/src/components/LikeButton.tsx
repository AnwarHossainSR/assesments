import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { likesApi, type LikeKind } from '../api/likes';
import LikersModal from './LikersModal';

export default function LikeButton({ targetId, kind, likedByMe, likeCount }: { targetId: string; kind: LikeKind; likedByMe: boolean; likeCount: number }) {
  const qc = useQueryClient();
  const [liked, setLiked] = useState(likedByMe);
  const [count, setCount] = useState(likeCount);
  const [showLikers, setShowLikers] = useState(false);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const next = !liked;
    setLiked(next); setCount((c) => c + (next ? 1 : -1)); // optimistic
    try {
      const res = next ? await likesApi.like(kind, targetId) : await likesApi.unlike(kind, targetId);
      setLiked(res.liked); setCount(res.likeCount);
      if (kind === 'post') qc.invalidateQueries({ queryKey: ['feed'] });
    } catch { setLiked(liked); setCount(likeCount); }
    finally { setBusy(false); }
  }

  return (
    <>
      <button className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${liked ? '_feed_reaction_active' : ''}`} onClick={toggle} aria-pressed={liked}>
        <span className="_feed_inner_timeline_reaction_link">{liked ? 'Liked' : 'Like'}</span>
      </button>
      <button className="_feed_inner_timeline_reaction_comment _feed_reaction" onClick={() => setShowLikers(true)}>
        {count} Like{count === 1 ? '' : 's'}
      </button>
      <LikersModal kind={kind} targetId={targetId} open={showLikers} onClose={() => setShowLikers(false)} />
    </>
  );
}

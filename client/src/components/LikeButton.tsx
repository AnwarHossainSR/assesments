import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { likesApi, type LikeKind } from '../api/likes';
import { errorMessage } from '../lib/api';
import LikersModal from './LikersModal';

function LikeIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 10v11H3V10h4Zm0 9h9.5a2 2 0 0 0 2-1.6l1.3-7A2 2 0 0 0 17.8 8H14l.6-3a2.5 2.5 0 0 0-4.6-1.7L7 10" /></svg>;
}

export default function LikeButton({ targetId, kind, likedByMe, likeCount }: { targetId: string; kind: LikeKind; likedByMe: boolean; likeCount: number }) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(likedByMe);
  const [count, setCount] = useState(likeCount);
  const [showLikers, setShowLikers] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setLiked(likedByMe); setCount(likeCount); }, [likedByMe, likeCount]);

  async function toggle() {
    if (busy) return;
    const previousLiked = liked;
    const previousCount = count;
    const next = !liked;
    setError(null);
    setBusy(true);
    setLiked(next);
    setCount((current) => current + (next ? 1 : -1));
    try {
      const result = next ? await likesApi.like(kind, targetId) : await likesApi.unlike(kind, targetId);
      setLiked(result.liked);
      setCount(result.likeCount);
      queryClient.invalidateQueries({ queryKey: ['likers', kind, targetId] });
      if (kind === 'post') queryClient.invalidateQueries({ queryKey: ['feed'] });
    } catch (caught) {
      setLiked(previousLiked);
      setCount(previousCount);
      setError(errorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className={kind === 'post' ? '_feed_like_control' : '_comment_like_control'}>
        <button type="button" className={kind === 'post' ? `_feed_inner_timeline_reaction_emoji _feed_reaction${liked ? ' _feed_reaction_active' : ''}` : '_comment_reply_link'} onClick={toggle} aria-pressed={liked} disabled={busy}>{kind === 'post' && <LikeIcon />}<span>{liked ? 'Liked' : 'Like'}</span></button>
        {kind === 'comment' && <button type="button" className="_comment_like_count" onClick={() => setShowLikers(true)}>{count > 0 ? count : ''}<span className="visually-hidden"> {count === 1 ? 'like' : 'likes'}; show people</span></button>}
      </div>
      {error && <span role="alert" style={{ color: '#d00' }}>{error}</span>}
      {kind === 'comment' && <LikersModal kind={kind} targetId={targetId} open={showLikers} onClose={() => setShowLikers(false)} />}
    </>
  );
}

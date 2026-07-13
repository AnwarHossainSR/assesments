import { useState } from 'react';
import LikersModal from './LikersModal';

export default function PostLikeSummary({ postId, likeCount }: { postId: string; likeCount: number }) {
  const [open, setOpen] = useState(false);
  if (likeCount === 0) return null;

  return <>
    <button type="button" className="_feed_inner_timeline_total_reacts_image" onClick={() => setOpen(true)} aria-label={`Show ${likeCount} ${likeCount === 1 ? 'person' : 'people'} who liked this post`}>
      <p className="_feed_inner_timeline_total_reacts_para">{likeCount}</p>
    </button>
    <LikersModal kind="post" targetId={postId} open={open} onClose={() => setOpen(false)} />
  </>;
}

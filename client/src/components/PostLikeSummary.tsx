import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { likesApi } from '../api/likes';
import Avatar from './Avatar';
import LikersModal from './LikersModal';

export default function PostLikeSummary({ postId, likeCount }: { postId: string; likeCount: number }) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery({ queryKey: ['likers', 'post', postId], queryFn: () => likesApi.likers('post', postId), enabled: likeCount > 0 });
  const likers = data?.items ?? [];

  if (likeCount === 0 || (!isLoading && likers.length === 0)) return null;

  return <>
    <button type="button" className="_feed_inner_timeline_total_reacts_image" onClick={() => setOpen(true)} aria-label={`Show ${likeCount} ${likeCount === 1 ? 'person' : 'people'} who liked this post`}>
      {likers.slice(0, 5).map((user, index) => <Avatar key={user.id} user={user} className={index === 0 ? '_react_img1' : `_react_img${index > 1 ? ' _rect_img_mbl_none' : ''}`} />)}
      <p className="_feed_inner_timeline_total_reacts_para">{likeCount > 5 ? `${likeCount}+` : likeCount}</p>
    </button>
    <LikersModal kind="post" targetId={postId} open={open} onClose={() => setOpen(false)} />
  </>;
}

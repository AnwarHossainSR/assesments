import { useState } from 'react';
import { useComments } from '../../api/comments';
import CommentItem from './CommentItem';
import ReplyComposer from './ReplyComposer';

export default function CommentSection({ postId, commentCount }: { postId: string; commentCount: number }) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useComments(postId, open);
  const comments = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="_feed_inner_timeline_cooment_area _padd_r24 _padd_l24">
      <div className="_feed_inner_comment_box _mar_b16"><ReplyComposer postId={postId} placeholder="Write a comment" /></div>
      <button className="_previous_comment_txt" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide comments' : `${commentCount} Comment${commentCount === 1 ? '' : 's'}`}
      </button>
      {open && (
        <div className="_timline_comment_main _mar_t16">
          {isLoading ? <p>Loading…</p> : comments.map((c) => <CommentItem key={c.id} comment={c} />)}
          {hasNextPage && (
            <button className="_previous_comment_txt" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Loading…' : 'View previous comments'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

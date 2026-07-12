import { useState } from 'react';
import { type CommentDTO } from '../../lib/api';
import { useReplies } from '../../api/comments';
import Avatar from '../Avatar';
import TimeAgo from '../TimeAgo';
import LikeButton from '../LikeButton';
import ReplyComposer from './ReplyComposer';

export default function CommentItem({ comment }: { comment: CommentDTO }) {
  const isTopLevel = comment.parentId === null;
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const replies = useReplies(comment.id, showReplies && isTopLevel);
  const replyItems = replies.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="_comment_main d-flex gap-2 _mar_b16">
      <div className="_comment_image"><Avatar user={comment.author} className="_comment_img1" /></div>
      <div className="_comment_area" style={{ flex: 1 }}>
        <div className="_comment_details">
          <div className="_comment_name"><h4 className="_comment_name_title">{comment.author.firstName} {comment.author.lastName}</h4></div>
          <div className="_comment_status"><p className="_comment_status_text"><span>{comment.text}</span></p></div>
          <div className="_comment_reply">
            <ul className="_comment_reply_list d-flex gap-3" style={{ listStyle: 'none', padding: 0 }}>
              <li><LikeButton targetId={comment.id} kind="comment" likedByMe={comment.likedByMe} likeCount={comment.likeCount} /></li>
              {isTopLevel && <li><button className="_link_btn" onClick={() => setShowReply((v) => !v)}>Reply</button></li>}
              <li><span className="_time_link"><TimeAgo iso={comment.createdAt} /></span></li>
            </ul>
          </div>
        </div>
        {showReply && isTopLevel && (
          <div className="_feed_inner_comment_box _mar_t8">
            <ReplyComposer postId={comment.postId} parentId={comment.id} placeholder="Write a reply" onDone={() => { setShowReply(false); setShowReplies(true); }} />
          </div>
        )}
        {isTopLevel && comment.replyCount > 0 && (
          <button className="_previous_comment_txt" onClick={() => setShowReplies((v) => !v)}>
            {showReplies ? 'Hide replies' : `View ${comment.replyCount} repl${comment.replyCount === 1 ? 'y' : 'ies'}`}
          </button>
        )}
        {showReplies && replyItems.map((r) => <CommentItem key={r.id} comment={r} />)}
      </div>
    </div>
  );
}

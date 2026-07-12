import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDeletePost } from '../api/posts';
import { type PostDTO } from '../lib/api';
import Avatar from './Avatar';
import TimeAgo from './TimeAgo';
import LikeButton from './LikeButton';
import CommentSection from './comments/CommentSection';

function ReactionIcon({ kind }: { kind: 'comment' | 'share' }) {
  const path = kind === 'comment' ? 'M21 12a8 8 0 0 1-9 8 10 10 0 0 1-4-1l-5 2 2-5a9 9 0 1 1 16-4Z' : 'm13 5 7 7-7 7v-4C7 15 4 17 2 20c1-7 5-11 11-11V5Z';
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

export default function PostCard({ post }: { post: PostDTO }) {
  const { user } = useAuth();
  const remove = useDeletePost();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthor = user?.id === post.author.id;

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image"><Avatar user={post.author} className="_post_img" /></div>
            <div className="_feed_inner_timeline_post_box_txt"><h4 className="_feed_inner_timeline_post_box_title">{post.author.firstName} {post.author.lastName}</h4><p className="_feed_inner_timeline_post_box_para"><TimeAgo iso={post.createdAt} /> . <span>{post.visibility === 'PUBLIC' ? 'Public' : 'Private'}</span></p></div>
          </div>
          {isAuthor && <div className="_feed_inner_timeline_post_box_dropdown"><button type="button" className="_feed_timeline_post_dropdown_link" aria-label="Post options" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>•••</button>{menuOpen && <div className="_feed_timeline_post_dropdown"><button type="button" className="_feed_timeline_post_dropdown_item" disabled={remove.isPending} onClick={() => remove.mutate(post.id)}>Delete</button></div>}</div>}
        </div>
        {post.text && <h4 className="_feed_inner_timeline_post_title">{post.text}</h4>}
        {post.imageUrl && <div className="_feed_inner_timeline_image"><img src={post.imageUrl} alt="Post attachment" className="_time_img" /></div>}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image"><div className="_feed_inner_timeline_total_reacts_image_group"><img src="/assets/images/react_img1.png" alt="" className="_reaction_img" /><img src="/assets/images/react_img2.png" alt="" className="_reaction_img" /><img src="/assets/images/react_img3.png" alt="" className="_reaction_img" /></div><p className="_feed_inner_timeline_total_reacts_para">{post.likeCount} Likes</p></div>
        <div className="_feed_inner_timeline_total_reacts_txt"><p className="_feed_inner_timeline_total_reacts_para1"><span>{post.commentCount}</span> Comment{post.commentCount === 1 ? '' : 's'}</p></div>
      </div>

      <div className="_feed_inner_timeline_reaction">
        <LikeButton targetId={post.id} kind="post" likedByMe={post.likedByMe} likeCount={post.likeCount} />
        <button type="button" className="_feed_inner_timeline_reaction_emoji"><ReactionIcon kind="comment" /><span>Comment</span></button>
        <button type="button" className="_feed_inner_timeline_reaction_emoji"><ReactionIcon kind="share" /><span>Share</span></button>
      </div>

      <CommentSection postId={post.id} commentCount={post.commentCount} />
    </div>
  );
}

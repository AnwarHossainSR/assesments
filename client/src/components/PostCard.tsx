import { useAuth } from '../context/AuthContext';
import { useDeletePost } from '../api/posts';
import { type PostDTO } from '../lib/api';
import Avatar from './Avatar';
import TimeAgo from './TimeAgo';
import LikeButton from './LikeButton';
import CommentSection from './comments/CommentSection';

export default function PostCard({ post }: { post: PostDTO }) {
  const { user } = useAuth();
  const del = useDeletePost();
  const isAuthor = user?.id === post.author.id;

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top d-flex justify-content-between">
          <div className="_feed_inner_timeline_post_box d-flex">
            <div className="_feed_inner_timeline_post_box_image"><Avatar user={post.author} className="_post_img" /></div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">{post.author.firstName} {post.author.lastName}</h4>
              <p className="_feed_inner_timeline_post_box_para"><TimeAgo iso={post.createdAt} /> · <span>{post.visibility === 'PUBLIC' ? 'Public' : 'Private'}</span></p>
            </div>
          </div>
          {isAuthor && <button className="_feed_timeline_post_dropdown_link" onClick={() => del.mutate(post.id)} aria-label="Delete post">Delete</button>}
        </div>
        {post.text && <h4 className="_feed_inner_timeline_post_title">{post.text}</h4>}
        {post.imageUrl && <div className="_feed_inner_timeline_image"><img src={post.imageUrl} alt="" className="_time_img" style={{ maxWidth: '100%' }} /></div>}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26 d-flex justify-content-between">
        <div className="_feed_inner_timeline_total_reacts_image"><p className="_feed_inner_timeline_total_reacts_para">{post.likeCount} Likes</p></div>
        <div className="_feed_inner_timeline_total_reacts_txt"><p className="_feed_inner_timeline_total_reacts_para1"><span>{post.commentCount}</span> Comment</p></div>
      </div>

      <div className="_feed_inner_timeline_reaction">
        <LikeButton targetId={post.id} kind="post" likedByMe={post.likedByMe} likeCount={post.likeCount} />
      </div>

      <CommentSection postId={post.id} commentCount={post.commentCount} />
    </div>
  );
}

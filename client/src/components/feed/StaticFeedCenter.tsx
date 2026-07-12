import FeedStories from './FeedStories';

function MediaIcon({ kind }: { kind: 'photo' | 'video' | 'event' | 'article' }) {
  const paths = {
    photo: 'M4 3h16v18H4V3Zm3 14 4-4 3 3 2-2 3 3M9 9h.01',
    video: 'M3 5h13v14H3V5Zm13 5 5-3v10l-5-3v-4Z',
    event: 'M4 6h16v15H4V6Zm0 5h16M8 3v6m8-6v6',
    article: 'M5 3h14v18H5V3Zm4 5h6M9 12h6m-6 4h4',
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

function ReactionIcon({ kind }: { kind: 'like' | 'comment' | 'share' }) {
  const path = kind === 'like' ? 'M7 10v11H3V10h4Zm0 9h9.5a2 2 0 0 0 2-1.6l1.3-7A2 2 0 0 0 17.8 8H14l.6-3a2.5 2.5 0 0 0-4.6-1.7L7 10' : kind === 'comment' ? 'M21 12a8 8 0 0 1-9 8 10 10 0 0 1-4-1l-5 2 2-5a9 9 0 1 1 16-4Z' : 'm13 5 7 7-7 7v-4C7 15 4 17 2 20c1-7 5-11 11-11V5Z';
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

export default function StaticFeedCenter() {
  return (
    <div className="_feed_inner_wrap">
      <FeedStories />
      <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
        <div className="_feed_inner_text_area_box"><div className="_feed_inner_text_area_box_image"><img src="/assets/images/txt_img.png" alt="Karim Saif" className="_txt_img" /></div><div className="form-floating _feed_inner_text_area_box_form"><textarea className="form-control _textarea" placeholder="Write something ..." readOnly /></div></div>
        <div className="_feed_inner_text_area_bottom">
          <div className="_feed_inner_text_area_item">
            {(['photo', 'video', 'event', 'article'] as const).map((kind) => <div className={`_feed_inner_text_area_bottom_${kind} _feed_common`} key={kind}><button type="button" className="_feed_inner_text_area_bottom_photo_link"><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img"><MediaIcon kind={kind} /></span>{kind[0].toUpperCase() + kind.slice(1)}</button></div>)}
          </div>
          <div className="_feed_inner_text_area_btn"><button type="button" className="_feed_inner_text_area_btn_link"><span>Post</span></button></div>
        </div>
      </div>

      <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
        <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
          <div className="_feed_inner_timeline_post_top">
            <div className="_feed_inner_timeline_post_box"><div className="_feed_inner_timeline_post_box_image"><img src="/assets/images/post_img.png" alt="Karim Saif" className="_post_img" /></div><div className="_feed_inner_timeline_post_box_txt"><h4 className="_feed_inner_timeline_post_box_title">Karim Saif</h4><p className="_feed_inner_timeline_post_box_para">5 minute ago . <span>Public</span></p></div></div>
            <div className="_feed_inner_timeline_post_box_dropdown"><button type="button" className="_feed_timeline_post_dropdown_link" aria-label="Post options">•••</button></div>
          </div>
          <h4 className="_feed_inner_timeline_post_title">-Healthy Tracking App</h4>
          <div className="_feed_inner_timeline_image"><img src="/assets/images/timeline_img.png" alt="Healthy tracking app" className="_time_img" /></div>
        </div>
        <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26"><div className="_feed_inner_timeline_total_reacts_image"><div className="_feed_inner_timeline_total_reacts_image_group"><img src="/assets/images/react_img1.png" alt="" className="_reaction_img" /><img src="/assets/images/react_img2.png" alt="" className="_reaction_img" /><img src="/assets/images/react_img3.png" alt="" className="_reaction_img" /></div><p className="_feed_inner_timeline_total_reacts_para">9 Likes</p></div><div className="_feed_inner_timeline_total_reacts_txt"><p className="_feed_inner_timeline_total_reacts_para1"><span>3</span> Comment</p></div></div>
        <div className="_feed_inner_timeline_reaction">
          {(['like', 'comment', 'share'] as const).map((kind) => <button type="button" className="_feed_inner_timeline_reaction_emoji" key={kind}><ReactionIcon kind={kind} /><span>{kind[0].toUpperCase() + kind.slice(1)}</span></button>)}
        </div>
        <div className="_feed_inner_timeline_cooment_area _padd_r24 _padd_l24">
          <div className="_feed_inner_comment_box"><div className="_feed_inner_comment_box_image"><img src="/assets/images/comment_img.png" alt="" className="_comment_img" /></div><form className="_feed_inner_comment_box_form"><div className="_feed_inner_comment_box_content"><div className="_feed_inner_comment_box_content_txt"><textarea className="form-control _comment_textarea" placeholder="Write a comment" readOnly /></div></div></form></div>
          <div className="_timline_comment_main _mar_t16"><div className="_comment_main"><div className="_comment_image"><img src="/assets/images/people2.png" alt="Ryan Roslansky" className="_comment_img1" /></div><div className="_comment_area"><div className="_comment_details"><div className="_comment_name"><h4 className="_comment_name_title">Ryan Roslansky</h4></div><div className="_comment_status"><p className="_comment_status_text"><span>Looking great! Keep it up.</span></p></div><div className="_comment_reply"><ul className="_comment_reply_list"><li><button type="button" className="_comment_reply_link">Like</button></li><li><button type="button" className="_comment_reply_link">Reply</button></li><li><span className="_time_link">5 min</span></li></ul></div></div></div></div></div>
        </div>
      </div>
    </div>
  );
}

const stories = ['card_ppl2.png', 'card_ppl3.png', 'card_ppl4.png'];

export default function FeedStories() {
  return (
    <>
      <div className="_feed_inner_story_area _mar_b16">
        <div className="_feed_inner_story_arrow"><button type="button" className="_feed_inner_story_arrow_btn" aria-label="Next stories">→</button></div>
        <div className="row g-3">
          <div className="col-3">
            <div className="_feed_inner_profile_story _b_radious6">
              <div className="_feed_inner_profile_story_image"><img src="/assets/images/card_ppl1.png" alt="Your story" className="_profile_story_img" /><div className="_feed_inner_story_txt"><div className="_feed_inner_story_btn"><button type="button" className="_feed_inner_story_btn_link" aria-label="Add story">+</button></div><p className="_feed_inner_story_para">Your Story</p></div></div>
            </div>
          </div>
          {stories.map((image) => (
            <div className="col-3" key={image}>
              <div className="_feed_inner_public_story _b_radious6"><div className="_feed_inner_public_story_image"><img src={`/assets/images/${image}`} alt="Ryan Roslansky story" className="_public_story_img" /><div className="_feed_inner_pulic_story_txt"><p className="_feed_inner_pulic_story_para">Ryan Roslansky</p></div></div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="_feed_inner_ppl_card_area _mar_b16">
        <div className="_feed_inner_ppl_card_area_main">
          {['mobile_story_img.png', 'mobile_story_img1.png', 'mobile_story_img2.png', 'mobile_story_img1.png', 'mobile_story_img2.png'].map((image, index) => (
            <div className={index === 0 ? '_feed_inner_ppl_card_area_story' : index % 2 ? '_feed_inner_ppl_card_area_story_active' : '_feed_inner_ppl_card_area_story_inactive'} key={`${image}-${index}`}><img src={`/assets/images/${image}`} alt="Story" className={index === 0 ? '_card_story_img' : '_card_story_img1'} /></div>
          ))}
        </div>
      </div>
    </>
  );
}

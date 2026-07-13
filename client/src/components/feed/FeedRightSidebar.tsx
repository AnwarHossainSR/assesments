const friends = [
  { name: 'Steve Jobs', role: 'CEO of Apple', image: 'people1.png', away: true },
  { name: 'Ryan Roslansky', role: 'CEO of Linkedin', image: 'people2.png', away: false },
  { name: 'Dylan Field', role: 'CEO of Figma', image: 'people3.png', away: false },
  { name: 'Steve Jobs', role: 'CEO of Apple', image: 'people1.png', away: true },
  { name: 'Ryan Roslansky', role: 'CEO of Linkedin', image: 'people2.png', away: false },
];

function OnlineDot() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" aria-label="Online"><rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" /></svg>;
}

export default function FeedRightSidebar() {
  return (
    <div className="_layout_right_sidebar_wrap">
      <div className="_layout_right_sidebar_inner">
        <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_right_inner_area_info_content _mar_b24"><h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4><span className="_right_inner_area_info_content_txt"><span className="_right_inner_area_info_content_txt_link" aria-disabled="true">See All</span></span></div>
          <hr className="_underline" />
          <div className="_right_inner_area_info_ppl">
            <div className="_right_inner_area_info_box">
              <div className="_right_inner_area_info_box_image"><span aria-disabled="true"><img src="/assets/images/Avatar.png" alt="Radovan SkillArena" className="_ppl_img" /></span></div>
              <div className="_right_inner_area_info_box_txt"><h4 className="_right_inner_area_info_box_title" aria-disabled="true">Radovan SkillArena</h4><p className="_right_inner_area_info_box_para">Founder &amp; CEO at Trophy</p></div>
            </div>
            <div className="_right_info_btn_grp"><button type="button" className="_right_info_btn_link" disabled aria-disabled="true" title="Not included in this assessment">Ignore</button><button type="button" className="_right_info_btn_link _right_info_btn_link_active" disabled aria-disabled="true" title="Not included in this assessment">Follow</button></div>
          </div>
        </div>
      </div>

      <div className="_layout_right_sidebar_inner">
        <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_feed_top_fixed">
            <div className="_feed_right_inner_area_card_content _mar_b24"><h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4><span className="_feed_right_inner_area_card_content_txt"><span className="_feed_right_inner_area_card_content_txt_link" aria-disabled="true">See All</span></span></div>
            <form className="_feed_right_inner_area_card_form" onSubmit={(event) => event.preventDefault()}>
              <svg className="_feed_right_inner_area_card_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17" aria-hidden="true"><circle cx="7" cy="7" r="6" stroke="#666" /><path stroke="#666" strokeLinecap="round" d="m16 16-3-3" /></svg>
              <input className="form-control me-2 _feed_right_inner_area_card_form_inpt" type="search" placeholder="Search unavailable" aria-label="Search friends" disabled />
            </form>
          </div>
          <div className="_feed_bottom_fixed">
            {friends.map((friend, index) => (
              <div className={`_feed_right_inner_area_card_ppl${friend.away ? ' _feed_right_inner_area_card_ppl_inactive' : ''}`} key={`${friend.name}-${index}`}>
                <div className="_feed_right_inner_area_card_ppl_box"><div className="_feed_right_inner_area_card_ppl_image"><span aria-disabled="true"><img src={`/assets/images/${friend.image}`} alt={friend.name} className="_box_ppl_img" /></span></div><div className="_feed_right_inner_area_card_ppl_txt"><h4 className="_feed_right_inner_area_card_ppl_title" aria-disabled="true">{friend.name}</h4><p className="_feed_right_inner_area_card_ppl_para">{friend.role}</p></div></div>
                <div className="_feed_right_inner_area_card_ppl_side">{friend.away ? <span>5 minute ago</span> : <OnlineDot />}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

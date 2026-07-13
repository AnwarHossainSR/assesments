const explore = [
  ['Learning', true], ['Insights', false], ['Find friends', false], ['Bookmarks', false],
  ['Group', false], ['Gaming', true], ['Settings', false], ['Save post', false],
] as const;

const suggested = [
  { name: 'Steve Jobs', role: 'CEO of Apple', image: 'people1.png', imageClass: '_info_img' },
  { name: 'Ryan Roslansky', role: 'CEO of Linkedin', image: 'people2.png', imageClass: '_info_img1' },
  { name: 'Dylan Field', role: 'CEO of Figma', image: 'people3.png', imageClass: '_info_img1' },
];

function ExploreIcon({ index }: { index: number }) {
  if (index === 4) return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.7" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (index === 7) return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.7" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>;
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d={index === 0 ? 'm10 8 6 4-6 4V8Z' : index === 1 ? 'M8 16v-4m4 4V7m4 9v-6' : index === 2 ? 'M8 17c0-2 1.8-3 4-3s4 1 4 3M12 11a3 3 0 1 0 0-6m6 3v6m-3-3h6' : index === 3 ? 'M8 5h8v14l-4-3-4 3V5Z' : index === 5 ? 'M8 10h8a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Zm1 3v3m-1.5-1.5h3m5.5 0h.01' : 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm7 3 2-1-2-3-2 .5-1.5-1L15 5h-6l-.5 2.5-1.5 1L5 8l-2 3 2 1v2l-2 1 2 3 2-.5 1.5 1L9 21h6l.5-2.5 1.5-1 2 .5 2-3-2-1v-2Z'} /></svg>;
}

export default function FeedLeftSidebar() {
  return (
    <div className="_layout_left_sidebar_wrap">
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <h4 className="_left_inner_area_explore_title _title5 _mar_b24">Explore</h4>
          <ul className="_left_inner_area_explore_list">
            {explore.map(([label, isNew], index) => (
              <li className={`_left_inner_area_explore_item${isNew ? ' _explore_item' : ''}`} key={label}>
                <a href={`#${label.toLowerCase().replace(' ', '-')}`} className="_left_inner_area_explore_link"><ExploreIcon index={index} />{label}</a>
                {isNew && <span className="_left_inner_area_explore_link_txt">New</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_area_suggest_content _mar_b24">
            <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
            <span className="_left_inner_area_suggest_content_txt"><a className="_left_inner_area_suggest_content_txt_link" href="#suggested">See All</a></span>
          </div>
          {suggested.map((person) => (
            <div className="_left_inner_area_suggest_info" key={person.name}>
              <div className="_left_inner_area_suggest_info_box">
                <div className="_left_inner_area_suggest_info_image"><a href="#profile"><img src={`/assets/images/${person.image}`} alt={person.name} className={person.imageClass} /></a></div>
                <div className="_left_inner_area_suggest_info_txt"><a href="#profile"><h4 className="_left_inner_area_suggest_info_title">{person.name}</h4></a><p className="_left_inner_area_suggest_info_para">{person.role}</p></div>
              </div>
              <div className="_left_inner_area_suggest_info_link"><button type="button" className="_info_link">Connect</button></div>
            </div>
          ))}
        </div>
      </div>

      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_event_content"><h4 className="_left_inner_event_title _title5">Events</h4><a href="#events" className="_left_inner_event_link">See all</a></div>
          <div className="_left_inner_event_card">
            <div className="_left_inner_event_card_iamge"><img src="/assets/images/feed_event1.png" alt="Event" className="_card_img" /></div>
            <div className="_left_inner_event_card_content"><div className="_left_inner_card_date"><p className="_left_inner_card_date_para">10</p><p className="_left_inner_card_date_para1">Jul</p></div><div className="_left_inner_card_txt"><h4 className="_left_inner_event_card_title">No more terrorism no more cry</h4></div></div>
            <hr className="_underline" />
            <div className="_left_inner_event_bottom"><p className="_left_iner_event_bottom">17 People Going</p><button type="button" className="_left_iner_event_bottom_link">Going</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

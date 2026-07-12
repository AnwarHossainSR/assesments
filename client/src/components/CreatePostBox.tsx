export default function CreatePostBox() {
  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <form>
        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image"><img src="/assets/images/txt_img.png" alt="" className="_txt_img" /></div>
          <div className="_feed_inner_text_area_box_form">
            <textarea className="form-control _textarea" placeholder="Write something ..." />
          </div>
        </div>
        <div className="_feed_inner_text_area_bottom">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link">Photo</button>
            </div>
            <div className="_feed_inner_text_area_bottom_event _feed_common">
              <label className="_mar_r8" htmlFor="visibility">Visibility</label>
              <select id="visibility"><option value="PUBLIC">Public</option><option value="PRIVATE">Private</option></select>
            </div>
          </div>
          <div className="_feed_inner_text_area_btn">
            <button type="submit" className="_feed_inner_text_area_btn_link"><span>Post</span></button>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useCreatePost } from '../api/posts';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';

export default function CreatePostBox() {
  const { user } = useAuth();
  const create = useCreatePost();
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function onPick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() && !image) return;
    const fd = new FormData();
    if (text.trim()) fd.append('text', text.trim());
    fd.append('visibility', visibility);
    if (image) fd.append('image', image);
    await create.mutateAsync(fd);
    setText(''); setImage(null); setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <form onSubmit={onSubmit}>
        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image">{user && <Avatar user={user} className="_txt_img" />}</div>
          <div className="_feed_inner_text_area_box_form">
            <textarea className="form-control _textarea" placeholder="Write something ..." value={text} onChange={(e) => setText(e.target.value)} />
          </div>
        </div>
        {preview && <div className="_mar_t16"><img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: 8 }} /></div>}
        <div className="_feed_inner_text_area_bottom">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link" onClick={() => fileRef.current?.click()}>Photo</button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} aria-label="Add photo" />
            </div>
            <div className="_feed_inner_text_area_bottom_event _feed_common">
              <label className="_mar_r8" htmlFor="visibility">Visibility</label>
              <select id="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value as 'PUBLIC' | 'PRIVATE')}>
                <option value="PUBLIC">Public</option><option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>
          <div className="_feed_inner_text_area_btn">
            <button type="submit" disabled={create.isPending} className="_feed_inner_text_area_btn_link"><span>Post</span></button>
          </div>
        </div>
      </form>
    </div>
  );
}

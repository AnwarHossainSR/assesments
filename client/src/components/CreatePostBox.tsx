import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useCreatePost } from '../api/posts';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../lib/api';
import Avatar from './Avatar';

function ComposerIcon({ kind }: { kind: 'photo' | 'video' | 'event' | 'article' }) {
  const paths = {
    photo: 'M4 3h16v18H4V3Zm3 14 4-4 3 3 2-2 3 3M9 9h.01',
    video: 'M3 5h13v14H3V5Zm13 5 5-3v10l-5-3v-4Z',
    event: 'M4 6h16v15H4V6Zm0 5h16M8 3v6m8-6v6',
    article: 'M5 3h14v18H5V3Zm4 5h6M9 12h6m-6 4h4',
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

export default function CreatePostBox() {
  const { user } = useAuth();
  const create = useCreatePost();
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim() && !image) return;
    setError(null);
    const data = new FormData();
    if (text.trim()) data.append('text', text.trim());
    data.append('visibility', visibility);
    if (image) data.append('image', image);
    try {
      await create.mutateAsync(data);
    } catch (caught) {
      setError(errorMessage(caught));
      return;
    }
    setText('');
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <form onSubmit={onSubmit}>
        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image">{user && <Avatar user={user} className="_txt_img" />}</div>
          <div className="_feed_inner_text_area_box_form"><textarea className="form-control _textarea" placeholder="Write something ..." aria-label="Write something" value={text} onChange={(event) => setText(event.target.value)} /></div>
        </div>
        {preview && <div className="_feed_post_preview _mar_t16"><img src={preview} alt="Selected post" /></div>}
        {error && <p role="alert" className="_mar_t8" style={{ color: '#d00' }}>{error}</p>}
        <div className="_feed_inner_text_area_bottom">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link" onClick={() => fileRef.current?.click()}><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img"><ComposerIcon kind="photo" /></span>Photo</button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} aria-label="Add photo" />
            </div>
            {(['video', 'event', 'article'] as const).map((kind) => <div className={`_feed_inner_text_area_bottom_${kind} _feed_common`} key={kind}><button type="button" className="_feed_inner_text_area_bottom_photo_link" disabled aria-disabled="true" title="Not included in this assessment"><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img"><ComposerIcon kind={kind} /></span>{kind[0].toUpperCase() + kind.slice(1)}</button></div>)}
          </div>
          <div className="_feed_inner_text_area_btn">
            <label className="visually-hidden" htmlFor="post-visibility">Post visibility</label>
            <select id="post-visibility" className="_feed_visibility_select" value={visibility} onChange={(event) => setVisibility(event.target.value as 'PUBLIC' | 'PRIVATE')}><option value="PUBLIC">Public</option><option value="PRIVATE">Private</option></select>
            <button type="submit" disabled={create.isPending} className="_feed_inner_text_area_btn_link"><span>{create.isPending ? 'Posting…' : 'Post'}</span></button>
          </div>
        </div>
        <div className="_feed_inner_text_area_bottom_mobile">
          <div className="_feed_inner_text_mobile"><div className="_feed_inner_text_area_item"><div className="_feed_inner_text_area_bottom_photo _feed_common"><button type="button" className="_feed_inner_text_area_bottom_photo_link" onClick={() => fileRef.current?.click()}><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img"><ComposerIcon kind="photo" /></span>Photo</button></div></div><div className="_feed_inner_text_area_btn"><select aria-label="Post visibility" className="_feed_visibility_select" value={visibility} onChange={(event) => setVisibility(event.target.value as 'PUBLIC' | 'PRIVATE')}><option value="PUBLIC">Public</option><option value="PRIVATE">Private</option></select><button type="submit" disabled={create.isPending} className="_feed_inner_text_area_btn_link"><span>{create.isPending ? 'Posting…' : 'Post'}</span></button></div></div>
        </div>
      </form>
    </div>
  );
}

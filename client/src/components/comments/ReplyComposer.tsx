import { useState, type FormEvent } from 'react';
import { useCreateComment } from '../../api/comments';
import { useAuth } from '../../context/AuthContext';
import { errorMessage } from '../../lib/api';
import Avatar from '../Avatar';

export default function ReplyComposer({ postId, parentId, onDone, placeholder }: { postId: string; parentId?: string; onDone?: () => void; placeholder?: string }) {
  const { user } = useAuth();
  const create = useCreateComment(postId);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    setError(null);
    try {
      await create.mutateAsync({ text: text.trim(), parentId });
    } catch (caught) {
      setError(errorMessage(caught));
      return;
    }
    setText('');
    onDone?.();
  }

  return (
    <form className="_feed_inner_comment_box_form" onSubmit={onSubmit}>
      <div className="_feed_inner_comment_box_content">
        <div className="_feed_inner_comment_box_content_image">{user && <Avatar user={user} className="_comment_img" />}</div>
        <div className="_feed_inner_comment_box_content_txt"><textarea className="form-control _comment_textarea" placeholder={placeholder ?? 'Write a comment'} value={text} onChange={(event) => setText(event.target.value)} /></div>
      </div>
      {error && <p role="alert" className="_mar_t8" style={{ color: '#d00' }}>{error}</p>}
      <div className="_feed_inner_comment_box_icon"><button type="submit" className="_feed_inner_comment_box_icon_btn" aria-label="Send comment" disabled={create.isPending}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24"><path stroke="#666" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2" /></svg></button></div>
    </form>
  );
}

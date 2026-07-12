import { useState, type FormEvent } from 'react';
import { useCreateComment } from '../../api/comments';

export default function ReplyComposer({ postId, parentId, onDone, placeholder }: { postId: string; parentId?: string; onDone?: () => void; placeholder?: string }) {
  const create = useCreateComment(postId);
  const [text, setText] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    await create.mutateAsync({ text: text.trim(), parentId });
    setText('');
    onDone?.();
  }

  return (
    <form className="_feed_inner_comment_box_form" onSubmit={onSubmit}>
      <div className="_feed_inner_comment_box_content">
        <div className="_feed_inner_comment_box_content_txt">
          <textarea className="form-control _comment_textarea" placeholder={placeholder ?? 'Write a comment'} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <button type="submit" className="_btn1" disabled={create.isPending}>{create.isPending ? 'Posting...' : 'Send'}</button>
    </form>
  );
}

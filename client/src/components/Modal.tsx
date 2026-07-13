import { type ReactNode } from 'react';

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-label={title}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
      onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 320, maxWidth: 420, maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center _mar_b16">
          <h4 style={{ margin: 0 }}>{title}</h4>
          <button aria-label="Close" onClick={onClose} style={{ border: 'none', background: 'none', fontSize: 20 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

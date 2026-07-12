export default function TimeAgo({ iso }: { iso: string }) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  let text: string;
  if (mins < 1) text = 'just now';
  else if (mins < 60) text = `${mins} minute${mins > 1 ? 's' : ''} ago`;
  else if (mins < 1440) { const h = Math.floor(mins / 60); text = `${h} hour${h > 1 ? 's' : ''} ago`; }
  else { const d = Math.floor(mins / 1440); text = `${d} day${d > 1 ? 's' : ''} ago`; }
  return <span>{text}</span>;
}

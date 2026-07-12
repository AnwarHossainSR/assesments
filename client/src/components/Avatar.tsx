import { type PublicUser } from '../lib/api';

export default function Avatar({ user, className }: { user: Pick<PublicUser, 'firstName' | 'avatarUrl'>; className?: string }) {
  return <img src={user.avatarUrl ?? '/assets/images/txt_img.png'} alt={user.firstName} className={className ?? '_comment_img'} />;
}

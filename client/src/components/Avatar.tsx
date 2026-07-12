import { type PublicUser } from '../lib/api';

const DEFAULT_AVATAR = '/assets/images/Avatar.png';

export default function Avatar({ user, className }: { user: Pick<PublicUser, 'firstName' | 'avatarUrl'>; className?: string }) {
  return <img src={user.avatarUrl || DEFAULT_AVATAR} onError={(event) => { event.currentTarget.src = DEFAULT_AVATAR; }} alt={user.firstName} className={className ?? '_comment_img'} />;
}

import { useFeed } from '../api/posts';
import { errorMessage } from '../lib/api';
import PostCard from './PostCard';
import Spinner from './Spinner';

export default function PostList() {
  const { data, isLoading, isError, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useFeed();
  if (isLoading) return <Spinner />;
  if (isError) return (
    <div role="alert" className="_mar_t16 _mar_b16">
      <p>{errorMessage(error)}</p>
      <button type="button" className="_btn1" onClick={() => refetch()}>Retry</button>
    </div>
  );
  const posts = data?.pages.flatMap((p) => p.items) ?? [];
  if (posts.length === 0) return <p className="_mar_t16">No posts yet. Be the first to share something!</p>;
  return (
    <div>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
      {hasNextPage && (
        <div className="text-center _mar_b16">
          <button className="_btn1" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading…' : 'Load more'}</button>
        </div>
      )}
    </div>
  );
}

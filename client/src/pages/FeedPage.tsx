import FeedHeader from '../components/feed/FeedHeader';
import FeedLeftSidebar from '../components/feed/FeedLeftSidebar';
import FeedRightSidebar from '../components/feed/FeedRightSidebar';
import FeedStories from '../components/feed/FeedStories';
import CreatePostBox from '../components/CreatePostBox';
import PostList from '../components/PostList';

export default function FeedPage() {
  return (
    <div className="_layout _layout_main_wrapper">
      <FeedHeader />
      <div className="container _custom_container">
        <div className="_layout_inner_wrap">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12"><FeedLeftSidebar /></div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12"><div className="_feed_inner_wrap"><FeedStories /><CreatePostBox /><PostList /></div></div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12"><FeedRightSidebar /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

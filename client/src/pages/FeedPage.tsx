import CreatePostBox from '../components/CreatePostBox';
import PostList from '../components/PostList';
import { useAuth } from '../context/AuthContext';

export default function FeedPage() {
  const { user, logout } = useAuth();
  return (
    <div className="_layout _layout_main_wrapper">
      <nav className="navbar _header_nav _padd_t10">
        <div className="container _custom_container d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/feed"><img src="/assets/images/logo.svg" alt="BuddyScript" className="_nav_logo" /></a>
          <div className="d-flex align-items-center gap-3">
            <span>{user?.firstName} {user?.lastName}</span>
            <button className="_btn1" onClick={() => logout()}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container _custom_container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-12">
            <CreatePostBox />
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
}

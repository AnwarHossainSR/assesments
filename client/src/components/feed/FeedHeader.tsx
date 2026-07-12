function HomeIcon({ mobile = false }: { mobile?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={mobile ? 24 : 18} height={mobile ? 27 : 21} fill="none" viewBox="0 0 24 27" aria-hidden="true">
      <path className="_home_active" stroke="#000" strokeWidth="1.5" strokeOpacity=".6" d="M1 13c0-2.1 0-3.1.43-4 .43-.93 1.24-1.61 2.86-2.98l1.57-1.32C8.8 2.23 10.26 1 12 1s3.2 1.23 6.14 3.7l1.57 1.32C21.33 7.38 22.14 8.06 22.57 9c.43.9.43 1.95.43 4v6.58c0 2.91 0 4.36-.92 5.27-.92.9-2.4.9-5.37.9H7.29c-2.97 0-4.45 0-5.37-.9C1 23.94 1 22.49 1 19.58V13Z" />
      <path className="_home_active" stroke="#000" strokeWidth="1.5" strokeOpacity=".6" strokeLinecap="round" d="M15.8 25.75v-7.3a1 1 0 0 0-1-1H9.2a1 1 0 0 0-1 1v7.3" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20" aria-hidden="true">
      <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M13.3 12.4h.5c2.4.02 7.75.25 7.75 3.81 0 3.54-5.22 3.77-7.73 3.79h-.93c-2.37-.02-7.77-.25-7.77-3.8 0-3.55 5.4-3.78 7.77-3.8h.41Zm0 1.79c-2.91 0-6.38.35-6.38 2 0 1.63 3.27 2 6.12 2.02h.26c2.91 0 6.38-.34 6.38-2 0-1.67-3.47-2.02-6.38-2.02ZM13.3 0c3.09 0 5.6 2.44 5.6 5.44 0 3.01-2.51 5.45-5.6 5.45a5.6 5.6 0 0 1-5.59-5.45C7.71 2.44 10.22 0 13.3 0Zm0 1.79c-2.07 0-3.76 1.64-3.76 3.65 0 2.02 1.69 3.66 3.76 3.66s3.76-1.64 3.76-3.66c0-2.01-1.69-3.65-3.76-3.65Z" clipRule="evenodd" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22" aria-hidden="true">
      <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M7.55 19.55c.53.59 1.21.92 1.93.92.71 0 1.4-.33 1.94-.92a.77.77 0 0 1 1.09-.06c.32.29.34.77.05 1.09A4.15 4.15 0 0 1 9.48 22a4.13 4.13 0 0 1-3.08-1.42.77.77 0 0 1 1.15-1.03ZM9.53 0c4.58 0 7.65 3.54 7.65 6.85 0 1.7.44 2.42.9 3.19.46.75.98 1.61.98 3.23-.36 4.14-4.72 4.48-9.53 4.48C4.71 17.75.36 17.41 0 13.34c0-1.69.52-2.55.97-3.3.5-.82.9-1.56.9-3.19C1.87 3.54 4.95 0 9.53 0Zm0 1.54c-3.6 0-6.11 2.8-6.11 5.31 0 2.13-.6 3.11-1.12 3.98-.42.7-.76 1.25-.76 2.44.17 1.93 1.46 2.95 7.99 2.95 6.49 0 7.81-1.06 7.99-3.01 0-1.13-.34-1.68-.76-2.38-.53-.87-1.12-1.85-1.12-3.98 0-2.51-2.51-5.31-6.11-5.31Z" clipRule="evenodd" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12 0a12 12 0 0 1 8.49 20.35 12.1 12.1 0 0 1-13.54 2.39c-.47-.19-.92-.37-1.24-.37-.37 0-.86.17-1.34.34-.98.33-2.19.74-3.09-.15-.9-.89-.48-2.09-.15-3.06.17-.48.34-.97.34-1.34 0-.31-.15-.7-.38-1.26A12 12 0 0 1 12 0Zm0 1.66A10.34 10.34 0 0 0 2.63 16.24c.26.64.51 1.27.51 1.92 0 .65-.22 1.3-.42 1.88-.16.47-.41 1.19-.25 1.35.16.16.88-.09 1.36-.26.58-.19 1.23-.42 1.87-.42.65 0 1.26.24 1.91.5a10.33 10.33 0 1 0 4.39-19.55Zm4.41 9.61a1.11 1.11 0 1 1 0 2.22 1.11 1.11 0 0 1 0-2.22Zm-4.48 0a1.11 1.11 0 1 1 0 2.22 1.11 1.11 0 0 1 0-2.22Zm-4.47 0a1.11 1.11 0 1 1 0 2.22 1.11 1.11 0 0 1 0-2.22Z" clipRule="evenodd" />
    </svg>
  );
}

export default function FeedHeader() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const name = user ? `${user.firstName} ${user.lastName}` : '';

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
        <div className="container _custom_container">
          <div className="_logo_wrap">
            <a className="navbar-brand" href="/feed"><img src="/assets/images/logo.svg" alt="BuddyScript" className="_nav_logo" /></a>
          </div>
          <div className="collapse navbar-collapse show" id="feedNavigation">
            <div className="_header_form ms-auto">
              <form className="_header_form_grp" onSubmit={(event) => event.preventDefault()}>
                <svg className="_header_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17" aria-hidden="true"><circle cx="7" cy="7" r="6" stroke="#666" /><path stroke="#666" strokeLinecap="round" d="m16 16-3-3" /></svg>
                <input className="form-control me-2 _inpt1" type="search" placeholder="input search text" aria-label="Search" />
              </form>
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
              <li className="nav-item _header_nav_item"><a className="nav-link _header_nav_link_active _header_nav_link" aria-current="page" href="/feed"><HomeIcon /></a></li>
              <li className="nav-item _header_nav_item"><a className="nav-link _header_nav_link" href="#friends" aria-label="Friends"><PeopleIcon /></a></li>
              <li className="nav-item _header_nav_item"><button type="button" className="nav-link _header_nav_link _header_notify_btn" aria-label="Notifications"><BellIcon /><span className="_counting">6</span></button></li>
              <li className="nav-item _header_nav_item"><a className="nav-link _header_nav_link" href="#chat" aria-label="Messages"><ChatIcon /><span className="_counting">2</span></a></li>
            </ul>
            <div className="_header_nav_profile">
              <div className="_header_nav_profile_image">{user && <Avatar user={user} className="_nav_profile_img" />}</div>
              <div className="_header_nav_dropdown"><p className="_header_nav_para">{name}</p><button className="_header_nav_dropdown_btn" type="button" aria-label="Profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((open) => !open)}><svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6"><path fill="#112032" d="m5 5 4-4-.7-.7L5 3.6 1.7.3 1 1l4 4Z" /></svg></button></div>
              {profileOpen && <div className="_nav_profile_dropdown _profile_dropdown"><button type="button" className="_nav_dropdown_link" onClick={() => logout()}>Log Out</button></div>}
            </div>
          </div>
        </div>
      </nav>

      <div className="_header_mobile_menu">
        <div className="_header_mobile_menu_wrap">
          <div className="container">
            <div className="_header_mobile_menu_top_inner">
              <div className="_header_mobile_menu_logo"><a href="/feed"><img src="/assets/images/logo.svg" alt="BuddyScript" className="_nav_logo" /></a></div>
              <div className="_header_mobile_menu_right"><button type="button" className="_header_mobile_search" aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17"><circle cx="7" cy="7" r="6" stroke="#666" /><path stroke="#666" strokeLinecap="round" d="m16 16-3-3" /></svg></button></div>
            </div>
          </div>
        </div>
      </div>

      <div className="_mobile_navigation_bottom_wrapper">
        <div className="_mobile_navigation_bottom_wrap">
          <div className="container">
            <ul className="_mobile_navigation_bottom_list">
              <li className="_mobile_navigation_bottom_item"><a href="/feed" className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active" aria-label="Feed"><HomeIcon mobile /></a></li>
              <li className="_mobile_navigation_bottom_item"><a href="#friends" className="_mobile_navigation_bottom_link" aria-label="Friends"><PeopleIcon /></a></li>
              <li className="_mobile_navigation_bottom_item"><button type="button" className="_mobile_navigation_bottom_link" aria-label="Notifications"><BellIcon /><span className="_counting">6</span></button></li>
              <li className="_mobile_navigation_bottom_item"><a href="#chat" className="_mobile_navigation_bottom_link" aria-label="Messages"><ChatIcon /><span className="_counting">2</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../Avatar';

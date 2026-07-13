import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../Avatar';

function HomeIcon({ mobile = false }: { mobile?: boolean }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={mobile ? 24 : 18} height={mobile ? 27 : 21} fill="none" viewBox="0 0 18 21" aria-hidden="true"><path className="_home_active" stroke="#000" strokeWidth="1.5" strokeOpacity=".6" d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924Z" /><path className="_home_active" stroke="#000" strokeOpacity=".6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.857 19.341v-5.857a1 1 0 0 0-1-1H7.143a1 1 0 0 0-1 1v5.857" /></svg>;
}

function PeopleIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="none" viewBox="0 0 26 20" aria-hidden="true"><path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132Zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982Zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 0 1-1.137-.506.873.873 0 0 1 .51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 0 1-.741-.996.886.886 0 0 1 1.003-.735Zm-17.685.735a.878.878 0 0 1-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 0 1-.314 1.693.897.897 0 0 1-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735ZM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 0 1-3.782-1.57 5.253 5.253 0 0 1-1.553-3.764C7.423 2.392 9.83 0 12.789 0Zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 0 0 1.04 2.527 3.58 3.58 0 0 0 2.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75Z" clipRule="evenodd" /></svg>;
}

function BellIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22" aria-hidden="true"><path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 0 1 1.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 0 1 .057-1.083.774.774 0 0 1 1.092.057ZM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0Zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316Z" clipRule="evenodd" /></svg>;
}

function ChatIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" fill="none" viewBox="0 0 23 22" aria-hidden="true"><path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.437-.174-.847-.338-1.14-.338-.338.002-.793.158-1.232.308-.9.307-2.022.69-2.852-.131-.826-.822-.445-1.932-.138-2.826.152-.44.307-.895.307-1.239 0-.282-.137-.642-.347-1.161C-.57 11.46.322 6.47 3.596 3.22A11.04 11.04 0 0 1 11.43 0Zm0 1.535A9.5 9.5 0 0 0 4.69 4.307a9.463 9.463 0 0 0-1.91 10.686c.241.592.474 1.17.474 1.77 0 .598-.207 1.201-.39 1.733-.15.439-.378 1.1-.231 1.245.143.147.813-.085 1.255-.235.53-.18 1.133-.387 1.73-.391.597 0 1.161.225 1.758.463 3.655 1.679 7.98.915 10.796-1.881 3.716-3.693 3.716-9.7 0-13.391a9.5 9.5 0 0 0-6.74-2.77Zm4.068 8.867c.57 0 1.03.458 1.03 1.024 0 .566-.46 1.023-1.03 1.023a1.023 1.023 0 1 1-.01-2.047h.01Zm-4.131 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.03 1.03 0 0 1-1.035-1.024c0-.566.455-1.023 1.025-1.023h.01Zm-4.132 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.022 1.022 0 1 1-.01-2.047h.01Z" clipRule="evenodd" /></svg>;
}

function MenuIcon({ kind }: { kind: 'settings' | 'support' | 'logout' }) {
  if (kind === 'support') return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" stroke="#377DFF" strokeWidth="1.5" /><path stroke="#377DFF" strokeLinecap="round" strokeWidth="1.5" d="M7.4 7.3a2.7 2.7 0 0 1 5.2.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.01" /></svg>;
  if (kind === 'logout') return <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true"><path stroke="#377DFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.7 18H2.9A1.9 1.9 0 0 1 1 16.1V2.9A1.9 1.9 0 0 1 2.9 1h3.8m6.6 13.2L18 9.5l-4.7-4.7M18 9.5H6.7" /></svg>;
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#377DFF" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></svg>;
}

function Chevron() {
  return <svg width="6" height="10" fill="none" viewBox="0 0 6 10" aria-hidden="true"><path fill="#112032" opacity=".5" d="m5 5 .35.35.36-.35-.36-.35L5 5ZM1.35 9.35l4-4-.7-.7-4 4 .7.7Zm4-4.7-4-4-.7.7 4 4 .7-.7Z" /></svg>;
}

export default function FeedHeader() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const name = user ? `${user.firstName} ${user.lastName}` : '';

  const menuItems = [
    { label: 'Settings', kind: 'settings' as const, href: '#settings' },
    { label: 'Help & Support', kind: 'support' as const, href: '#support' },
    { label: 'Log Out', kind: 'logout' as const },
  ];

  return <>
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10"><div className="container _custom_container">
      <div className="_logo_wrap"><a className="navbar-brand" href="/feed"><img src="/assets/images/logo.svg" alt="BuddyScript" className="_nav_logo" /></a></div>
      <div className="collapse navbar-collapse" id="feedNavigation">
        <div className="_header_form ms-auto"><form className="_header_form_grp" onSubmit={(event) => event.preventDefault()}><svg className="_header_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17" aria-hidden="true"><circle cx="7" cy="7" r="6" stroke="#666" /><path stroke="#666" strokeLinecap="round" d="m16 16-3-3" /></svg><input className="form-control me-2 _inpt1" type="search" placeholder="Search unavailable" aria-label="Search" disabled /></form></div>
        <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
          <li className="nav-item _header_nav_item"><a className="nav-link _header_nav_link_active _header_nav_link" aria-current="page" href="/feed"><HomeIcon /></a></li>
          <li className="nav-item _header_nav_item"><span className="nav-link _header_nav_link" aria-label="Friends" aria-disabled="true"><PeopleIcon /></span></li>
          <li className="nav-item _header_nav_item"><button type="button" className="nav-link _header_nav_link _header_notify_btn" aria-label="Notifications" disabled aria-disabled="true" title="Not included in this assessment"><BellIcon /><span className="_counting">6</span></button></li>
          <li className="nav-item _header_nav_item"><span className="nav-link _header_nav_link" aria-label="Messages" aria-disabled="true"><ChatIcon /><span className="_counting">2</span></span></li>
        </ul>
        <div className="_header_nav_profile">
          <div className="_header_nav_profile_image">{user && <Avatar user={user} className="_nav_profile_img" />}</div>
          <div className="_header_nav_dropdown"><p className="_header_nav_para">{name}</p><button className="_header_nav_dropdown_btn _dropdown_toggle" type="button" aria-label="Profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((open) => !open)}><svg width="10" height="6" fill="none" viewBox="0 0 10 6"><path fill="#112032" d="m5 5 .35.35L5 5.7l-.35-.35L5 5Zm4.35-3.65-4 4-.7-.7 4-4 .7.7Zm-4.7 4-4-4 .7-.7 4 4-.7.7Z" /></svg></button></div>
          {profileOpen && <div className="_nav_profile_dropdown _profile_dropdown show">
            <div className="_nav_profile_dropdown_info"><div className="_nav_profile_dropdown_image">{user && <Avatar user={user} className="_nav_drop_img" />}</div><div className="_nav_profile_dropdown_info_txt"><h4 className="_nav_dropdown_title">{name}</h4><span className="_nav_drop_profile" aria-disabled="true">View Profile</span></div></div><hr />
            <ul className="_nav_dropdown_list">{menuItems.map((item) => <li className="_nav_dropdown_list_item" key={item.label}>{item.href ? <span className="_nav_dropdown_link" aria-disabled="true"><span className="_nav_drop_info"><span><MenuIcon kind={item.kind} /></span>{item.label}</span><Chevron /></span> : <button type="button" className="_nav_dropdown_link" onClick={() => logout()}><div className="_nav_drop_info"><span><MenuIcon kind={item.kind} /></span>{item.label}</div><Chevron /></button>}</li>)}</ul>
          </div>}
        </div>
      </div>
    </div></nav>

    <div className="_header_mobile_menu"><div className="_header_mobile_menu_wrap"><div className="container"><div className="_header_mobile_menu_top_inner"><div className="_header_mobile_menu_logo"><a href="/feed"><img src="/assets/images/logo.svg" alt="BuddyScript" className="_nav_logo" /></a></div><div className="_header_mobile_menu_right"><button type="button" className="_header_mobile_search" aria-label="Search" disabled aria-disabled="true" title="Not included in this assessment"><svg width="17" height="17" fill="none" viewBox="0 0 17 17"><circle cx="7" cy="7" r="6" stroke="#666" /><path stroke="#666" strokeLinecap="round" d="m16 16-3-3" /></svg></button></div></div></div></div></div>
    <div className="_mobile_navigation_bottom_wrapper"><div className="_mobile_navigation_bottom_wrap"><div className="container"><ul className="_mobile_navigation_bottom_list"><li className="_mobile_navigation_bottom_item"><a href="/feed" className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active" aria-label="Feed"><HomeIcon mobile /></a></li><li className="_mobile_navigation_bottom_item"><span className="_mobile_navigation_bottom_link" aria-label="Friends" aria-disabled="true"><PeopleIcon /></span></li><li className="_mobile_navigation_bottom_item"><button type="button" className="_mobile_navigation_bottom_link" aria-label="Notifications" disabled aria-disabled="true" title="Not included in this assessment"><BellIcon /><span className="_counting">6</span></button></li><li className="_mobile_navigation_bottom_item"><span className="_mobile_navigation_bottom_link" aria-label="Messages" aria-disabled="true"><ChatIcon /><span className="_counting">2</span></span></li></ul></div></div></div>
  </>;
}

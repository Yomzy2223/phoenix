import React from "react";
import {
  Account_Sidebar_info,
  ManageAccountsIcon,
  LogoutIcon,
  LoginIcon,
} from "../../assets/SidebarIcons";
import "../../css/account_sidebar.css";
import store from "../redux/store";
import { setSidebarBackArrow } from "../redux/userSlice";
import { useSelector } from "react-redux";
import DesktopSideBar from "./DesktopSideBar";
import { Link, NavLink } from "react-router-dom";

function AccountSideBar() {
  const closeSideBar = (id) => {
    store.dispatch(setSidebarBackArrow(true));
  };

  // Sidebar information from store
  const shrink = useSelector((store) => store.dummy_data.sidebar_is_shrink);

  // User information from store
  const userdata = useSelector((store) => store.user_data);
  const { loginstatus, initials, fullname } = userdata;

  return (
    <DesktopSideBar>
      <div className="account-sidebar">
        <div className="account-sidebar-top">
          {loginstatus ? <AccountHolder /> : <JoinNow />}
        </div>
        <div className="account-sidebar__main">
          <div className="account-sidebar__body">
            {Account_Sidebar_info.map((info) => (
              <SideBarTemp
                id={info.id}
                key={info.id}
                text={info.text}
                icon={info.icon}
                shrink={shrink}
                link={info.link}
                closeSideBar={closeSideBar}
              />
            ))}
          </div>
          <div className="account-sidebar__bottom">
            {loginstatus && (
              <SideBarTemp
                id={10}
                text={"Manage account"}
                icon={<ManageAccountsIcon />}
                shrink={shrink}
                link="/account"
                closeSideBar={closeSideBar}
              />
            )}
            {loginstatus ? (
              <SideBarTemp
                id={11}
                text={!shrink && "Logout"}
                icon={<LogoutIcon />}
                shrink={shrink}
                link="/sign_in"
                closeSideBar={closeSideBar}
              />
            ) : (
              <SideBarTemp
                id={12}
                text={!shrink && "Login"}
                icon={<LoginIcon />}
                shrink={shrink}
                link="/sign_in"
                closeSideBar={closeSideBar}
              />
            )}
          </div>
        </div>
      </div>
    </DesktopSideBar>
  );
}

export default AccountSideBar;

// _____________________________________________________________________
// Account holder component
export function AccountHolder() {
  // User information from the store
  const user_dummydata = useSelector((store) => store.dummy_data);
  const userdata = useSelector((store) => store.user_data);
  const { fullname, initials, username, status, followers, following } =
    userdata;

  // Sidebar information from the store
  const { sidebar_is_shrink } = user_dummydata;

  const newcolor = { color: sidebar_is_shrink && "#ffffff00" };

  return (
    <div className="account-holder">
      <div className="account-holder-main">
        <div className="account-name-initials">{initials}</div>
        <div
          className={`account-holder-status ${
            status === "Active" ? "" : "account-inactive"
          }`}
        >
          {status}
        </div>
      </div>
      <div
        className="account-holder-info"
        style={{ width: sidebar_is_shrink && 0 }}
      >
        <p className="account-holder-name" style={newcolor}>
          {fullname}
        </p>
        <p
          className="account-holder-username"
          style={newcolor}
        >{`@${username}`}</p>
        <div className="user-follows" style={newcolor}>
          <p className="user-followers">
            <span>{followers}</span> followers
          </p>
          <p className="user-following">
            <span>{following}</span> following
          </p>
        </div>
      </div>
    </div>
  );
}

// _____________________________________________________________
// Join now component
export function JoinNow() {
  const shrink = useSelector((store) => store.dummy_data.sidebar_is_shrink);
  return (
    <Link to="/" className="sidebar-join-now rls">
      <button className="styled-button">Join Now</button>
      {!shrink && <p>The world awaits you</p>}
    </Link>
  );
}

// ______________________________________________________________
// Sidebar list template
export function SideBarTemp({ id, text, icon, shrink, link, closeSideBar }) {
  const sideBarClose = async () => {
    document.body.classList.remove("sidebar-modal-on");
    await Promise.resolve(closeSideBar(id));
  };

  return (
    <NavLink
      to={link}
      id="remove-link-style"
      className="sidebar-temp-full"
      tabIndex={0}
      onClick={sideBarClose}
      style={({ isActive }) => {
        return {
          borderLeft: isActive ? "0.5rem solid #00448c" : "",
          backgroundColor: isActive ? "#8dd5ff13" : "",
          color: isActive ? "#00448c" : "",
        };
      }}
    >
      <div className="sidebar-temp">
        <span style={{ paddingLeft: shrink && "1rem" }}>{icon}</span>
        <span style={{ color: shrink && "#ffffff00", width: shrink && 0 }}>
          {text}
        </span>
      </div>
    </NavLink>
  );
}

import React from "react";
import "../../css/sidebar_mobile.css";
// import SideBarTemp from "./SideBarTemp";
// import store from "../redux/store";
// import { setSidebarBackArrow } from "../redux/userSlice";
// import { Link } from "@mui/material";
// import {
//   sidebarInfo,
//   ApartmentIcon,
//   ArrowBackIcon,
//   SettingsIcon,
//   LoginIcon,
// } from "../../assets/SidebarIcons";
import AccountSideBar from "./AccountSideBar";

function MobileSideBar({ sidebar_right, sidebar_width }) {
  return (
    <div
      id="mobile-sidebar-modal"
      className="mobile-sidebar-modal"
      style={{ right: sidebar_right }}
    >
      <div
        id="sidebar"
        className="mobile-sidebar"
        style={{ width: sidebar_width }}
      >
        <AccountSideBar mobile={true} />
      </div>
    </div>
  );
}

export default MobileSideBar;

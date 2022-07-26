import React, { useRef } from "react";
import Header from "../header/Header";
import AccountSideBar from "../sidebar/AccountSideBar";
import "../../css/dashboard_page.css";
import DashboardMain from "../dashboard/DashboardMain";
import MobileSideBar from "../sidebar/MobileSideBar";
import { useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";
import { Outlet } from "react-router-dom";
import RecentActivities from "../Activities/RecentActivities";

function DashboardPage() {
  var sidebar_width = useSelector((state) => state.dummy_data.sidebar_width);
  var sidebar_right = useSelector((state) => state.dummy_data.sidebar_right);

  const user_dummydata = useSelector((store) => store.dummy_data);

  const activities = useRef(null);

  return (
    <div className="main-container">
      <DashboardMain />
      <div ref={activities} className="activities-container">
        <RecentActivities activities={activities} />
      </div>
    </div>
  );
}

export default DashboardPage;

{
  /* <div id="main-grid1" className="main-grid1">
  <div id="grid-item1" className="grid-item1">
    <Header showlist={false} />
  </div>
  <div id="grid-item2" className="grid-item2">
    <AccountSideBar />
  </div>
  <div id="grid-item3" className="grid-item3">
    <DashboardMain />
  </div>
  <div id="grid-item4" className="grid-item4">
    4
  </div>
</div> */
}
{
  /* <div className="desktop-sidebar"></div>
<MobileSideBar
  sidebar_right={sidebar_right}
  sidebar_width={sidebar_width}
/>
<div className="dashboard-mainpage">
  <div></div>
</div> */
}

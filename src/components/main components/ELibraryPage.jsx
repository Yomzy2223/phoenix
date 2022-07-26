import React from "react";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import AccountSideBar from "../sidebar/AccountSideBar";
import MobileSideBar from "../sidebar/MobileSideBar";
import "../../css/e_library.css";

function ELibraryPage() {
  var sidebar_width = useSelector((state) => state.dummy_data.sidebar_width);
  var sidebar_right = useSelector((state) => state.dummy_data.sidebar_right);

  return (
    <div className="dashboard-page">
      <div className="desktop-sidebar">
        <AccountSideBar />
      </div>
      <MobileSideBar
        sidebar_right={sidebar_right}
        sidebar_width={sidebar_width}
      />
      <div className="dashboard-mainpage">
        <Header showlist={false} />
        <div className="e_library__coming-soon">
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

export default ELibraryPage;

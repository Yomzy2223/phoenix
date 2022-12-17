import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import AccountSideBar from "../sidebar/AccountSideBar";
import MobileNavbar from "./MobileNavbar";

const Homepage = () => {
  return (
    <div>
      <div id="main-cont1" className="main-cont1">
        <div id="main-cont1-item1" className="main-cont1-item1">
          <AccountSideBar />
        </div>
        <div id="main-cont1-item2" className="main-cont1-item2">
          <div className="cont1-item2-main-head">
            <Header showlist={false} />
          </div>
          <div className="cont1-item2-main-body">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Homepage;

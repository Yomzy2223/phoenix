import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../css/desktop_sidebar.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import store from "../redux/store";
import {
  setNarrowSidebar,
  setSidebarBackArrow,
  setSideBarShrink,
} from "../redux/userSlice";

const DesktopSideBar = ({ children, mobile }) => {
  // Sidebar information from store
  const dummy_data = useSelector((state) => state.dummy_data);
  const { sidebar_is_shrink, narrow_sidebar } = dummy_data;
  const shrink = sidebar_is_shrink;

  // A function to close sidebar (if mobile)
  const closeSideBar = () => {
    store.dispatch(setSidebarBackArrow(true));
  };

  // Handle the shrink and the expansion of sidebar on desktop
  const handleShrink = () => {
    if (mobile) {
      closeSideBar();
    } else {
      store.dispatch(setSideBarShrink(!shrink));
      document.documentElement.style.setProperty(
        "--sidebar-width",
        shrink ? "14rem" : "5.5rem"
      );
    }
    document.body.classList.remove("sidebar-modal-on");
  };

  // Get the body width
  const body_width = document.body.clientWidth;

  // Remove arrow when body width is less than 1040px
  useEffect(() => {
    if (body_width < 1040) {
      store.dispatch(setNarrowSidebar(true));
      store.dispatch(setSideBarShrink(true));
      document.documentElement.style.setProperty("--sidebar-width", "5.5rem");
    }
    return () => {
      store.dispatch(setNarrowSidebar(false));
    };
  }, [body_width]);

  return (
    <div className="desktop-sidebar">
      {!narrow_sidebar && (
        <div className="sidebar-toggle-icon">
          {shrink ? (
            <ArrowRightIcon onClick={handleShrink} />
          ) : (
            <ArrowLeftIcon onClick={handleShrink} />
          )}
        </div>
      )}
      <div className="desktop-sidebar-inner">{children}</div>
    </div>
  );
};

export default DesktopSideBar;

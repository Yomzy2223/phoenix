import All_icons from "../../assets/All_Icons";
import React, { useState } from "react";
import "../../css/account_summary.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { setHeaderIconClicked } from "../redux/userSlice";

const AccountSummary = () => {
  // All icons used in the header
  const {
    GroupsOutlinedIcon,
    GroupsIcon,
    NotificationsOutlinedIcon,
    NotificationsIcon,
    ChatOutlinedIcon,
    ChatIcon,
    ArrowDropDownIcon,
    LogoutIcon,
    ArrowDropUpIcon,
  } = All_icons;

  // Get clicked icon information from the store
  const dummy_store = useSelector((store) => store.dummy_data);
  const { header_icon_clicked } = dummy_store;
  const clicked = header_icon_clicked;

  // A function to save the clicked icon in the store
  const handleIconClicked = (id) => {
    store.dispatch(setHeaderIconClicked(id));
  };

  return (
    <div className="account-summary">
      <div
        className="account-summary-users"
        onClick={() => handleIconClicked(1)}
        tabIndex={0}
      >
        {clicked === 1 ? (
          <GroupsIcon sx={{ fontSize: 36, color: "var(--mainblue)" }} />
        ) : (
          <GroupsOutlinedIcon sx={{ fontSize: 36 }} />
        )}
      </div>
      <div
        className="account-summary-notifications"
        onClick={() => handleIconClicked(2)}
        tabIndex={0}
      >
        {clicked === 2 ? (
          <NotificationsIcon sx={{ fontSize: 30, color: "var(--mainblue)" }} />
        ) : (
          <NotificationsOutlinedIcon sx={{ fontSize: 30 }} />
        )}
      </div>
      <div
        className="account-summary-chats"
        onClick={() => handleIconClicked(3)}
        tabIndex={0}
      >
        {clicked === 3 ? (
          <ChatIcon sx={{ fontSize: 27, color: "var(--mainblue)" }} />
        ) : (
          <ChatOutlinedIcon sx={{ fontSize: 27 }} />
        )}
      </div>
      <div className="profile-icon-mobile">
        <Avatar
          sx={{ backgroundColor: "var(--mainblue)", width: 30, height: 30 }}
        />
      </div>
      <div className="account-summary-profile">
        <div className="account-profile-icon" tabIndex={0}>
          <Avatar sx={{ backgroundColor: "var(--mainblue)" }} />
          <ArrowDropDownIcon style={{ position: "relative", left: "-.3rem" }} />
        </div>
        <div className="account-profile-info">
          <ArrowDropUpIcon className="arrow-top" sx={{ fontSize: 70 }} />
          <p tabIndex={0}>My Profile</p>
          <p tabIndex={0}>Account Settings</p>
          <button className="styled-button b3">
            <LogoutIcon sx={{ fontSize: 17 }} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;

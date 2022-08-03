import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import All_Icons from "../../assets/All_Icons";
import store from "../redux/store";
import { setNavClicked } from "../redux/userSlice";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ListIcon from "@mui/icons-material/List";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsertChartRoundedIcon from "@mui/icons-material/InsertChartRounded";

const MobileNavbar = () => {
  const navClicked = useSelector((store) => store.dummy_data.nav_clicked);

  const navigate = useNavigate();

  // const {
  //   HomeRoundedIcon,
  //   HomeOutlinedIcon,
  //   MenuBookIcon,
  //   SignalCellular4BarRoundedIcon,
  //   SignalCellular0BarOutlinedIcon,
  //   ThumbUpIcon,
  //   ThumbUpOutlinedIcon,
  //   StoreRoundedIcon,
  //   StoreOutlinedIcon,
  //   ListIcon,
  // } = All_Icons;

  const handleClick = (n) => {
    store.dispatch(setNavClicked(n));
    navigate(`/${n}`);
  };
  return (
    <div className="mobile-navbar nv1">
      <div onClick={() => handleClick("dashboard")} tabIndex={0}>
        {navClicked === "dashboard" ? (
          <div className="mobile-nb m-blue">
            <HomeRoundedIcon />
            <span>Dashboard</span>
          </div>
        ) : (
          <div className="mobile-nb">
            <HomeOutlinedIcon />
            <span>Dashboard</span>
          </div>
        )}
      </div>
      <div onClick={() => handleClick("social")} tabIndex={0}>
        {navClicked === "social" ? (
          <div className="mobile-nb m-blue">
            <ThumbUpIcon />
            <span>Go Social</span>
          </div>
        ) : (
          <div className="mobile-nb">
            <ThumbUpOutlinedIcon />
            <span>Go Social</span>
          </div>
        )}
      </div>
      <div onClick={() => handleClick("swap")} tabIndex={0}>
        {navClicked === "swap" ? (
          <div className="mobile-nb m-blue">
            <SwapHorizRoundedIcon />
            <span>Swap</span>
          </div>
        ) : (
          <div className="mobile-nb">
            <SwapHorizRoundedIcon />
            <span>Swap</span>
          </div>
        )}
      </div>
      <div onClick={() => handleClick("market")} tabIndex={0}>
        {navClicked === "market" ? (
          <div className="mobile-nb m-blue">
            <StoreRoundedIcon />
            <span>Market</span>
          </div>
        ) : (
          <div className="mobile-nb">
            <StoreOutlinedIcon />
            <span>Market</span>
          </div>
        )}
      </div>
      <div onClick={() => handleClick("transactions")} tabIndex={0}>
        {navClicked === "transactions" ? (
          <div className="mobile-nb m-blue">
            <InsertChartRoundedIcon />
            <span>Transactions</span>
          </div>
        ) : (
          <div className="mobile-nb ">
            <BarChartIcon />
            <span>Transactions</span>
          </div>
        )}
      </div>
      <div onClick={() => handleClick("more")} tabIndex={0}>
        {navClicked === "more" ? (
          <div className="mobile-nb m-blue">
            <ListIcon />
            <span>More</span>
          </div>
        ) : (
          <div className="mobile-nb">
            <ListIcon />
            <span>More</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;

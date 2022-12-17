import React from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const mobileNavIcons = [
    {
      text: "Dashboard",
      icon1: <HomeRoundedIcon />,
      icon2: <HomeOutlinedIcon />,
      link: "/",
    },
    {
      text: "Go Social",
      icon1: <ThumbUpIcon />,
      icon2: <ThumbUpOutlinedIcon />,
      link: "social",
    },
    {
      text: "Swap",
      icon1: <SwapHorizRoundedIcon />,
      icon2: <SwapHorizRoundedIcon />,
      link: "swap",
    },
    {
      text: "Market",
      icon1: <StoreRoundedIcon />,
      icon2: <StoreOutlinedIcon />,
      link: "market",
    },
    {
      text: "Transactions",
      icon1: <InsertChartRoundedIcon />,
      icon2: <BarChartIcon />,
      link: "transactions",
    },
    {
      text: "More",
      icon1: <ListIcon />,
      icon2: <ListIcon />,
      link: "more",
    },
  ];

  const location = useLocation();

  return (
    <div className="mobile-navbar nv1">
      {mobileNavIcons.map((icon) => (
        <NavLink to={icon.link} key={icon.text} className="mobile-nb rls">
          {location.pathname.includes(icon.link.toLowerCase())
            ? icon.link !== "/" && icon.icon1
            : icon.icon2}
          {icon.link === "/"
            ? location.pathname === "/"
              ? icon.icon1
              : icon.icon2
            : null}
          {icon.text}
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNavbar;

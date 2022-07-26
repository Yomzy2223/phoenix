import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import All_Icons from "../../assets/All_Icons";
import store from "../redux/store";
import { setNavClicked } from "../redux/userSlice";

const MobileNavbar = () => {
  const navClicked = useSelector((store) => store.dummy_data.nav_clicked);

  const navigate = useNavigate();

  const {
    HomeRoundedIcon,
    HomeOutlinedIcon,
    MenuBookIcon,
    SignalCellular4BarRoundedIcon,
    SignalCellular0BarOutlinedIcon,
    ThumbUpIcon,
    ThumbUpOutlinedIcon,
    StoreRoundedIcon,
    StoreOutlinedIcon,
    ListIcon,
  } = All_Icons;

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
            <span>Home</span>
          </div>
        ) : (
          <div className="mobile-nb">
            <HomeOutlinedIcon />
            <span>Home</span>
          </div>
        )}
      </div>
      <div onClick={() => handleClick("courses")} tabIndex={0}>
        {navClicked === "courses" ? (
          <div className="mobile-nb m-blue">
            <MenuBookIcon />
            <span>Courses</span>
          </div>
        ) : (
          <div className="mobile-nb">
            <MenuBookIcon />
            <span>Courses</span>
          </div>
        )}
      </div>
      <div onClick={() => handleClick("airtime")} tabIndex={0}>
        {navClicked === "airtime" ? (
          <div className="mobile-nb m-blue">
            <SignalCellular4BarRoundedIcon />
            <span>Airtime</span>
          </div>
        ) : (
          <div className="mobile-nb ">
            <SignalCellular0BarOutlinedIcon />
            <span>Airtime</span>
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

import React, { useEffect, useRef, useState } from "react";
import "../../css/header.css";
import MenuIcon from "@mui/icons-material/Menu";
import {
  setSidebarWidth,
  setSidebarRight,
  setSideBarShrink,
  setItemSearched,
  setAllMatched,
  setBrandSearched,
  setBrandsMatched,
} from "../redux/userSlice";
import store from "../redux/store";
import { Link } from "react-router-dom";
import All_icons from "../../assets/All_Icons";
import { ApartmentIcon } from "../../assets/SidebarIcons";
import AccountSummary from "./AccountSummary";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { borderRadius } from "@mui/system";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

// Header component
function Header() {
  // const [loggedIn, setLoggedIn] = useState(true);
  const [listening, setListening] = useState(false);

  const handleMenuClick = () => {
    store.dispatch(setSideBarShrink(false));
    store.dispatch(setSidebarWidth("16.8rem"));
    store.dispatch(setSidebarRight("0"));
    if (!listening) {
      window.addEventListener("click", closeSideBar);
      setListening(true);
    }
    document.body.classList.add("sidebar-modal-on");
  };

  const closeSideBar = (e) => {
    const sidebar = document.getElementById("mobile-sidebar-modal");
    if (e.target.contains(sidebar)) {
      store.dispatch(setSidebarWidth("0"));
      store.dispatch(setSidebarRight(""));
      document.body.classList.remove("sidebar-modal-on");
    }
  };

  // Login status check and market information
  const user_data = useSelector((store) => store.user_data);
  const { loginstatus, market } = user_data;
  const { searched_item } = market;

  return (
    <div id="header" className="header-main">
      <div className="header-main-content">
        <CompanyName />
        <InputSearch
          placeholder="Search Products Brands and Categories..."
          search="all"
          searched={searched_item}
        />
        {loginstatus ? (
          <AccountSummary />
        ) : (
          <div className="gateway-buttons">
            <button className="styled-button b1">Login</button>
            <button className="styled-button b2">Sign Up</button>
          </div>
        )}
      </div>
      {/* <MenuIcon id="menu-icon" onClick={handleMenuClick} />
      <div id="header__main-info" className="header__main-info">
        <div id="company-name__mobile">
        </div>
      </div> */}
    </div>
  );
}

export default Header;

// A new Component
// Company name component, which also shows the logo
export function CompanyName({ color, noicon }) {
  return (
    <Link to="/" className="company-name" style={{}}>
      {!noicon && <ApartmentIcon sx={{ fontSize: "300%", color: color }} />}
      <span>
        <p className="company-name__main" style={{ backgroundColor: color }}>
          Pheonix
        </p>
        <p className="company-name__sub" style={{ backgroundColor: color }}>
          Universal club
        </p>
        <p className="company-name__footer" style={{ backgroundColor: color }}>
          Raising Future Millionaires
        </p>
      </span>
    </Link>
  );
}

// A new Component
// Search input component for both desktop and mobile
export const InputSearch = ({ placeholder, search, searched }) => {
  const { SearchRoundedIcon } = All_icons;

  // Get some information from market in store
  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const {
    products,
    brands,
    categories,
    matched_all,
    matched_brands,
    matched_brands_only,
  } = market;

  // Input style when suggestion is on
  const style = {
    borderRadius: matched_all.length > 0 ? "1rem 1rem 0 0" : "",
    boxShadow: matched_all.length > 0 ? "0 -0.5rem .5rem #f1f1f1aa" : "",
  };

  const searchbox = useRef(null);

  // A function to handle search suggestions
  const handleChange = (searching) => {
    // Search products, brands, categories, ....
    if (search === "all") {
      store.dispatch(setItemSearched(searching));
      const matchedItems = products.filter((list) =>
        list.item.toLowerCase().includes(searching.toLowerCase())
      );
      const matchedBrands = brands.filter((list) =>
        list.text.toLowerCase().includes(searching.toLowerCase())
      );
      const matchedCategories = categories.filter((list) =>
        list.text.toLowerCase().includes(searching.toLowerCase())
      );
      // console.log(matchedItems);
      store.dispatch(
        setAllMatched(
          searching.length === 0
            ? []
            : [...matchedItems, ...matchedBrands, ...matchedCategories]
        )
      );
      store.dispatch(
        setBrandsMatched(searching.length === 0 ? [] : matchedBrands)
      );
    }
    // Search brands only
    if (search === "brands") {
      store.dispatch(setBrandSearched(searching));
      const matchedBrands = brands.filter((list) =>
        list.text.toLowerCase().includes(searching.toLowerCase())
      );
      store.dispatch(
        setBrandsMatched(searching.length === 0 ? [] : matchedBrands)
      );
    }
  };

  return (
    <>
      <div ref={searchbox} className="main-search-input">
        <input
          type="text"
          placeholder={placeholder}
          style={style}
          onChange={(e) => handleChange(e.target.value)}
        />
        <SearchRoundedIcon className="search-submit-button" />
        {matched_all.length > 0 && (
          <SearchSuggestions
            search={search}
            matched_all={matched_all}
            searchbox={searchbox}
          />
        )}
      </div>
      <div className="mobile-search-icon">
        <SearchRoundedIcon />
      </div>
    </>
  );
};

// A new component
// Search suggestion component
export const SearchSuggestions = ({ search, matched_all, searchbox }) => {
  useEffect(() => {
    window.addEventListener("click", (e) => closeSuggestions(e));
    return () =>
      window.removeEventListener("click", (e) => closeSuggestions(e));
  }, []);

  const closeSuggestions = (e) => {
    if (!searchbox.current.contains(e.target)) {
      console.log("Does not contain");
      // if (search === "all") {
      //   store.dispatch(setAllMatched([]));
      // }
    }
  };

  return (
    <div className="search-sugg-cont">
      {search === "all" && matched_all.length > 0 && (
        <div className="search-sugg">
          <div className="search-sugg-top">
            {matched_all.map((product) => {
              return (
                <div key={product.id + product.item + product.text}>
                  {product.item && <p>{product.item}</p>}
                  {product.text && <p>{product.text}</p>}
                </div>
              );
            })}
          </div>
          <div className="search-sugg-bottom">
            <div>
              <BubbleChartIcon />
              <p>Phoenix seamless search</p>
              <BubbleChartIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//  Will be needed in taskbar
// ------------------------------------------

// <li>
//           <HomeRoundedIcon sx={{ fontSize: 20 }} /> Home
//         </li>
//         <li>
//           {" "}
//           <SignalCellular4BarRoundedIcon sx={{ fontSize: 20 }} /> Airtime
//         </li>
//         <li>
//           {" "}
//           <ConnectWithoutContactRoundedIcon sx={{ fontSize: 20 }} /> Go Social
//         </li>
//         <li>
//           {" "}
//           <StoreRoundedIcon sx={{ fontSize: 20 }} /> Market
//         </li>
//         <li>
//           {" "}
//           <GroupsRoundedIcon sx={{ fontSize: 20 }} /> Users
//         </li>

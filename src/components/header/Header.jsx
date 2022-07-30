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
import {
  Avatar,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { setAutoFreeze } from "immer";

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

// _____________________________________________________________
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

//___________________________________________________________
// A custom hook to confirm if the pressed key is the passed for check
export const useKeyPress = (targetKey) => {
  const [keyPressed, setkeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (targetKey === key) {
        setkeyPressed(true);
      }
      // else {
      //   setkeyPressed(false);
      // }
    };
    const handleKeyUp = ({ key }) => {
      if (targetKey === key) {
        setkeyPressed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleKeyUp);
    };
  }, [targetKey]);
  return keyPressed;
};

// __________________________________________________________________
// Search input component for both desktop and mobile
export const InputSearch = ({ placeholder, search, searched }) => {
  const [openSearch, setopenSearch] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [selectedItem, setselectedItem] = useState("");
  const [openSugg, setopenSugg] = useState(false);

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

  const searchbox = useRef(null);

  // determined the pressed key using useKeyPress custom hook
  const ArrowUp = useKeyPress("ArrowUp");
  const ArrowDown = useKeyPress("ArrowDown");
  const Enter = useKeyPress("Enter");

  // Set the index of the item selected with arrow key
  useEffect(() => {
    if (ArrowUp) {
      if (selectedIndex > 0) {
        setselectedIndex(selectedIndex - 1);
      } else {
        setselectedIndex(matched_all.length - 1);
      }
    } else if (ArrowDown) {
      if (selectedIndex < matched_all.length - 1) {
        setselectedIndex(selectedIndex + 1);
      } else {
        setselectedIndex(0);
      }
    } else if (Enter) {
      handleSearch(selectedIndex);
    }
  }, [ArrowUp, ArrowDown, Enter]);

  // Set the item selected with arrow key
  useEffect(() => {
    var item = matched_all[selectedIndex]?.item;
    var text = matched_all[selectedIndex]?.text;
    setselectedItem(item ? item : text);
  });

  // Input style when suggestion is on
  const style = {
    borderRadius: matched_all.length > 0 && openSugg ? "1rem 1rem 0 0" : "",
    boxShadow:
      matched_all.length > 0 && openSugg ? "0 -0.5rem .5rem #f1f1f1aa" : "",
  };

  // Handle input value change
  const handleChange = (searching) => {
    setopenSugg(true);
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
    // Reset arrow selected item on every change in input value
    setselectedIndex(-1);
  };

  // The function to handle search
  const handleSearch = (index) => {
    setopenSugg(false);
    setselectedIndex(index);
  };

  // open search dialog for mobile screen
  const openSearchDialog = () => {
    setopenSearch(true);
  };

  return (
    <>
      <div ref={searchbox} className="main-search-input">
        <input
          type="text"
          placeholder={placeholder}
          value={selectedItem ? selectedItem : searched}
          style={style}
          onChange={(e) => handleChange(e.target.value)}
        />
        <SearchRoundedIcon className="search-submit-button" />
        {matched_all.length > 0 && openSugg && (
          <SearchSuggestions
            search={search}
            matched_all={matched_all}
            searchbox={searchbox}
            desktop={true}
            selectedIndex={selectedIndex}
            handleSearch={handleSearch}
          />
        )}
      </div>
      <div className="mobile-search-icon">
        <SearchRoundedIcon onClick={openSearchDialog} />
      </div>
      {openSearch && (
        <MobileSearchDialog
          open={openSearch}
          setOpen={setopenSearch}
          search="all"
        />
      )}
    </>
  );
};

// ______________________________________________________________
// Search suggestion component
export const SearchSuggestions = ({
  search,
  matched_all,
  searchbox,
  desktop,
  selectedIndex,
  handleSearch,
}) => {
  // useEffect(() => {
  //   desktop && window.addEventListener("click", (e) => closeSuggestions(e));
  //   return () =>
  //     desktop &&
  //     window.removeEventListener("click", (e) => closeSuggestions(e));
  // }, []);

  // const closeSuggestions = (e) => {
  //   if (!searchbox.current.contains(e.target)) {
  //     console.log("Does not contain");
  // if (search === "all") {
  //   store.dispatch(setAllMatched([]));
  // }
  // }
  // };

  return (
    <div className="search-sugg-cont">
      {search === "all" && matched_all.length > 0 && (
        <div className={desktop ? "search-sugg" : "search-sugg-m"}>
          <div className="search-sugg-top">
            {matched_all.map((product, index) => {
              return (
                <div
                  key={product.id + product.item + product.text}
                  style={{
                    backgroundColor: index === selectedIndex ? "#e7e6e69d" : "",
                  }}
                  onClick={() => handleSearch(index)}
                >
                  {product.item && <p>{product.item}</p>}
                  {product.text && <p>{product.text}</p>}
                </div>
              );
            })}
          </div>
          <div className="search-sugg-bottom">
            <div>
              <BubbleChartIcon />
              <p>Phoenix </p> <div className="div-y" /> <p> seamless search</p>
              <BubbleChartIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ____________________________________________________________
// Search modal component for mobile view
export const MobileSearchDialog = ({ open, setOpen, search }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Get some information from market in store
  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { matched_all, products, brands, categories } = market;

  const handleClose = () => {
    setOpen(false);
  };

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
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent className="search-dialog-content">
        <div className="search-dialog-header">
          <div onClick={handleClose}>
            <ArrowBackIcon />
          </div>
          <div className="search-dialog-input">
            <input
              type="text"
              placeholder="Search products, brands and categories"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div>
            <ClearIcon sx={{ color: "#b7b6b6" }} />
          </div>
          <div className="div-y" />
          <div>
            <SearchRoundedIcon />
          </div>
        </div>
        <div className="search-dialog-body">
          <SearchSuggestions search={search} matched_all={matched_all} />
        </div>
      </DialogContent>
    </Dialog>
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

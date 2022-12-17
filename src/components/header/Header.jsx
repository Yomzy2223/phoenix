import React, { useEffect, useRef, useState } from "react";
import "../../css/header.css";
import MenuIcon from "@mui/icons-material/Menu";
import {
  setSidebarWidth,
  setSidebarRight,
  setSideBarShrink,
  setItemSearched,
  setBrandSearched,
  setSelectedItem,
  setSearchMatch,
  setMobileSearch,
  setAllSearched,
  setCorrectedProducts,
} from "../redux/userSlice";
import store from "../redux/store";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

// Header component
function Header() {
  const [listening, setListening] = useState(false);
  const [searching, setsearching] = useState("");
  const [match, setmatch] = useState([]);

  // Login status check and market information
  const user_data = useSelector((store) => store.user_data);
  const { loginstatus, market } = user_data;
  const { products, brands, categories } = market;

  const all = [...products, ...brands, ...categories];

  // Calculate and store the value of the rating and the discount
  useEffect(() => {
    const storeProducts = [...products];
    const correctedProducts = storeProducts.map((product) => {
      const productCopy = { ...product };

      // Calculate the average rating
      const total = (sum, num) => sum + num;
      const totalRating = productCopy.ratings.reduce(total);
      productCopy.av_rating = (
        totalRating / productCopy.ratings.length
      ).toFixed(2);

      // Calculate the discount (%) from old and new price
      const price_cut = productCopy.old_price - productCopy.new_price;
      productCopy.discount = Math.round(
        (price_cut / productCopy.old_price) * 100
      );

      return (product = productCopy);
    });
    store.dispatch(setCorrectedProducts(correctedProducts));
  }, []);

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

  return (
    <div id="header" className="header-main">
      <div className="header-main-content">
        <CompanyName />
        <InputSearch
          placeholder="Search Products Brands and Categories..."
          search="all"
          desktop={true}
          items={all}
          searching={searching}
          setsearching={setsearching}
          match={searching?.length === 0 ? [] : match}
          setmatch={setmatch}
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

// __________________________________________________________________
// Search input component for both desktop and mobile
export const InputSearch = ({
  desktop,
  placeholder,
  search,
  searching,
  setsearching,
  items,
  match,
  setmatch,
}) => {
  const [openSearch, setopenSearch] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [openSugg, setopenSugg] = useState(false);
  const [arrow, setarrow] = useState("");
  const [initiateSearch, setinitiateSearch] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();
  // const [searchParamsValue, setsearchParamsValue] = useState(
  //   searchParams.get("searching")
  // );

  const searchbox = useRef(null);

  const navigate = useNavigate();
  // Get information from store
  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { mobile_search } = market;

  const searchParamsValue = searchParams.get("searching");

  // determine the pressed key
  var ArrowUp = arrow === "ArrowUp";
  var ArrowDown = arrow === "ArrowDown";
  var Enter = arrow === "Enter";

  // Set the pressed key in a state
  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === "ArrowUp") {
        setarrow("ArrowUp");
      } else if (key === "ArrowDown") {
        setarrow("ArrowDown");
      } else if (key === "Enter") {
        setarrow("Enter");
      }
    };
    const handleKeyUp = () => {
      setarrow("");
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleKeyUp);
    };
  }, []);

  // Set the index of the item selected with arrow key
  useEffect(() => {
    if (ArrowUp) {
      if (selectedIndex > 0) {
        setselectedIndex(selectedIndex - 1);
      } else {
        setselectedIndex(match.length - 1);
      }
    } else if (ArrowDown) {
      if (selectedIndex < match.length - 1) {
        setselectedIndex(selectedIndex + 1);
      } else {
        setselectedIndex(0);
      }
    } else if (Enter) {
      updateInputValue(selectedIndex);
    }
  }, [ArrowUp, ArrowDown, Enter]);

  // Update the input value with the item selected with arrow key
  useEffect(() => {
    var item = match[selectedIndex]?.item;
    var text = match[selectedIndex]?.text;
    if (selectedIndex >= 0) {
      setsearching(item ? item : text);
    }
  }, [selectedIndex]);

  // Input style when suggestion is on
  const style = {
    borderRadius: match.length > 0 && openSugg ? "1rem 1rem 0 0" : "",
    boxShadow: match.length > 0 && openSugg ? "0 -0.5rem .5rem #f1f1f1aa" : "",
  };

  // Handle input value change
  const handleChange = (searching) => {
    setopenSugg(true);
    setsearching(searching);
    setinitiateSearch(false);

    const matchedItems = items.filter((list) =>
      list.item?.toLowerCase().includes(searching.toLowerCase())
    );
    const matchedTexts = items.filter((list) =>
      list.text?.toLowerCase().includes(searching.toLowerCase())
    );
    const matched = [...matchedItems, ...matchedTexts];
    setmatch(matched);
    setselectedIndex(-1);
  };
  // const a = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(console.log("Thanks for waiting"));
  //     }, 2000);
  //   });
  // };
  // const b = () => {
  //   return new Promise((resolve, reject) => {
  //     resolve(console.log("You are welcome"));
  //   });
  // };
  // a().then((response) => b());

  // Update input value
  const updateInputValue = (index) => {
    setopenSugg(false);
    setselectedIndex(index);
    setTimeout(() => {
      setinitiateSearch(true);
    }, 1);
  };

  useEffect(() => {
    if (initiateSearch === true) {
      setsearchParams(searching.length !== 0 ? { searching } : {});
      store.dispatch(setSearchMatch({ type: search, matched: match }));
      // setinitiateSearch(false);
      // store.dispatch(setAllSearched(searching));
      // handleSearch();
      console.log("Search is true");
    }
  }, [initiateSearch]);

  useEffect(() => {
    if (searchParamsValue !== null) {
      store.dispatch(setAllSearched(searchParamsValue));
    }
  }, [searchParamsValue]);

  // The function to handle search
  const handleSearch = () => {
    setinitiateSearch(true);
  };

  // open search dialog for mobile screen
  const openSearchDialog = () => {
    store.dispatch(setMobileSearch(true));
    // setopenSearch(true);
  };

  return (
    <>
      <div ref={searchbox} className="main-search-input">
        {desktop && search === "all" && (
          <input
            type="text"
            placeholder={placeholder}
            value={
              openSugg === false && searchParamsValue !== null
                ? searchParamsValue
                : searching
            }
            style={desktop && style}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}
        {!desktop && search === "all" && (
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}

        {search !== "all" && (
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}
        <SearchRoundedIcon
          className="search-submit-button"
          onClick={handleSearch}
        />
        {/* {matched_all.length > 0 && openSugg && ( */}
        {match.length > 0 && openSugg && (
          <SearchSuggestions
            search={search}
            // matched_all={matched_all}
            match={match}
            searchbox={searchbox}
            desktop={true}
            setsearching={setsearching}
            selectedIndex={selectedIndex}
            updateInputValue={updateInputValue}
          />
        )}
      </div>
      {!mobile_search && (
        <div className="mobile-search-icon">
          <SearchRoundedIcon onClick={openSearchDialog} />
        </div>
      )}
      {mobile_search && (
        <MobileSearchDialog
          open={mobile_search}
          setOpen={openSearchDialog}
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
  match,
  searchbox,
  desktop,
  setsearching,
  selectedIndex,
  updateInputValue,
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
      {/* {console.log(matched_all)} */}
      {search === "all" && match.length > 0 && (
        <div className={desktop ? "search-sugg" : "search-sugg-m"}>
          <div className="search-sugg-top">
            {match.map((product, index) => {
              return (
                <div
                  key={product.id + product.item + product.text}
                  style={{
                    backgroundColor: index === selectedIndex ? "#e7e6e69d" : "",
                  }}
                  onClick={() => updateInputValue(index)}
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
  const [searching, setsearching] = useState("");
  const [match, setmatch] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Get some information from market in store
  // const user_data = useSelector((store) => store.user_data);
  // const { market } = user_data;
  // const { matched_all, products, brands, categories } = market;

  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { products, brands, categories } = market;

  const all = [...products, ...brands, ...categories];
  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (searching) => {
  //   // Search products, brands, categories, ....
  //   if (search === "all") {
  //     store.dispatch(setItemSearched(searching));
  //     const matchedItems = products.filter((list) =>
  //       list.item.toLowerCase().includes(searching.toLowerCase())
  //     );
  //     const matchedBrands = brands.filter((list) =>
  //       list.text.toLowerCase().includes(searching.toLowerCase())
  //     );
  //     const matchedCategories = categories.filter((list) =>
  //       list.text.toLowerCase().includes(searching.toLowerCase())
  //     );
  //     store.dispatch(
  //       setAllMatched(
  //         searching.length === 0
  //           ? []
  //           : [...matchedItems, ...matchedBrands, ...matchedCategories]
  //       )
  //     );
  //     store.dispatch(
  //       setBrandsMatched(searching.length === 0 ? [] : matchedBrands)
  //     );
  //   }
  //   // Search brands only
  //   if (search === "brands") {
  //     store.dispatch(setBrandSearched(searching));
  //     const matchedBrands = brands.filter((list) =>
  //       list.text.toLowerCase().includes(searching.toLowerCase())
  //     );
  //     store.dispatch(
  //       setBrandsMatched(searching.length === 0 ? [] : matchedBrands)
  //     );
  //   }
  // };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent className="search-dialog-content">
        {/* <div className="search-dialog-header">
          <div onClick={handleClose}>
            <ArrowBackIcon />
          </div>
          <div className="search-dialog-input">
            <input
              type="text"
              placeholder="Search products, brands and categories"
              // onChange={(e) => handleChange(e.target.value)}
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
        </div> */}
        <InputSearch
          placeholder="Search Products Brands and Categories..."
          search="all"
          searching={searching}
          setsearching={setsearching}
          items={all}
          match={match}
          setmatch={setmatch}
        />
      </DialogContent>
    </Dialog>
  );
};

// const [openSearch, setopenSearch] = useState(false);
// const [selectedIndex, setselectedIndex] = useState(-1);
// // const [selectedItem, setselectedItem] = useState("");
// const [openSugg, setopenSugg] = useState(false);
// const [arrow, setarrow] = useState("");

// const searchbox = useRef(null);

// const user_data = useSelector((store) => store.user_data);
// const { market } = user_data;
// const { mobile_search } = market;

// // const ArrowUp = useKeyPress("ArrowUp");
// // const ArrowDown = useKeyPress("ArrowDown");
// // const Enter = useKeyPress("Enter");

// // determine the pressed key
// var ArrowUp = arrow === "ArrowUp";
// var ArrowDown = arrow === "ArrowDown";
// var Enter = arrow === "Enter";

// // Set the pressed key in a state
// useEffect(() => {
//   const handleKeyDown = ({ key }) => {
//     if (key === "ArrowUp") {
//       setarrow("ArrowUp");
//     } else if (key === "ArrowDown") {
//       setarrow("ArrowDown");
//     } else if (key === "Enter") {
//       setarrow("Enter");
//     }
//   };
//   const handleKeyUp = () => {
//     setarrow("");
//   };
//   window.addEventListener("keydown", handleKeyDown);
//   window.addEventListener("keydown", handleKeyUp);
//   return () => {
//     window.removeEventListener("keydown", handleKeyDown);
//     window.removeEventListener("keydown", handleKeyUp);
//   };
// }, []);

// // Set the index of the item selected with arrow key
// useEffect(() => {
//   if (ArrowUp) {
//     if (selectedIndex > 0) {
//       setselectedIndex(selectedIndex - 1);
//     } else {
//       setselectedIndex(match.length - 1);
//     }
//   } else if (ArrowDown) {
//     if (selectedIndex < match.length - 1) {
//       setselectedIndex(selectedIndex + 1);
//     } else {
//       setselectedIndex(0);
//     }
//   } else if (Enter) {
//     updateInputValue(selectedIndex);
//   }
// }, [ArrowUp, ArrowDown, Enter]);

// // Set the item selected with arrow key
// useEffect(() => {
//   var item = match[selectedIndex]?.item;
//   var text = match[selectedIndex]?.text;
//   // setselectedItem(item ? item : text);
//   setsearching(item ? item : text);
//   // console.log(item);
//   // console.log(text);
//   console.log(selectedIndex);
// }, [selectedIndex]);

// useEffect(() => {
//   // setsearching(selectedItem);
//   // console.log(selectedItem);
//   console.log(searching);
// });

// // Input style when suggestion is on
// const style = {
//   borderRadius: match.length > 0 && openSugg ? "1rem 1rem 0 0" : "",
//   boxShadow: match.length > 0 && openSugg ? "0 -0.5rem .5rem #f1f1f1aa" : "",
// };

// // Handle input value change
// const handleChange = (searching) => {
//   setopenSugg(true);
//   setsearching(searching);

//   const matchedItems = items.filter((list) =>
//     list.item?.toLowerCase().includes(searching.toLowerCase())
//   );
//   const matchedTexts = items.filter((list) =>
//     list.text?.toLowerCase().includes(searching.toLowerCase())
//   );
//   const matched = [...matchedItems, ...matchedTexts];
//   setmatch(matched);
//   setselectedIndex(-1);
// };

// // Update input value
// const updateInputValue = (index) => {
//   // setopenSugg(false);
//   // setselectedIndex(index);
//   // handleSearch();
//   // console.log(selectedIndex);
//   // console.log(searching);
// };

// // The function to handle search
// const handleSearch = () => {
//   console.log(searching);
//   // store.dispatch(
//   //   setSearchMatch({ type: search, matched: match, searched: searching })
//   // );
// };

// // open search dialog for mobile screen
// const openSearchDialog = () => {
//   store.dispatch(setMobileSearch(true));
//   // setopenSearch(true);
// };

import React, { useEffect, useState, useRef } from "react";
import store from "../redux/store";
import {
  setCorrectedProducts,
  setFilteredProducts,
  setNarrowSidebar,
  setSelectedBrands,
  setSelectedDiscount,
  setSideBarShrink,
} from "../redux/userSlice";
import "../../css/all_products.css";
import { InputSearch } from "../header/Header";
import Product from "./Product";
import { Link } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { handleSort, setArrange } from "../redux/userSlice";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const products_cont = useRef(null);

  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const {
    products,
    filtered_products,
    arrange_type,
    brands,
    categories,
    discount,
    searched_all,
    searched_brand,
    matched_brands,
    selected_brands,
    selected_discount,
  } = market;

  // A function to filter a passed array with a passed text
  const handleFilter = (products, text, type) => {
    var filtered = [];
    if (type === "all") {
      const filteredA = products.filter((product) =>
        product.item.toLowerCase().includes(text.toLowerCase())
      );
      products.forEach((product) => {
        const filteredC = product.category.filter((cat) =>
          cat.toLowerCase().includes(text.toLowerCase())
        );
        filtered = [...filtered, ...filteredC];
      });
      filtered = [...filtered, ...filteredA];
    }
    if (type === "brand" || type === "all") {
      const filteredB = products.filter((product) =>
        product.brand.toLowerCase().includes(text.toLowerCase())
      );
      filtered = [...filtered, ...filteredB];
    }
    if (type === "discount") {
      const filteredD = products.filter((product) => product.discount >= text);
      filtered = [...filtered, ...filteredD];
    }
    return filtered;
  };

  // Set filtered products in store (dependent on searched)
  useEffect(() => {
    const searchedFiltered = handleFilter(products, searched_all, "all");
    store.dispatch(setFilteredProducts(searchedFiltered));
  }, [searched_all]);

  // Set filtered products in store (dependent on selected brands)
  useEffect(() => {
    var brandsFiltered = [];
    if (selected_brands.length > 0) {
      selected_brands.forEach((brand) => {
        const brandFiltered = handleFilter(products, brand, "brand");
        brandsFiltered = [...brandsFiltered, ...brandFiltered];
      });
      store.dispatch(setFilteredProducts(brandsFiltered));
    }
  }, [selected_brands]);

  // Set filtered products in store (dependent on selected discount)
  useEffect(() => {
    const searchedFiltered = handleFilter(
      products,
      selected_discount,
      "discount"
    );
    store.dispatch(setFilteredProducts(searchedFiltered));
  }, [selected_discount]);

  // Remove sidebar toggle arrow
  useEffect(() => {
    store.dispatch(setNarrowSidebar(true));
    store.dispatch(setSideBarShrink(true));
    document.documentElement.style.setProperty("--sidebar-width", "5.5rem");
    return () => {
      store.dispatch(setNarrowSidebar(false));
      store.dispatch(setSideBarShrink(false));
      document.documentElement.style.setProperty("--sidebar-width", "14rem");
    };
  });

  return (
    <div className="all-products">
      <div className="all-products-left">
        <div className="products-left-panel">
          <ProductsCategories categories={categories} />
          <ProductsLeftSection
            title="Brand"
            search="brands"
            input="checkbox"
            info={searched_brand ? matched_brands : brands}
          />
          <ProductsLeftSection
            title="Discount (%)"
            search="discount"
            input="radio"
            info={discount}
          />
        </div>
      </div>
      <div className="products-right-panel">
        <RightPanelHeader products_cont={products_cont} />
        <div
          ref={products_cont}
          className={`products-cont ${
            arrange_type === "list" && "products-cont-list"
          }`}
        >
          {/* {products
            .filter((product) =>
              product.item.toLowerCase().includes(searched_all.toLowerCase())
            )
            .map((product) => (
              <Product key={product.id} product_info={product} />
            ))} */}
          {filtered_products.map((product) => (
            <Product key={product.id} product_info={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

// A new Component
// Products categories component on the left panel
export const ProductsCategories = ({ categories }) => {
  return (
    <div className="left-panel-section">
      <div className="left-panel-title">
        <p>Categories</p>
      </div>
      <ul>
        {categories.map((category) => (
          <Link to="/all-products" key={category.id} className="rls">
            <li>{category.text}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

// A new component
// Products page left panel individual section component
export const ProductsLeftSection = ({ info, title, search, input }) => {
  const [searching, setsearching] = useState("");
  const [match, setmatch] = useState([...info]);
  const [checked, setchecked] = useState([]);

  // Store checked inputs in an array
  const handleChecked = (e, text) => {
    if (e.target.checked === true) {
      if (input === "checkbox") {
        setchecked([...checked, text]);
      } else if (input === "radio") {
        setchecked(text);
      }
    } else {
      if (input === "checkbox") {
        const newChecked = checked.filter((check) => check !== text);
        setchecked(newChecked);
      } else if (input === "radio") {
        setchecked(text);
      }
    }
  };

  const handleApply = () => {
    if (search === "brands") {
      store.dispatch(setSelectedBrands(checked));
    } else if (search === "discount") {
      store.dispatch(setSelectedDiscount(checked));
    }
  };

  return (
    <div className="left-panel-section">
      <div className="left-panel-title">
        <p>{title}</p>{" "}
        <button
          className="styled-button"
          onClick={handleApply}
          disabled={checked === false || checked.length === 0}
        >
          Apply
        </button>
      </div>
      {search === "brands" && (
        <div className="left-panel-search">
          <InputSearch
            placeholder="Search Brands"
            search={search}
            searching={searching}
            setsearching={setsearching}
            items={info}
            match={match}
            setmatch={setmatch}
          />
        </div>
      )}
      <div className="left-panel-checklist">
        {match.map((list) => (
          <div key={list.id}>
            <input
              id={list.text}
              type={input}
              name={list}
              onClick={(e) => handleChecked(e, list.text)}
            />
            <label htmlFor={list.text}>
              {list.text}
              {search === "discount" && "% or more"}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// A new Component
// The product page right panel header component
export const RightPanelHeader = ({ setsortId, products_cont }) => {
  const [selectSort, setselectSort] = useState(false);

  // Reference to the sort container
  const products_sort = useRef(null);

  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { products, sortType, arrange_type } = market;

  // Get total products number
  const products_found = products.length;

  // Arrange products - list or grid
  const handleArrange = (type) => {
    store.dispatch(setArrange(type));
  };

  return (
    <div className="right-panel-header">
      <div className="rph-row1">
        <p>explore phoenix market</p>
      </div>
      <div className="rph-row2">
        <div
          ref={products_sort}
          className="products-sort"
          onClick={() => setselectSort((selectSort) => !selectSort)}
        >
          <div>
            <p>
              Sort by: {sortType} <ArrowDropDownIcon />{" "}
            </p>
            <SortTypes
              setsortId={setsortId}
              selectSort={selectSort}
              setselectSort={setselectSort}
              products_sort={products_sort}
            />
          </div>
        </div>
        <div>
          <p>{`${products_found} products found`}</p>
        </div>
        <div className="products-arrange-icons">
          <div
            style={{ color: arrange_type === "grid" ? "var(--lightblue)" : "" }}
            onClick={() => handleArrange("grid")}
          >
            <ViewComfyIcon />
          </div>
          <div
            style={{ color: arrange_type === "list" ? "var(--lightblue)" : "" }}
            onClick={() => handleArrange("list")}
          >
            <ViewListIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

// A new Component
// Sort types component
export const SortTypes = ({ selectSort, setselectSort, products_sort }) => {
  const [listenerOn, setlistenerOn] = useState(false);

  // A function to handle products sort
  const handleSortType = (sort_type, sort_id) => {
    store.dispatch(handleSort({ sort_type, sort_id }));
  };

  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { sortId } = market;

  const sortTypes = [
    {
      id: 1,
      text: "Popularity",
    },
    {
      id: 2,
      text: "Newest Arrivals",
    },
    {
      id: 3,
      text: "Price: Low to High",
    },
    {
      id: 4,
      text: "Price: High to Low",
    },
    {
      id: 5,
      text: "Product Rating",
    },
  ];

  // Handle sort options display
  useEffect(() => {
    if (selectSort && !listenerOn) {
      window.addEventListener("click", (e) => {
        if (!products_sort.current.contains(e.target)) {
          setselectSort(false);
        }
      });
      setlistenerOn(true);
    } else {
      window.removeEventListener("click", () => {
        setselectSort(false);
      });
    }
    return () => {
      window.removeEventListener("click", () => {
        setselectSort(false);
      });
    };
  }, [selectSort]);

  return (
    <div>
      {selectSort && (
        <div className="products-sort-list">
          {sortTypes.map((type) => (
            <li
              key={type.id}
              onClick={() => handleSortType(type.text, type.id)}
              style={{
                backgroundColor: type.id === sortId ? "#e6e6e651" : "",
              }}
            >
              {type.text}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState, useRef } from "react";
import {
  Brands,
  Categories,
  Discount,
  All_Products,
} from "../../assets/Market";
import store from "../redux/store";
import { setNarrowSidebar, setSideBarShrink } from "../redux/userSlice";
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
  const { products, arrange_type } = market;

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
          <ProductsCategories categories={Categories} />
          <ProductsLeftSection
            title="Brand"
            search="brands"
            input="checkbox"
            info={Brands}
          />
          <ProductsLeftSection
            title="Discount Percentage"
            input="radio"
            info={Discount}
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
          {products.map((product) => (
            <Product
              key={product.id}
              product_info={product}
              // arrange={arrange}
            />
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
      <p>Categories</p>
      <ul>
        {categories.map((category) => (
          <Link to="/" key={category.id} className="rls">
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
  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { searched_brand } = market;

  return (
    <div className="left-panel-section">
      <p>{title}</p>
      {search === "brands" && (
        <div className="left-panel-search">
          <InputSearch
            placeholder="Search Brands"
            search={search}
            searched={searched_brand}
          />
        </div>
      )}
      <div className="left-panel-checklist">
        {info.map((list) => (
          <div key={list.id}>
            <input id={list.text} type={input} name={list} />
            <label htmlFor={list.text}>{list.text}</label>
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

  // Get total products number
  const products_found = All_Products.length;

  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { sortType, arrange_type } = market;

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

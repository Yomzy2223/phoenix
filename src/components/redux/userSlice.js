import { createSlice, current } from "@reduxjs/toolkit";
import {
  All_Products,
  Brands,
  Categories,
  Discount,
} from "../../assets/Market";

const DummyData = createSlice({
  name: "Comp state",
  initialState: {
    sidebar_width: "",
    sidebar_right: "",
    sidebar_back_arrow: false,
    password_visible: false,
    sidebar_is_shrink: false,
    narrow_sidebar: false,
    header_icon_clicked: "",
  },
  reducers: {
    setSidebarWidth: (state, action) => {
      state.sidebar_width = action.payload;
    },
    setSidebarRight: (state, action) => {
      state.sidebar_right = action.payload;
    },
    setSidebarBackArrow: (state, action) => {
      switch (action.payload) {
        case true: {
          state.sidebar_width = 0;
          state.sidebar_right = "";
          break;
        }
        default:
          state.sidebar_width = "";
      }
    },
    setPasswordVis: (state, action) => {
      switch (action.payload) {
        case true:
          state.password_visible = true;
          break;
        case false:
          state.password_visible = false;
          break;
        default:
          state.password_visible = false;
      }
    },
    setSideBarShrink: (state, action) => {
      state.sidebar_is_shrink = action.payload;
    },
    setNarrowSidebar: (state, action) => {
      state.narrow_sidebar = action.payload;
      // state.sidebar_is_shrink = action.payload;
    },
    setHeaderIconClicked: (state, action) => {
      state.header_icon_clicked = action.payload;
    },
  },
});
export const DummyDataReducer = DummyData.reducer;
export const {
  setSidebarWidth,
  setSidebarRight,
  setSidebarBackArrow,
  setPasswordVis,
  setSideBarShrink,
  setNarrowSidebar,
  setHeaderIconClicked,
} = DummyData.actions;

const UserData = createSlice({
  name: "User data",
  initialState: {
    fullname: "Ngozi Chwukuele",
    firstname: "Chwukuele",
    lastname: "Ngozi",
    initials: "NC",
    username: "ngozzy",
    status: "Active",
    followers: 20,
    following: 14,
    loginstatus: true,
    openSearch: false,
    cart: [],
    market: {
      sortType: "Popoularity",
      sortId: 1,
      arrange_type: "",
      mobile_search: false,
      products: All_Products,
      filtered_products: All_Products,
      brands: Brands,
      categories: Categories,
      discount: Discount,
      searched_all: "",
      matched_all: [],
      selected_brands: [],
      matched_brands: [],
      selected_category: "",
      selected_discount: "",
    },
  },
  reducers: {
    // A function to handle adding items to cart
    addToCart: (state, action) => {
      const cart_temp = state.cart;
      const incart = cart_temp.filter((item) => item.id === action.payload.id);
      if (!(incart.length > 0)) {
        const item = action.payload;
        item.quantity_selected = 1;
        state.cart.push(item);
      } else {
      }
    },

    // A function to handle removal of items from cart
    removeFromCart: (state, action) => {
      const cart_temp = state.cart;
      const new_cart = cart_temp.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = new_cart;
    },

    // Increment the quantity of an item
    incrementQuantity: (state, action) => {
      const cart_temp = state.cart;
      cart_temp.filter((item) => {
        if (item.id === action.payload.id) {
          item.quantity_selected += 1;
        }
      });
      state.cart = cart_temp;
    },

    // Decrement the quantity of am item
    decrementQuantity: (state, action) => {
      var cart_temp = state.cart;
      cart_temp.filter((item) => {
        if (item.id === action.payload.id) {
          item.quantity_selected -= 1;
          // Remove item from cart if quantity is 0
          if (item.quantity_selected === 0) {
            const new_cart = cart_temp.filter(
              (item) => item.id !== action.payload.id
            );
            cart_temp = new_cart;
          }
        }
      });
      state.cart = cart_temp;
    },

    // Set arrange_type type
    setArrange: (state, action) => {
      state.market.arrange_type = action.payload;
    },

    // A function to handle products sort
    handleSort: (state, action) => {
      const { sort_id, sort_type } = action.payload;
      const { filtered_products } = state.market;
      state.market.sortType = sort_type;
      state.market.sortId = sort_id;
      // Sort by popularity
      if (sort_id === 1) {
        const Products_Sorted = filtered_products.sort(
          (b, a) => a.total_sold - b.total_sold
        );
        state.market.filtered_products = Products_Sorted;
      }
      // Sort by newest arrivals
      else if (sort_id === 2) {
        const Products_Sorted = filtered_products.sort((b, a) => a.id - b.id);
        state.market.filtered_products = Products_Sorted;
      }
      // Sort by price: low to high
      else if (sort_id === 3) {
        const Products_Sorted = filtered_products.sort(
          (b, a) => b.new_price - a.new_price
        );
        state.market.filtered_products = Products_Sorted;
      }
      // Sort by price: high to low
      else if (sort_id === 4) {
        const Products_Sorted = filtered_products.sort(
          (b, a) => a.new_price - b.new_price
        );
        state.market.filtered_products = Products_Sorted;
      }
      // Sort by rating
      else {
        const Products_Sorted = filtered_products.sort((b, a) => {
          const b_rating_sum = b.ratings.reduce((sum, value) => sum + value, 0);
          const a_rating_sum = a.ratings.reduce((sum, value) => sum + value, 0);
          const b_rating_av = b_rating_sum / b.ratings.length;
          const a_rating_av = a_rating_sum / a.ratings.length;
          return a_rating_av - b_rating_av;
        });
        state.market.filtered_products = Products_Sorted;
      }
    },
    setAllSearched: (state, action) => {
      state.market.searched_all = action.payload;
    },
    setSelectedBrands: (state, action) => {
      state.market.selected_brands = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.market.selected_category = action.payload;
    },
    setSelectedDiscount: (state, action) => {
      state.market.selected_discount = action.payload;
    },
    setSearchMatch: (state, action) => {
      const { type, matched } = action.payload;
      if (type === "all") {
        state.market.matched_all = matched;
      } else if (type === "brands") {
        state.market.matched_brands = matched;
      }
    },
    setMobileSearch: (state, action) => {
      state.market.open_search = action.payload;
    },
    setCorrectedProducts: (state, action) => {
      state.market.products = action.payload;
      state.market.filtered_products = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.market.filtered_products = action.payload;
    },
  },
});

export const UserDataReducer = UserData.reducer;
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  handleSort,
  setArrange,
  setAllSearched,
  setSelectedBrands,
  setSelectedCategory,
  setSelectedDiscount,
  setSearchMatch,
  setMobileSearch,
  setCorrectedProducts,
  setFilteredProducts,
} = UserData.actions;

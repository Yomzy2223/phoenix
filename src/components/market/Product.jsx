import React, { useState } from "react";
import "../../css/product.css";
import Rating from "react-rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useEffect } from "react";
import store from "../redux/store";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/userSlice";
import { useSelector } from "react-redux/es/exports";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Product = ({ product_info }) => {
  var product = { ...product_info };
  let { item, info, img_src, new_price, old_price, ratings } = product;
  const [ratingSum, setratingSum] = useState(0);

  // Calculate the discount in %
  const price_cut = old_price - new_price;
  const discount = (price_cut / old_price) * 100;

  // User data information from the store
  const user_data = useSelector((store) => store.user_data);
  const { market, cart } = user_data;
  const { arrange_type } = market;

  // Sum up all ratings in the ratings array
  useEffect(() => {
    var rating_sum = 0;
    ratings.forEach((rating) => {
      rating_sum += rating;
    });
    setratingSum(rating_sum);
  });

  // Calculate the average of the summed ratings
  const average_rating = ratingSum / ratings.length;

  // Get naira format of the prices
  const new_price_NF = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(new_price);

  const old_price_NF = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(old_price);

  // Verifying item's existence in cart
  const item_check = cart.filter((item) => item.id === product.id);
  // const in_cart = item_check.length;
  const quantity_selected = item_check[0]?.quantity_selected;

  // Function to push item to cart
  const addItemToCart = () => {
    store.dispatch(addToCart(product));
  };

  // Function to increment item's quantity
  const handleIncrement = () => {
    store.dispatch(incrementQuantity(product));
  };

  // Function to decrement item's quantity
  const handleDecrement = () => {
    store.dispatch(decrementQuantity(product));
  };

  const style = {
    bottom: quantity_selected > 0 && "1rem",
    right: quantity_selected > 0 && "3%",
  };

  return (
    <div
      className={`${
        arrange_type === "list" ? "product-list product" : "product"
      }`}
    >
      <div className="product-image">
        <img src={img_src} alt={item} />
      </div>
      <div className="product-info">
        <div className="product-name">
          <p>{item}</p> {" - "}
          <span>{info}</span>
        </div>
        <p className="product-price-new">{`${new_price_NF}`}</p>
        {old_price && (
          <div className="product-price-old">
            <p>{old_price_NF}</p> <span>{`-${Math.round(discount)}%`}</span>
          </div>
        )}
        <div className="product-rating">
          <Rating
            fullSymbol={
              <div className="product-rating-fill">
                <StarIcon sx={{ fontSize: 18 }} />
              </div>
            }
            emptySymbol={
              <div className="product-rating-empty">
                <StarIcon sx={{ fontSize: 18 }} />
              </div>
            }
            initialRating={average_rating}
            readonly={true}
          />
          <span className="product-rating-total">{`(${ratings.length})`}</span>
        </div>
      </div>
      <div className="add-to-cart" style={style}>
        {quantity_selected > 0 && (
          <button
            className="styled-button b4"
            disabled={quantity_selected === 0}
            onClick={handleDecrement}
          >
            -
          </button>
        )}
        <button
          className="styled-button b4"
          onClick={addItemToCart}
          disabled={quantity_selected > 0}
          style={{ maxWidth: quantity_selected > 0 ? "60%" : "" }}
        >
          {quantity_selected > 0 ? (
            <div>
              <AddShoppingCartIcon /> <span>{quantity_selected}</span>
            </div>
          ) : (
            "Add to Cart"
          )}
        </button>
        {quantity_selected > 0 && (
          <button className="styled-button b4" onClick={handleIncrement}>
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;

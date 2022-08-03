import React, { useEffect, useRef, useState } from "react";
import { Brands, Categories, Deals } from "../../assets/Market";
import "../../css/market-main.css";
import Swiper, { Navigation, Pagination, Scrollbar } from "swiper";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const MarketMainPage = () => {
  const adInfo = [
    "hello",
    "hello",
    "hello",
    "hello",
    "hello",
    "hello",
    "hello",
  ];

  return (
    <div className="market-main">
      {/* <MarketAdvert adInfo={adInfo} /> */}
      <MarketTemp1
        title="Explore Popular Categories"
        sub_title="See all"
        info={Categories}
      />
      <MarketTemp1
        title="Explore Popular Brands"
        sub_title="See all"
        info={Brands}
        cover={Brands}
      />
      <MarketTemp1 title={Deals.title} sub_title="See all" info={Deals.info} />{" "}
    </div>
  );
};

export default MarketMainPage;

// Market page advert template component
// ----------------------------------------------------------------------
export const MarketAdvert = ({ adInfo }) => {
  const swiper = new Swiper(".swiper1", {
    effect: "fade",
    centerInsufficientSlides: true,
    modules: [Navigation, Pagination, Scrollbar],
    slidesPerView: 1,
    grabCursor: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      enabled: true,
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      clickable: true,
      el: ".swiper-pagination1",
      type: "bullets",
    },
    spaceBetween: 50,
  });
  useEffect(() => {
    swiper.init();
  }, []);

  return (
    <div className="swiper swiper1">
      <div className="swiper-wrapper">
        {adInfo.map((ad) => (
          <div className="swiper-slide">{ad}</div>
        ))}
      </div>
    </div>
  );
};

// Market template component used in the market main page
//-----------------------------------------------------------------------
export const MarketTemp1 = ({ title, sub_title, info, cover }) => {
  const [prevDisabled, setprevDisabled] = useState(false);
  const [nextDisabled, setnextDisabled] = useState(false);
  const [showNav, setshowNav] = useState(false);

  const navData = {
    prevDisabled,
    setprevDisabled,
    nextDisabled,
    setnextDisabled,
  };
  //Reference to market template
  const container = useRef(null);

  // Set when to show navigation buttons
  useEffect(() => {
    if (container.current.scrollWidth > container.current.offsetWidth) {
      setshowNav(true);
    }
  }, []);

  return (
    <div className="market-temp1">
      <MarketTemp1Title title={title} sub_title={sub_title} />
      {/* Market template one container*/}
      <div className="market-temp1-info">
        {/* Prev nav button */}
        {showNav && (
          <MarketTemp1Nav container={container} navData={navData} prev={true} />
        )}
        {/* All images section */}
        <MarketTemp1Scroll info={info} container={container} cover={cover} />
        {/* Next nav button */}
        {showNav && (
          <MarketTemp1Nav container={container} navData={navData} next={true} />
        )}
      </div>
    </div>
  );
};

// Market main page title template component
//---------------------------------------------------------------------------
export const MarketTemp1Title = ({ title, sub_title }) => {
  return (
    <div className="temp1-title">
      <p>
        <Link to="/all-products" className="rls" tabIndex={0}>
          {title}
        </Link>
      </p>
      <div className="div-y" style={{ height: "calc(1.1rem + .2vw)" }} />
      <Link to="/all-products" className="rls" tabIndex={0}>
        <p className="temp1-title-sub">
          {sub_title} <ArrowForwardIcon />
        </p>
      </Link>
    </div>
  );
};

//Prev and Next navigation button Component
//----------------------------------------------------------------------------
export const MarketTemp1Nav = ({ container, prev, next, navData }) => {
  const { prevDisabled, nextDisabled, setprevDisabled, setnextDisabled } =
    navData;

  const handlePrev = () => {
    container.current.scrollBy({
      left: 0.8 * -container.current.offsetWidth,
      behavior: "smooth",
    });
    if (container.current.scrollLeft < 0.8 * container.current.offsetWidth) {
      setprevDisabled(true);
      setnextDisabled(false);
    } else {
      setnextDisabled(false);
      setprevDisabled(false);
    }
  };

  const handleNext = () => {
    container.current.scrollBy({
      left: 0.8 * container.current.offsetWidth,
      behavior: "smooth",
    });
    if (
      container.current.scrollWidth - container.current.scrollLeft <
      1.6 * container.current.offsetWidth
    ) {
      setprevDisabled(false);
      setnextDisabled(true);
    } else {
      setprevDisabled(false);
      setnextDisabled(false);
    }
  };
  return (
    <div>
      {prev && (
        <button
          className="market-temp1-prev"
          disabled={prevDisabled}
          onClick={handlePrev}
          tabIndex={0}
        >
          <ArrowBackIosNewIcon />
        </button>
      )}
      {next && (
        <button
          className="market-temp1-next"
          disabled={nextDisabled}
          onClick={handleNext}
          tabIndex={0}
        >
          <ArrowForwardIosIcon />
        </button>
      )}
    </div>
  );
};

//X-axis Scrollable container Component
//------------------------------------------------------------------------------------
export const MarketTemp1Scroll = ({ container, info, cover }) => {
  return (
    <div ref={container} className="temp1-images">
      {info.map((infodata) => (
        <div key={infodata.id} className="temp1-image-info">
          <Link to="/all-products" className="rls" tabIndex={0}>
            <div
              className="temp1-image"
              style={{ borderRadius: infodata.new_price ? "1rem" : "100%" }}
            >
              {cover && (
                <div className="temp1-image-cover">
                  <p>{infodata.text}</p>
                </div>
              )}
              <img src={infodata.img_src} alt="" />
            </div>
          </Link>
          <Link to="/all-products" className="rls" tabIndex={0}>
            <div className="temp1-info">
              {!cover && (
                <p
                  style={{ alignSelf: infodata.new_price ? "flex-start" : "" }}
                >
                  {infodata.text}
                </p>
              )}
              {infodata.new_price ? (
                <div className="temp1-info-pricing">
                  <p>{`$${infodata.new_price}`}</p>
                  <p>
                    <span>{`$${infodata.old_price} `}</span>
                    <>{` -${infodata.off}%`}</>
                  </p>
                </div>
              ) : null}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

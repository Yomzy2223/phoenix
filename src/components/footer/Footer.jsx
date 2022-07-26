import React from "react";
import "../../css/footer.css";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import { CompanyName } from "../header/Header";

const Footer = () => {
  const bottomList = {
    one: {
      top: "Let us help you",
      body: [
        "Help Center",
        "How to shop on Phoenix",
        "Delivery options and timelines",
        "How to return a product on Phoenix",
        "Corporate and bulk purchases",
        "Report a Product",
        "Ship your package anywhere in Nigeria",
        "Dispute Resolution Policy",
      ],
    },
    two: {
      top: "About Phoenix",
      body: [
        "About us",
        "Terms and Conditions",
        "Privacy and Cookie Notice",
        "Flash Sales",
      ],
    },
    three: {
      top: "Make money with phoenix",
      body: [
        "Sell on Phoenix",
        "Become a Sales Consultant",
        "Become a Phoenix Vendor Service Provider",
        "Become a Logistics Service Partner",
      ],
    },
    mobile: [
      "Help center",
      "contact us",
      "terms & conditions",
      "become a seller",
      "report a product",
      "ship your package anywhere in nigeria",
      "black friday",
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <div id="footer-top">
        <div className="footer-company">
          <CompanyName noicon={true} color="#fffffffb" />
        </div>
        <div className="footer-subscribe">
          <p>New to phoenix?</p>
          <p>
            Subscribe to our newsletter to get updates on our latest offers!{" "}
          </p>
          <div className="footer-subscribe-main">
            <div className="bottom-email-icon">
              <EmailIcon sx={{ fontSize: 17 }} />
            </div>
            <input type="text" placeholder="Enter E-mail Address" />
            <button className="styled-button b4">Subscribe</button>
          </div>
        </div>
      </div>
      <div
        id="footer-top-m"
        className="hov-op"
        onClick={scrollToTop}
        tabIndex={0}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
        <p>Back to Top</p>
      </div>
      <div className="footer-body">
        <div className="footer-body-lists">
          <div className="footer-body-list">
            <p>{bottomList.one.top}</p>
            <ul>
              {bottomList.one.body.map((list) => (
                <Link to="/" key={list} className="rls" tabIndex={0}>
                  <li>{list}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="footer-body-list">
            <p>{bottomList.two.top}</p>
            <ul>
              {bottomList.two.body.map((list) => (
                <Link to="/" key={list} className="rls" tabIndex={0}>
                  <li>{list}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="footer-body-list">
            <p>{bottomList.three.top}</p>
            <ul>
              {bottomList.three.body.map((list) => (
                <Link to="/" key={list} className="rls" tabIndex={0}>
                  <li>{list}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <p>Join us on</p>
          <div>
            <Link to="/" className="rls" tabIndex={0}>
              <FacebookIcon />
            </Link>
            <Link to="/" className="rls" tabIndex={0}>
              <TwitterIcon />
            </Link>
            <Link to="/" className="rls" tabIndex={0}>
              <InstagramIcon />
            </Link>
            <Link to="/" className="rls" tabIndex={0}>
              <YouTubeIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-body-m">
        {bottomList.mobile.map((list) => (
          <Link to="/" key={list} className="rls" tabIndex={0}>
            <p>{list}</p>
          </Link>
        ))}
      </div>
      <div className="footer-bottom">
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;

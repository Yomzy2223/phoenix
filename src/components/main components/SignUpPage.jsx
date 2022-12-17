import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import MobileSideBar from "../sidebar/MobileSideBar";
import SignField from "../sign/SignField";

function SignUp() {
  var sidebar_width = useSelector((state) => state.dummy_data.sidebar_width);
  var sidebar_right = useSelector((state) => state.dummy_data.sidebar_right);
  var passwordVisible = useSelector(
    (state) => state.dummy_data.password_visible
  );

  return (
    <div className="sign-in">
      <MobileSideBar
        sidebar_right={sidebar_right}
        sidebar_width={sidebar_width}
      />
      <div className="sign-in__body">
        <div className="sign-in__main">
          <div className="sign-in__main-header">
            <p className="sign-in__title">Create a New Account</p>
            <p className="sign-in__sub-title">
              Have an account?{" "}
              <Link className="remove-style small-blue" to="/sign_in">
                Sign In
              </Link>
            </p>
          </div>
          <div className="sign-in__main-body">
            <SignField type="text" placeholder="first name" />
            <SignField type="text" placeholder="last name" />
            <SignField type="text" placeholder="city" />
            <SignField type="email" placeholder="email" />
            <SignField
              type={passwordVisible ? "text" : "password"}
              placeholder="password"
              field="password"
            />
            <SignField
              type={passwordVisible ? "text" : "password"}
              placeholder="confirm password"
            />
            <Link to="/" className="remove-style">
              <button type="submit" className="styled-button">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

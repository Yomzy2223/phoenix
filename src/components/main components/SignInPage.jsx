import React from "react";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import DesktopSideBar from "../sidebar/DesktopSideBar";
import MobileSideBar from "../sidebar/MobileSideBar";
import "../../css/signin.css";
import { Link } from "react-router-dom";
import SignFields from "../sign/SignField";

function SignIn() {
  var sidebar_width = useSelector((state) => state.dummy_data.sidebar_width);
  var sidebar_right = useSelector((state) => state.dummy_data.sidebar_right);
  var passwordVisible = useSelector(
    (state) => state.dummy_data.password_visible
  );
  return (
    <div className="main-container">
      <div className="sign-in">
        <MobileSideBar
          sidebar_right={sidebar_right}
          sidebar_width={sidebar_width}
        />
        <div className="sign-in__body">
          <div className="sign-in__main">
            <div className="sign-in__main-header">
              <p className="sign-in__title">Sign into your account</p>
              <p className="sign-in__sub-title">
                Don't have an account?{" "}
                <Link className="remove-style small-blue" to="/sign_up">
                  Create one
                </Link>
              </p>
            </div>
            <div className="sign-in__main-body">
              <SignFields type="email" placeholder="email" />
              <SignFields
                type={passwordVisible ? "text" : "password"}
                placeholder="password"
                field="password"
                subfield="Forgot your password"
              />
              <Link to="/" className="remove-style">
                <button type="submit" className="styled-button">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

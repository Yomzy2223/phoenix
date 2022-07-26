import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/sign_fields.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import store from "../redux/store";
import { setPasswordVis } from "../redux/userSlice";

function SignFields({ type, placeholder, subfield, field }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    store.dispatch(setPasswordVis(!passwordVisible));
  };

  return (
    <div className="sign-field">
      <input type={type} placeholder={placeholder} />
      {field === "password" ? (
        passwordVisible ? (
          <VisibilityIcon
            className="password-visibility"
            onClick={handlePasswordVisibility}
          />
        ) : (
          <VisibilityOffIcon
            className="password-visibility"
            onClick={handlePasswordVisibility}
          />
        )
      ) : null}
      <Link to="/" className="remove-style small-blue">
        {subfield}
      </Link>
    </div>
  );
}

export default SignFields;

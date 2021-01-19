import React from "react";
import "./Login.css";
import Loginform from "./Loginform";
import Mail from "@material-ui/icons/Mail";
function Login() {
  return (
    <div className="login">
      <div className="login__welcome">
        <div className="login__welcomeMessage">
          <h2>Welcome!</h2>
          <p>welcome to Todo app</p>
        </div>
        <div className="login__welcomeBy">
          <a>
            <Mail />
          </a>
          <h6>ali1saleem1hasan@gmail.com</h6>
        </div>
      </div>
      <div className="login__container">
        <Loginform />
      </div>
    </div>
  );
}

export default Login;

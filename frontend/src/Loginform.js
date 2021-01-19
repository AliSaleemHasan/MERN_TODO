import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Loginform.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
function Loginform() {
  const [type, setType] = useState("Login");
  const changeToSignup = (e) => {
    e.preventDefault();
    setType("Signup");
  };
  const changeToLogin = (e) => {
    e.preventDefault();
    setType("Login");
  };
  return type === "Login" ? (
    <div className="loginform">
      <h2>Login With</h2>
      <div className="login__Oauth">
        <button className="oauth" type="submit">
          <MailIcon />
          <p>Google</p>
        </button>

        <button className="oauth" type="submit">
          <GitHubIcon />
          <p>Github</p>
        </button>
      </div>
      <form action="">
        <input type="username" required={true} placeholder="Enter Username" />
        <input type="password" required={true} placeholder="Enter Password" />
        <button className="button1">{type.toUpperCase()}</button>

        <button className="button2" type="submit" onClick={changeToSignup}>
          Dont Have Account? Signup
        </button>
      </form>
    </div>
  ) : (
    <div className="loginform">
      <h2>{type}</h2>
      <Avatar />
      <form action="">
        <input type="text" required={true} placeholder="Enter Firstname" />
        <input type="text" required={true} placeholder="Enter Lastname" />
        <input type="username" required={true} placeholder="Enter Username" />
        <input type="password" required={true} placeholder="Enter Password" />
        <button className="button1">{type.toUpperCase()}</button>
        <ChevronRightIcon onClick={changeToLogin} />
      </form>
    </div>
  );
}

export default Loginform;

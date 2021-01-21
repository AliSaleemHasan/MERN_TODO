import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Loginform.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import handleRequests from "../handleRequests.js";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider.js";
import { actionTypes } from "../reducer";
function Loginform() {
  const [type, setType] = useState("Login");
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [firstname, SetFirstname] = useState("");
  const [lastname, SetLastname] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const changeToSignup = (e) => {
    e.preventDefault();
    setType("Signup");
    setError("");
  };
  const changeToLogin = (e) => {
    e.preventDefault();
    setType("Login");
    setError("");
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    handleRequests
      .googleOauth()
      .then((response) => console.table(response))
      .catch((err) => console.log(err));
  };

  const handleGithubLogin = (e) => {
    e.preventDefault();
    window.open("http://localhost:3000/auth/github", "_self");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    handleRequests
      .login(username, password)
      .then((response) => {
        console.log("success" + response.success);
        if (!response.success) setError(response.status);
        else {
          localStorage.setItem("_id", response.user._id);
          dispatch({
            type: actionTypes.SET_USER,
            user: response.user,
          });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
    SetUsername("");
    SetPassword("");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    handleRequests
      .signup(username, password, firstname, lastname)
      .then((response) => {
        if (!response.success) setError(response.status);
        else {
          setType("Login");
          SetUsername("");
          SetPassword("");
          SetFirstname("");
          SetLastname("");
        }
      })
      .catch((err) => console.log(err));
  };
  return type === "Login" ? (
    <div className="loginform">
      <h2>Login With</h2>
      <div className="login__Oauth">
        <button onClick={handleGoogleLogin} className="oauth" type="submit">
          <MailIcon />
          <p>Google</p>
        </button>

        <button onClick={handleGithubLogin} className="oauth" type="submit">
          <GitHubIcon />
          <p>Github</p>
        </button>
      </div>
      <form action="">
        <h3 className="error">{error}</h3>
        <input
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
          type="username"
          required={true}
          placeholder="Enter Username"
        />
        <input
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          type="password"
          required={true}
          placeholder="Enter Password"
        />
        <button
          disabled={!username || !password}
          className="button1"
          onClick={handleLogin}
        >
          {type.toUpperCase()}
        </button>

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
        <h3 className="error">{error}</h3>

        <input
          value={firstname}
          onChange={(e) => SetFirstname(e.target.value)}
          type="text"
          required={true}
          placeholder="Enter Firstname"
        />
        <input
          value={lastname}
          onChange={(e) => SetLastname(e.target.value)}
          type="text"
          required={true}
          placeholder="Enter Lastname"
        />
        <input
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
          type="username"
          required={true}
          placeholder="Enter Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          required={true}
          placeholder="Enter Password"
        />
        <button onClick={handleSignup} className="button1">
          {type.toUpperCase()}
        </button>
        <ChevronRightIcon onClick={changeToLogin} />
      </form>
    </div>
  );
}

export default Loginform;

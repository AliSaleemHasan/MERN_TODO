import React, { useState, useEffect } from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory, Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { actionTypes } from "../reducer";
import handleRequests from "../handleRequests";
function Header() {
  const [small, setsmall] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleSidebar, setToggleSideBar] = useState(false);
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");

  const textSearch = (e) => {
    e.preventDefault();

    history.push(`/search/${input}`);
    setInput("");
  };
  const logout = (e) => {
    localStorage.removeItem("user");
    handleRequests
      .logout()
      .then((response) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });

        history.push("/login");
      })
      .catch((err) => console.log(err));
  };
  const handleSmall = () => {
    setsmall(window.innerWidth < 768 ? true : false);
    //initial value of toggle is false
    if (window.innerWidth >= 768) {
      setToggle(false);
      setToggleSideBar(false);
    }
  };

  const handleToggleSideBar = () => {
    setToggleSideBar(!toggleSidebar);
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setToggleSideBar(false);
    window.addEventListener("resize", handleSmall);
    return () => window.removeEventListener("resize", handleSmall);
  }, []);
  return (
    <div className="header">
      <div className="header__left ">
        <Link to="/">
          <img
            src="https://www.freelogodesign.org/file/app/client/thumb/1d626996-4ec0-44ef-8356-1164949aa1e6_200x200.png?1610740223773"
            alt="logo"
            className="header__logo"
          />
        </Link>
      </div>
      <div className="header__center">
        <form
          action=""
          className={`header__search ${
            small && toggle ? "header_searchSM_TO" : ""
          } `}
        >
          <SearchIcon onClick={handleToggle} className="header__searchIcon" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <button onClick={textSearch} type="submit"></button>
        </form>
      </div>

      <div
        className={`header__right  ${toggleSidebar ? "header__rightTO" : " "}`}
      >
        <IconButton
          color={`${toggleSidebar ? "secondary" : "primary"}`}
          onClick={handleToggleSideBar}
        >
          <MenuIcon />
        </IconButton>
        <IconButton onClick={logout}>
          <ExitToAppIcon color="inherit" />
        </IconButton>

        <ul className="list">
          <Link to="/">
            <li>tasks</li>
          </Link>
          <Link to="/search/a">
            <li>Search</li>
          </Link>
        </ul>

        <div className="header__avatar">
          <Avatar src={user?.image ? user.image : ""}>
            {user?.image ? " " : user?.username.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Header;

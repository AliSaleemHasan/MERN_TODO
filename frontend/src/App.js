import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Login from "./components/Login.js";
import Todo from "./components/Todo.js";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import handleRequests from "./handleRequests";
import { actionTypes } from "./reducer";
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const setUserContext = async () => {
      await handleRequests.getUser().then((user1) => {
        if (user1.success) {
          localStorage.setItem("user", JSON.stringify(user1.user));
          dispatch({
            type: actionTypes.SET_USER,
            user: user1.user,
          });
        }
      });
    };
    if (!user) setUserContext();
  }, [user]);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            {localStorage.getItem("user") ? <Redirect to="/" /> : <Login />}
          </Route>

          <Route path="/search/:searchText">
            {localStorage.getItem("user") ? (
              <>
                <Header />
                <Todo type="Search" />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/">
            {localStorage.getItem("user") ? (
              <>
                <Header />
                <Todo type="Todos" />
              </>
            ) : (
              <Redirect to="login" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

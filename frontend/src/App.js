import "./App.css";
import Header from "./components/Header.js";
import Login from "./components/Login.js";
import Todo from "./components/Todo.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Todo type="Todos" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

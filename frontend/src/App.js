import "./App.css";
import Header from "./Header.js";
import Login from "./Login";
import Todo from "./Todo.js";
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
      {/* <Header />
      <Todo type="Todos" /> */}
    </div>
  );
}

export default App;

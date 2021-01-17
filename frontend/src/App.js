import "./App.css";
import Header from "./Header.js";
import Todo from "./Todo.js";
function App() {
  return (
    <div className="app">
      <Header />
      <Todo type="Todos" />
    </div>
  );
}

export default App;

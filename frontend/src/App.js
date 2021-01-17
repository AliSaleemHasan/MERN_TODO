import "./App.css";
import Header from "./Header.js";
import Todo from "./Todo";
function App() {
  return (
    <div className="app">
      <Header />
      <Todo type="Todos" />
    </div>
  );
}

export default App;

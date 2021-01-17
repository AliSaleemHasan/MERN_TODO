import React, { useState } from "react";
import "./Todo.css";
import Delete from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import Edit from "@material-ui/icons/Edit";
function Todo({ type }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const submitInput = (e) => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };
  return (
    <div className="todo">
      <h2 className="todo__title"> {type}</h2>
      <form className="todo__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="New Todo.."
        />
        <button type="submit" onClick={submitInput}></button>
      </form>

      {todos?.map((todo, index) => (
        <div className="todo__container" key={index}>
          <p className="todo__containerParagraph">{todo}</p>
          <div className="todo__containerIcons">
            <Edit />
            <Delete />
            <Checkbox color="primary" checked={false} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;

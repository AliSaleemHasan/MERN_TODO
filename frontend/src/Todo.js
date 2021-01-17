import React, { useState, useEffect } from "react";
import "./Todo.css";
import handleRequests from "./handleRequests.js";

import Delete from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";

function Todo({ type }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const submitInput = (e) => {
    e.preventDefault();
    handleRequests
      .post(input)
      .then((data1) =>
        handleRequests
          .get(`/${data1.task._id}`)
          .then((data) => {
            setTodos([...todos, data1.task]);
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));

    setInput("");
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    handleRequests
      .deleteAll()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setTodos([]);
  };

  const handleUpdate = (id) => (e) => {
    e.preventDefault();
    let updatedTodo = prompt("please enter your updated todo ");
    handleRequests
      .put(id, updatedTodo)
      .then((data1) => {
        console.log(data1);
        handleRequests
          .get("")
          .then((data) => {
            console.table(data);
            setTodos(data.tasks);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteOne = (id) => (e) => {
    e.preventDefault();
    handleRequests
      .deleteOne(id)

      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setTodos(todos.filter((todo) => todo._id != id));
  };

  useEffect(() => {
    handleRequests
      .get("")
      .then((data) => {
        setTodos(data.tasks);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="todo">
      <h2 className="todo__title"> {type}</h2>
      <div className="todo__fun">
        <form className="todo__input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="New Todo.."
          />
          <button type="submit" onClick={submitInput}></button>
        </form>

        <Button type="submit" color="secondary" onClick={handleDeleteAll}>
          DELETE ALL
        </Button>
      </div>
      {todos?.map(({ task, checked, _id }) => (
        <div className="todo__container" key={_id}>
          <p className="todo__containerParagraph">{task}</p>
          <div className="todo__containerIcons">
            <IconButton onClick={handleUpdate(_id)}>
              <Edit className="todo__icon1" />
            </IconButton>
            <IconButton onClick={handleDeleteOne(_id)}>
              <Delete className="todo__icon2" />
            </IconButton>
            <Checkbox color="primary" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;

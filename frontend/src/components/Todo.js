import React, { useState, useEffect } from "react";
import "./Todo.css";
import handleRequests from "../handleRequests.js";
import Delete from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { useStateValue } from "../StateProvider.js";
import { useParams } from "react-router-dom";
function Todo({ type }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();
  const searchText = useParams();

  const submitInput = (e) => {
    e.preventDefault();
    handleRequests
      .post(input, user?._id)
      .then((data1) => {
        setTodos([...todos, data1.task]);
      })
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

  const handleUpdate = (id, index, checked) => (e) => {
    e.preventDefault();
    let cp = [...todos];
    if (checked === undefined) {
      let updatedTodo = prompt(
        "please enter your updated todo ",
        cp[index].task
      );
      if (updatedTodo) {
        handleRequests
          .put(id, updatedTodo)
          .then((data1) => {
            console.log(data1);
          })
          .catch((err) => console.log(err));
        cp[index].task = updatedTodo;
      }
    } else {
      handleRequests
        .putCheck(id, checked)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
      cp[index].checked = checked;
    }

    setTodos(cp);
  };

  const handleDeleteOne = (id) => (e) => {
    e.preventDefault();
    handleRequests
      .deleteOne(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const getSearchTodos = () => {
    if (searchText) {
      handleRequests
        .search(searchText.searchText)
        .then((data) => {
          if (data.success) {
            setTodos(data.tasks);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const getLoggedInUserInfo = () => {
    handleRequests
      .get()
      .then((data) => {
        setTodos(data.tasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    type === "Search" ? getSearchTodos() : getLoggedInUserInfo();
  }, [user, searchText, type]);

  return (
    <div className="todo">
      <div className="todo__head">
        <h2 className="todo__title"> {type}</h2>
        <h5 className="todo__user"> {user?.username}</h5>
      </div>
      {type === "Search" ? (
        " "
      ) : (
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
      )}

      {todos?.map(({ task, checked, _id }, index) => (
        <div className="todo__container" key={_id}>
          <div className="todo__containerLeft">
            <Checkbox
              size="small"
              color="primary"
              checked={checked}
              onClick={handleUpdate(_id, index, !checked)}
            />
            <p
              className={`todo__containerParagraph ${
                checked ? "todo__containerParagraphChecked" : ""
              }`}
            >
              {task}
            </p>
          </div>
          <div className="todo__containerRight">
            <IconButton onClick={handleUpdate(_id, index)}>
              <Edit className="todo__icon1" />
            </IconButton>
            <IconButton onClick={handleDeleteOne(_id)}>
              <Delete className="todo__icon2" />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;

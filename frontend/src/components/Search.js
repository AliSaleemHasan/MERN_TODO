import React, { useEffect, useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import handleRequests from "../handleRequests";
import { Checkbox, IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
function Search() {
  const searchText = useParams();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
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
  }, []);
  return (
    <div className="search">
      {todos?.map(({ task, checked, _id }, index) => (
        <div className="todo__container" key={_id}>
          <div className="todo__containerLeft">
            <Checkbox size="small" color="primary" checked={checked} />
            <p
              className={`todo__containerParagraph ${
                checked ? "todo__containerParagraphChecked" : ""
              }`}
            >
              {task}
            </p>
          </div>
          <div className="todo__containerRight">
            <IconButton>
              <Edit className="todo__icon1" />
            </IconButton>
            <IconButton>
              <Delete className="todo__icon2" />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Search;

import React, { useContext, useEffect, useState } from "react";

import DBContext from "../../context/db";
import TodoListItem from "../TodoListItem/index";
import { Spinner } from "react-bootstrap";
import "./TodoList.css";

const TodoList = ({ match }) => {
  const [todos, setTodos] = useState([]);
  const db = useContext(DBContext);
  useEffect(() => {
    db.get("todos")((collection) =>
      collection.where("listId", "==", match.params.listId)
    ).then(setTodos);
  }, [db, match.params.listId]);
  const list = db.lists.find((list) => list.id === match.params.listId);
  if (!list) {
    return <Spinner animation="border" variant="info" className={'spinner'} />;
  }
  return (
    <div>
      <h3 className={"list-title"}>{list.title}</h3>
      <ul>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

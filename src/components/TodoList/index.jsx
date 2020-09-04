import React from "react";

import TodoListItem from "../TodoListItem/index";
import "./TodoList.css";

const TodoList = ({ todos, list, onDelete }) => {
  return (
    <div>
      <h3 className="list-title">{list.title}</h3>
      <ul>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

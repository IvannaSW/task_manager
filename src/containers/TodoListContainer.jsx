import React, { useContext, useEffect, useState } from "react";

import DBContext from "../context/db";
import { Spinner } from "react-bootstrap";

import TodoList from "../components/TodoList/index";
import TodoForm from "../components/TodoForm";

const TodoListContainer = ({ match }) => {
  const [todos, setTodos] = useState([]);
  const db = useContext(DBContext);
  useEffect(() => {
    db.getListTodos(match.params.listId).then(setTodos);
  }, [db, match.params.listId]);
  const list = db.lists.find((list) => list.id === match.params.listId);
  if (!list || !todos) {
    return <Spinner animation="border" variant="info" className={"spinner"} />;
  }
  const onAddNewTask = (title) => {
    db.createTodo({ title, listId: list.id }).then((todo) =>
      setTodos([...todos, todo])
    );
  };

  const handleDelete = (todoId) => {
    db.deleteTodo(todoId).then((todoId) => {
      setTodos([...todos.filter((t) => t.id !== todoId)]);
    });
  };

  return (
    <div className={"todoListContainer"}>
      <TodoList todos={todos} list={list} onDelete={handleDelete} />
      <TodoForm onSubmit={onAddNewTask} />
    </div>
  );
};

export default TodoListContainer;

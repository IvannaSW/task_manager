import React, { useEffect } from "react";
import useApi from "../hooks/apiHook";
import { Spinner } from "react-bootstrap";
import TodoList from "../components/TodoList/index";
import TodoForm from "../components/TodoForm";

const TodoListContainer = ({ match }) => {
  const {
    data: { lists, todos },
    actions,
  } = useApi();
  useEffect(() => {
    actions.getListTodos(match.params.listId);
  }, [actions, match.params.listId]);
  const list = lists.find((list) => list.id === match.params.listId);
  if (!list || !todos) {
    return <Spinner animation="border" variant="info" className={"spinner"} />;
  }
  const handleAddTask = (title) => {
    actions.createTodo({ title, listId: list.id });
  };

  const handleDelete = (todoId) => {
    actions.deleteTodo(todoId);
  };

  const handleUpdate = (todoId, data) => {
    actions.updateTodo(todoId, data);
  };

  return (
    <div className="todoListContainer">
      <TodoList todos={todos} list={list} onDelete={handleDelete} onUpdate={handleUpdate} />
      <TodoForm onSubmit={handleAddTask} />
    </div>
  );
};

export default TodoListContainer;

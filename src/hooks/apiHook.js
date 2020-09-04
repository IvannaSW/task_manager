import * as api from "../api";

import { useState, useEffect } from "react";

const useApi = () => {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    api.getLists().then(setLists);
  }, [lists]);

  const getLists = () => {
    return api.getLists().then(setLists);
  };

  const getListTodos = (listId) => {
    return api.getListTodos(listId).then(setTodos);
  };

  const createTodo = (data) => {
    return api.createTodo(data).then((todo) => setTodos([...todos, todo]));
  };

  const deleteTodo = (todoId) => {
    return api
      .deleteTodo(todoId)
      .then((todoId) => setTodos([...todos.filter((t) => t.id !== todoId)]));
  };

  return {
    data: {
      lists,
      todos,
    },
    actions: {
      getLists,
      getListTodos,
      createTodo,
      deleteTodo,
    },
  };
};

export default useApi;

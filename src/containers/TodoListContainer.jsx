import React, { useState } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoDetails from "../components/TodoDetails";
import useStore from "../hooks/store";
import SortMenu from "../components/SortMenu";

const TodoListContainer = ({ match }) => {
  const { state, actions } = useStore();
  const [selectedTodo, setSelectedTodo] = useState(null);
  
  const handleAddTask = (title) => {
    actions.createTodo({
      title,
      listId: list.id || "",
      userId: state.user.uid,
    });
    if(list.id){actions.updateList(list.id, {todos: ++list.todos})};   
  };

  const handleDelete = (todoId) => {
    actions.deleteTodo(todoId);
    if(list.id){actions.updateList(list.id, {todos: --list.todos})};
  };

  const handleUpdate = (todoId, data) => {
    actions.updateTodo(todoId, data);
  };

  const handleSelect = (todo) => {
    setSelectedTodo(todo);
  };

  const handleSortChange = (sort) => {
    actions.updateList(list.id, {sort});
  }

  const sortFn = {
    title: (a,b) => a.title.localeCompare(b.title),
    date: (a,b) => new Date(a.seconds*1000) - new Date(b.seconds*1000),
    important: (a,b) => b.important - a.important,
    completed: (a,b) => b.completed - a.completed,
  }

  const list = state.lists.find((list) => list.id === match.params.listId) || {
    title: "Tasks",
  };
  const path = match.path;

  const getTodosByFilter = ({
    '/': todos => todos,
    '/important': todos => todos.filter(todo => todo.important),
    '/planned': todos => todos.filter(todo => todo.dueDate)
  });

  const getTodosByList = (listId, todos) => todos.filter(todo => todo.listId === listId);

  const todos = match.params.listId ? getTodosByList(match.params.listId, state.todos): getTodosByFilter[path](state.todos);

  const sortedTodos = list.sort ? todos.slice().sort(sortFn[list.sort]) : todos;

  if (!list || !todos) {
    return <Spinner animation="border" variant="info" className={"spinner"} />;
  }

  return (
    <div className="todoListContainer">
      {list.id && <SortMenu onSortChange = {handleSortChange} />}     
      <Container>       
        <Row>
          <Col lg={8}>            
            <TodoList
              todos={sortedTodos}
              list={list}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onSelect={handleSelect}
            />
            <TodoForm onSubmit={handleAddTask} />
          </Col>
          <Col lg={4}>
            {selectedTodo && (
              <TodoDetails
                todo={selectedTodo}
                onClose={() => setSelectedTodo(null)}
              />
            )}
          </Col>          
        </Row>
      </Container>
    </div>
  );
};

export default TodoListContainer;

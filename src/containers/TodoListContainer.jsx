import React, { useEffect, useState } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoDetails from "../components/TodoDetails";
import useStore from '../hooks/store';

const TodoListContainer = ({ match }) => {
  const { state, actions } = useStore();
  const [selectedTodo, setSelectedTodo] = useState(null);
  useEffect(() => {
    setSelectedTodo(null);    
    if (match.params.listId) {
        actions.getListTodos(match.params.listId);
    } else {
        actions.getTodos();
    }
}, [actions, match.params.listId]);

  const handleAddTask = (title) => {    
    actions.createTodo({ title, listId: list.id });
  };

  const handleDelete = (todoId) => {    
    actions.deleteTodo(todoId);
  };

  const handleUpdate = (todoId, data) => {    
    actions.updateTodo(todoId, data);
  };

  const handleSelect = (todo) => {
    setSelectedTodo(todo);
  };

  const list = state.lists.find((list) => list.id === match.params.listId);
  if (!list || !state.todos) {
    return <Spinner animation="border" variant="info" className={"spinner"} />;
  }
  
  return (
    <div className="todoListContainer">
      <Container>
        <Row>
          <Col lg={8}>
            <TodoList
              todos={state.todos}
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

import React, { useEffect, useState } from "react";
import useApi from "../hooks/apiHook";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoDetails from "../components/TodoDetails";

const TodoListContainer = ({ match }) => {
  const [selectedTodo, setSelectedTodo] = useState(null);
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

  const handleSelect = (todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div className="todoListContainer">
      <Container>
        <Row>
          <Col lg={8}>
            <TodoList
              todos={todos}
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

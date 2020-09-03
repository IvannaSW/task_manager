import React from "react";
import { ListGroup, FormCheck } from "react-bootstrap";

const TodoListItem = ({ todo, onCompleteChange }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <FormCheck
          inline          
          variant='info'
          type="checkbox"
          checked={todo.completed}
          onChange={onCompleteChange}
        />
        {todo.title}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TodoListItem;

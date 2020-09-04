import React from "react";
import { ListGroup, FormCheck } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import "./TodoListItem.css";

const TodoListItem = ({ todo, onCompleteChange, onDelete }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <FormCheck
          inline
          variant="info"
          type="checkbox"
          checked={todo.completed}
          onChange={onCompleteChange}
        />
        {todo.title}
        <div className="delete-button-container" onClick={() => onDelete(todo.id)}>
          <Trash className="delete-button" />
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TodoListItem;

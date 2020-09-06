import React from "react";
import { ListGroup, FormCheck } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import "./TodoListItem.css";

const TodoListItem = ({ todo, onUpdate, onDelete }) => {
  const handleChange = ({ target: { checked } }) => { 
    onUpdate(todo.id, {completed: checked});
  }
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <FormCheck
          inline
          variant="info"
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
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

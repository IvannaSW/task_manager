import React from "react";
import { ListGroup, FormCheck } from "react-bootstrap";
import { Trash, Star, StarFill } from "react-bootstrap-icons";
import "./TodoListItem.css";

const TodoListItem = ({ todo, onUpdate, onDelete, onSelect }) => {
  const handleChange = ({ target: { checked } }) => {
    onUpdate(todo.id, { completed: checked });
  };
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="item-container">
        <FormCheck
          inline
          variant="info"
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
        />

        <span onClick={() => onSelect(todo)} className="selected-item">
          {todo.title}
        </span>       
        <div
          className="delete-button-container"
          onClick={() => onDelete(todo.id)}
        >
          <Trash className="delete-button" />
        </div>
        <div onClick={()=> onUpdate(todo.id, {important: !todo.important})} className="important-button-container" >
          {todo.important ? <StarFill className="important-button" /> : <Star className="important-button" />}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TodoListItem;

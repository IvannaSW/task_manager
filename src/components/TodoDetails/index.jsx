import React from "react";
import "./TodoDetails.css";
import { XCircle } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";

const TodoDetails = ({ todo, onClose }) => {
  return (
    <Card className="todo-details">
      <Card.Header className="details-header">
        <div className="title">Details:</div>
        <XCircle onClick={onClose} className="close-button" />
      </Card.Header>
      <Card.Body>
        <Card.Text>{todo.title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TodoDetails;

import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import "./TodoForm.css";

const TodoForm = ({onSubmit}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    debugger;
      event.preventDefault();
      onSubmit(title);
      setTitle('');
  }

  return (
    <Form onSubmit={handleSubmit} className="add-task-form">
      <Form.Row>
        <Col lg={8}>
          <Form.Control value={title} onChange={ e=> setTitle(e.target.value)} placeholder="Add new task here..." />
        </Col>
      </Form.Row>
    </Form>
  );
};

export default TodoForm;

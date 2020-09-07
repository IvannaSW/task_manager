import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {actions} from "../store";

const LoginContainer = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    actions.loginUser(login,password);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="info" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginContainer;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import useStore from "../hooks/store";

const LoginContainer = () => {
  const { actions } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogInButtonClick() {
    if (email && password) {
      actions
        .logInUser(email, password)
        .catch((error) => setError(error.message));
    }
  }

  function handleRegisterButtonClick() {
    if (email && password) {
      actions
        .registerUser(email, password)
        .catch((error) => setError(error.message));
    }
  }
  return (
    <div className="login-form-container">
      <h3 className="login-page-title">Task manager app</h3>
      <Form>
        {error && { error }}
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Button
          className="login-btn"
          variant="info"
          onClick={handleLogInButtonClick}
        >
          Login
        </Button>
        <Button
          className="logout-btn"
          variant="info"
          onClick={handleRegisterButtonClick}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default LoginContainer;

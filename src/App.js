import React from "react";
import AppDrawer from "./components/AppDrawer/index";
import AppContent from "./components/AppContent/index";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import TodoListContainer from "./containers/TodoListContainer";

import useApi from "../src/hooks/apiHook";

function App() {
  const {
    data: { lists },
  } = useApi();

  return (
    <div className="app">
      <Container>
        <Row>
          <Col>
            <header className="app-header">
              <div className="header-tagline">Task Manager</div>
            </header>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <AppDrawer lists={lists}></AppDrawer>
          </Col>
          <Col lg={9}>
            <AppContent>
              <Switch>
                <Route path="/:listId" component={TodoListContainer} />
              </Switch>
            </AppContent>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

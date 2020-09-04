import React, { useState, useEffect } from "react";
import AppDrawer from "./components/AppDrawer/index";
import AppContent from "./components/AppContent/index";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import DBContext from "./context/db";
import TodoListContainer from "./containers/TodoListContainer";
import * as api from "./api";

function App() {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    api.getLists().then(setLists);
  }, []);
  return (
    <DBContext.Provider value={{ lists, ...api }}>
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
            <Col lg={4}>
              <AppDrawer lists={lists}></AppDrawer>
            </Col>
            <Col lg={8}>
              <AppContent>
                <Switch>
                  <Route path="/:listId" component={TodoListContainer} />
                </Switch>
              </AppContent>
            </Col>
          </Row>
        </Container>
      </div>
    </DBContext.Provider>
  );
}

export default App;

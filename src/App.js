import React, { useState, useEffect } from "react";
import { get } from "./api";
import AppDrawer from "../src/components/AppDrawer/index";
import AppContent from "../src/components/AppContent/index";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import TodoList from "./components/TodoList/index";
import DBContext from "./context/db";

function App() {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    get("lists")().then(setLists);
  }, []);
  return (
    <DBContext.Provider value={{ lists, get }}>
      <div className={"app"}>
        <Container>
          <Row>
            <Col>
              <header className={"app-header"}>
                <div className={"header-tagline"}>Task Manager</div>
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
                  <Route path="/:listId" component={TodoList} />
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

import React, { useEffect } from "react";
import AppDrawer from "./components/AppDrawer/index";
import AppContent from "./components/AppContent/index";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { DoorClosed } from "react-bootstrap-icons";
import { Switch, Route } from "react-router-dom";
import TodoListContainer from "./containers/TodoListContainer";
import LoginContainer from "../src/containers/LoginContainer";
import useStore from "./hooks/store";

function App() {
  const { state, actions } = useStore();

  useEffect(() => {
    actions.initAuth();
    actions.getLists();
  }, [actions]);

  if (!state.user) {
    return <Route component={LoginContainer} />;
  } else {
    return (
      <div className="app">
        <Container>
          <Row>
            <Col>
              <header className="app-header">
                <div className="header-tagline">Task Manager</div>
                <div className="username">
                  {state.user.email}
                  <DoorClosed
                    className="logout-icon"
                    onClick={() => actions.signOutUser()}
                  />
                </div>
              </header>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <AppDrawer lists={state.lists}></AppDrawer>
            </Col>
            <Col lg={9}>
              <AppContent>
                <Switch>
                  <Route exact path="/" component={TodoListContainer} />
                  <Route exact path="/imporant" component={TodoListContainer} />
                  <Route exact path="/planned" component={TodoListContainer} />
                  <Route exact path="/login" component={LoginContainer} />
                  <Route
                    path="/:listId/:todoId?"
                    component={TodoListContainer}
                  />
                </Switch>
              </AppContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

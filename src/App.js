import React, { useEffect, useMemo, useReducer } from "react";
import AppDrawer from "./components/AppDrawer/index";
import AppContent from "./components/AppContent/index";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import TodoListContainer from "./containers/TodoListContainer";
import { reducer, initialState, actions } from "./store";
import DataContext from "./context/data";
import LoginContainer from "../src/containers/LoginContainer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);  

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    actions.getLists(dispatch);
    actions.setAuth(dispatch);
  }, []);

  if(!state.user) {
    return <LoginContainer/>
  }  

  return (
    <DataContext.Provider value={contextValue}>     
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
    </DataContext.Provider>
  );
}

export default App;

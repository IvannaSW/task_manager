import React, { useState } from "react";
import "./AppDrawer.css";
import { HouseDoor, Star, Calendar2Event, Folder } from "react-bootstrap-icons";
import { ListGroup, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useStore from "../../hooks/store";

const AppDrawer = ({ lists }) => {
  const { state, actions } = useStore();
  const [isListFormOpen, setListFormOpen] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    actions
      .createList({ title: listTitle, userId: state.user.uid })
      .then(() => {
        setListTitle("");
        setListFormOpen(false);
      });
  };
  return (
    <div>
      <ListGroup variant="flush">
        {[
          { text: "Tasks", icon: <HouseDoor />, to: "/" },
          { text: "Important", icon: <Star />, to: "/important" },
          { text: "Planned", icon: <Calendar2Event />, to: "/planned" },
        ].map((item) => (
          <ListGroup.Item key={item.text} action>
            <NavLink className="nav-link" to={item.to}>
              {item.icon} {item.text}
            </NavLink>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr className="divider" />
      <ListGroup variant="flush">
        {lists.map((list) => (
          <ListGroup.Item key={list.id} component={NavLink} to={list.id} action>
            <NavLink className="nav-link" to={list.id}>
              <Folder /> {list.title}
            </NavLink>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <div>
            {isListFormOpen ? (
              <form onSubmit={handleSubmit}>
                <input
                type="text"
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                ></input>
              </form>
            ) : (
              <Button onClick={() => setListFormOpen(true)}>
                Add new list
              </Button>
            )}
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default AppDrawer;

import React, {useContext} from "react";
import "./AppDrawer.css";
import { HouseDoor, Star, Calendar2Event, Folder } from "react-bootstrap-icons";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DataContext from '../../context/data';

const AppDrawer = ({ lists }) => {
  const {state} = useContext(DataContext);
  return (
    <div>
      <p>{state.user? state.user.email : ''}</p>
      <ListGroup variant="flush">
        {[
          { text: "Home", icon: <HouseDoor />, to: "/" },
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
      </ListGroup>
    </div>
  );
};

export default AppDrawer;

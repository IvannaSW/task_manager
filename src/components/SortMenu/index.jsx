import React from "react";
import { Dropdown } from "react-bootstrap";
import { FilterLeft } from "react-bootstrap-icons";
import './SortMenu.css';

const SortMenu = ({onSortChange}) => {
  return (
    <Dropdown className="sortMenu">
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        <FilterLeft />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item  as="button" onClick={()=>onSortChange('title')}>Sort by title</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>onSortChange('date')}>Sort by date</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>onSortChange('completed')}>Sort by completed</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>onSortChange('important')}>Sort by important</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortMenu;

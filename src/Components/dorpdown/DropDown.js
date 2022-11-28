import React from "react";
import PropTypes from "prop-types";

import "./dropdown.css";

const DropDown = ({ onSelectHandler, menuItem, name, selectedValue, id }) => {
  return (
    <div className="flex-container1">
      <span className="title-header">{name}</span>
      <select
        className="select-dropdown"
        onChange={(e) => onSelectHandler({ e, id })}
        select={selectedValue}
      >
        {menuItem?.map((data, index) => (
          <option
            value={data}
            key={`${index}_${name}`}
            className="select-dropdown--size"
          >
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

DropDown.propTypes = {
  onSelectHandler: PropTypes.func,
  menuItem: PropTypes.array,
  name: PropTypes.string,
  selectedValue: PropTypes.string,
};

export default DropDown;

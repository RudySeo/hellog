import React from "react";
import "../../scss/style.scss";

const Radio = ({ type, onChange, name, value, id }) => {
  return (
    <>
      <label className="radio">
        <input
          id={id}
          className="a11y radio__input"
          type="radio" //
          value={type}
          name={name}
          onChange={onChange}
        />
        <span className="radio__value">{type}</span>
      </label>
    </>
  );
};

export default Radio;

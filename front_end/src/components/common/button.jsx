import React from "react";
import "../../scss/style.scss";
const Button = ({ children, onClick, type }) => {
  return (
    <button
      type={type}
      className="btn" //
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

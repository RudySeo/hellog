import React from "react";
import "../../scss/style.scss";
// import Useform from "./useform";
const Postinput = ({
  title,
  value,
  placeholder,
  type,
  onChange,
  onKeyPress,
  name,
}) => {
  return (
    <>
      <div className="post">
        <h2 className="post__title">{title}</h2>
        <label htmlFor="post" className="hidden">
          post
        </label>
        <input
          className="post__input"
          name={name}
          type={type}
          onChange={onChange}
          defaultValue={value}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
        />
      </div>
    </>
  );
};

export default Postinput;

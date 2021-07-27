import React from "react";
import "../../../scss/style.scss";

const TableMealsItem = ({ meal, isopen, setisopen, setContentId }) => {
  const toggleModal = () => {
    setisopen(!isopen);
    console.log(meal._id);
    setContentId({ type: "meals", _id: meal._id });
  };
  return (
    <>
      <tr onClick={toggleModal}>
        <td>{meal.create}</td>
        <td>{meal.time}</td>
        <td>{meal.meal_type}</td>
        <td>{meal.meal_desc}</td>
        <td>{meal.calorie}</td>
      </tr>
    </>
  );
};

export default TableMealsItem;

import React from "react";

const WorkoutsItem = ({
  work, //
  setModal,
  isopen,
  setIsOpen,
  setmodalState,
}) => {
  const toggleModal = () => {
    setIsOpen(!isopen);
    setmodalState({
      type: "workout",
      _id: work._id,
    });
  };
  return (
    <tr onClick={toggleModal}>
      <td>{work.create}</td>
      <td>{work.workout_type}</td>
      <td>{work.hour}</td>
      <td>{work.workout_calorie}</td>
    </tr>
  );
};

export default WorkoutsItem;

// 리스트에 값을 만들어서 map을 해서 값을 전달해준다

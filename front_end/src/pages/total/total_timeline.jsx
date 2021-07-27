import React from "react";
import "../../scss/style.scss";
const TotalTimeline = ({
  timeLines, //
  isopen,
  setIsOpen,
  setModalState,
}) => {
  const toggleModal = () => {
    setIsOpen(!isopen);
    setModalState({ type: timeLines.type, _id: timeLines._id });
  };

  return (
    <tr onClick={toggleModal}>
      <td>
        {timeLines.type === "meals" ? (
          <i className="fas fa-apple-alt"></i>
        ) : (
          <i className="fas fa-dumbbell"></i>
        )}
      </td>
      <td>{timeLines.display_type}</td>
      <td>{timeLines.desc}</td>
      <td>{timeLines.cal}Kal</td>
      <td>{timeLines.create}</td>
    </tr>
  );
};

export default TotalTimeline;

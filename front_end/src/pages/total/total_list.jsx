import React from "react";
import "../../scss/style.scss";
const TotalList = ({ totalList, calculateList }) => {
  return (
    <div className="total__list">
      <div className="total__list__wrap">
        <ul className="total__list__items">
          <li className="total__list__hour">
            {calculateList ? calculateList[totalList.term] : ""}
          </li>
          <li className="total__list__name">{totalList.name}</li>
          <li className="total__list__turm">{totalList.term}</li>
        </ul>
      </div>
    </div>
  );
};

export default TotalList;

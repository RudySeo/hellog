import React from "react";
import "../../../scss/style.scss";
import { useSelector } from "react-redux";
import cookies from "js-cookie";
const List = (props) => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="data_list">
      <h1 className="data_list__name">
        {userData.name ? userData.name : cookies.get("name")}님의 health Log
      </h1>
      <ul className="data_list__total">
        <li>이번달 총 운동 시간</li>
        <li>이번주 총 운동 시간</li>
        <li>오늘 총 운동 시간 </li>
        <li>오늘 먹은 칼로리 총량</li>
      </ul>
    </div>
  );
};

export default List;

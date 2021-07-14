import React from "react";
import List from "./data_list/data_list";
import Meals from "./table/table_meals";
import Workout from "./table/table_workout";
import "../../scss/style.scss";

const Main = () => {
  return (
    <section className="section_padding ">
      <List />
      <div className="table">
        <Workout />
        <Meals />
      </div>
    </section>
  );
};

export default Main;

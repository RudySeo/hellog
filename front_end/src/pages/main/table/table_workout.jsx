import React, { useState, useEffect } from "react";
import WorkoutsItem from "./table_workouts_item";
import Modals from "../../../components/layout/modals/modal";
import axios from "axios";
import "../../../scss/style.scss";
const Workout = (props) => {
  const [workout, setWorkout] = useState([
    {
      create: "02.12",
      workout_type: "조깅",
      hour: "2",
      workout_calorie: "120kcal",
      _id: "1",
    },
  ]);
  const [isopen, setIsOpen] = useState(false);
  const [modalState, setmodalState] = useState({
    _id: "1",
  });
  async function fectchData() {
    try {
      const { data } = await axios.get("http://localhost:3601/api/workout", {
        withCredentials: true,
      }); //
      const workout = data.infor;

      for (let i = 0; i < workout.length; i++) {
        const item = workout[i];
        // item.id = i;
        item.create = getMD(item.create);
        item.workout_calorie = item.workout_calorie + "kal";
      }
      setWorkout(workout);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fectchData();
  }, []);

  function getMD(create) {
    const d = new Date(create);
    const md = d.getMonth() + 1 + "." + d.getDate();
    return md;
  }

  return (
    <>
      <table className="main_table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>운동 종류</th>
            <th>운동 시간</th>
            <th>소비 칼로리</th>
          </tr>
        </thead>
        <tbody>
          {workout.map((work) => (
            <WorkoutsItem
              work={work}
              key={work._id} //
              isopen={isopen}
              setIsOpen={setIsOpen}
              setmodalState={setmodalState}
            />
          ))}
        </tbody>
      </table>
      {isopen ? (
        <Modals
          isopen={isopen}
          setIsOpen={setIsOpen}
          id={modalState._id}
          type={modalState.type}
        />
      ) : null}
    </>
  );
};

export default Workout;

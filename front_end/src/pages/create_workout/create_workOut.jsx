import React from "react";
import axios from "axios";
import Button from "../../components/common/button";
import Postinput from "../../components/common/post_input";
import "../../scss/style.scss";
import Useform from "../../components/common/useform";
import { useHistory } from "react-router-dom";

const CreateWorkOut = (props) => {
  const { form, handleChange, handleSubmit, error } = Useform();
  const history = useHistory();

  const save = async (e) => {
    e.preventDefault();
    try {
      const config = { withCredentials: true };
      const infor = {
        workout_type: form.workoutType,
        hour: form.hour,
        workout_calorie: form.workoutCalorie,
      };
      // if (handleSubmit(e) === false) {
      //   return;
      // }

      await axios.post("http://localhost:3601/api/workout", infor, config);
      history.push("/total");
      alert("성공했습니다");
    } catch (error) {
      console.log(error);
      alert("실패하였습니다");
    }
  };

  return (
    <section className="create_workOut">
      <form className="create_workOut__from" onSubmit={save}>
        <Postinput
          title={"운동종류"}
          name={"workoutType"}
          value={form.workoutType}
          onChange={handleChange}
          placeholder={"운동을 입력해주세요"}
        />
        {error.workoutType && <p>{error.workoutType}</p>}
        <Postinput
          title={"운동 소요시간"}
          name={"hour"}
          value={form.hour}
          onChange={handleChange}
          placeholder={"소요시간을 입력해주세요"}
        />
        {error.hour && <p>{error.hour}</p>}
        <Postinput
          title={"소모 칼로리"}
          name={"workoutCalorie"}
          value={form.workoutCalorie}
          onChange={handleChange}
          placeholder={"소모 칼로리를 입력해주세요 ex)kcal"}
        />
        {error.workoutCalorie && <p>{error.workoutCalorie}</p>}
        <Button
          className="create_workOut__button"
          type={"submit"}
          children={"SAVE"}
        />
      </form>
    </section>
  );
};

export default CreateWorkOut;

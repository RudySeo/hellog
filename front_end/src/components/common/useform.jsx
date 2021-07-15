import { useState, useEffect } from "react";
import formValidater from "./form_validater";

const Useform = () => {
  const [form, setForm] = useState({
    // register
    email: "",
    name: "",
    id: "",
    passWord: "",
    // login
    user_id: "",
    password: "",
    username: "",
    // createMeal
    mealDesc: "",
    calorie: "",
    mealType1: "",
    mealType2: "",
    mealType3: "",
    mealType: "",
    // Workout
    workoutType: "",
    hour: "",
    workoutCalorie: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    // setError(formValidater(form));
    const result = formValidater(form, type);
    setError(result);

    console.log(result);
    if (Object.keys(result).length === 0) {
      return true;
      // 에러가 없으면
    } else {
      return false;
      // 에러
    }
  };

  return { handleChange, form, handleSubmit, error };
};

export default Useform;

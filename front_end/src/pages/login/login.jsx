import React from "react";
import Button from "../../components/common/button";
import Postinput from "../../components/common/post_input";
import { useDispatch } from "react-redux";
import { login } from "../../modules/actions";
import "../../scss/style.scss";
import Useform from "../../components/common/useform";

const Login = (e) => {
  const dispatch = useDispatch();
  const { form, handleChange, handleSubmit, error } = Useform();

  const onLoginSumit = (e) => {
    e.preventDefault();
    let userInfo = {
      user_id: form.user_id,
      password: form.password,
    };
    handleSubmit(e);
    dispatch(login(userInfo));
  };

  return (
    <section className="login">
      <form onSubmit={onLoginSumit}>
        <h1 className="login__title">LOGIN</h1>
        <Postinput
          type={"id"}
          name={"user_id"}
          value={form.user_id}
          onChange={handleChange}
          placeholder={"ID"}
        />
        <Postinput
          type={"password"}
          name={"password"}
          value={form.password}
          onChange={handleChange}
          placeholder={"PASSWORD"}
        />
        <Button type={"sumbit"} children={"LOGIN"} />
      </form>
    </section>
  );
};

export default Login;

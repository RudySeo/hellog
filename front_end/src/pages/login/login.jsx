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

  return (
    <section className="login">
      <form>
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

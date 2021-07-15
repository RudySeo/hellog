import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Button from "../../components/common/button";
import Postinput from "../../components/common/post_input";
import Useform from "../../components/common/useform";
import formValidater from "../../components/common/form_validater";
import "../../scss/style.scss";

const Register = (props) => {
  const history = useHistory();
  const { form, handleChange, handleSubmit, error } = Useform(formValidater);

  const onRegusterSumit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        withCredentials: true,
      };
      const registerInfo = {
        user_id: form.id,
        password: form.passWord,
        email: form.email,
        name: form.name,
      };
      if (handleSubmit(e, "register") === false) {
        console.log("false", "확인!!");
        return;
      }
      await axios.post("http://localhost:3601/api/users", registerInfo, config);
      alert("회원 가입을 성공 하였습니다 다시 로그인 해주세요! ");
      // inputReset();
      history.push("/login");
    } catch (err) {
      console.log(err);
      alert("회원 가입을 실패하였습니다 ");
    }
  };

  return (
    <div className="regiter">
      <form onSubmit={onRegusterSumit} className="regiter__form">
        <h1>회원가입</h1>
        <div className="div">
          <Postinput
            type={"id"}
            name={"id"}
            value={form.id}
            onChange={handleChange}
            placeholder={"ID"}
          />
          {error.id && <p>{error.id}</p>}
          <Postinput
            type={"password"}
            name={"passWord"}
            value={form.passWord}
            onChange={handleChange}
            placeholder={"password"}
          />
          {error.passWord && <p>{error.passWord}</p>}
          <Postinput
            type={"email"}
            name={"email"}
            value={form.email}
            onChange={handleChange}
            placeholder={"email"}
          />
          {error.email && <p>{error.email}</p>}
          <Postinput
            type={"name"}
            name={"name"}
            value={form.name}
            onChange={handleChange}
            placeholder={"name"}
          />
          {error.name && <p>{error.name}</p>}
          <Button type={"submit"} children={"회원가입"} />
        </div>
      </form>
    </div>
  );
};

export default Register;

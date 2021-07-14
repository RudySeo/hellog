import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { logout } from "../../../modules/actions";
import "../../../scss/style.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  const { isLoggined } = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies(["x_auth"]);

  const logoutHandler = (e) => {
    e.preventDefault();
    // 쿠키 삭제를 위하여 인자로 보내줌
    dispatch(logout(removeCookie));
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="../imgs/header_logo.png" alt="heaerder_logo" />
          </Link>
        </div>
      </div>
      <div className="header__inner">
        <div className="header__nav">
          <ul>
            <li>운동등록</li>
            <li>식단등록</li>
            <li>회원가입</li>
            <li>로그인</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

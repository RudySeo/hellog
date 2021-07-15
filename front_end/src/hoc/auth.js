import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authHandler } from "../modules/actions";

const authcheck = function (SpecificComponent, option, adminRoute = null) {
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지

  // SpecificComponent 보여줄 컴포넌트
  // option 인증이 필요한 한지 안하는지 체크
  // adminRoute 특정 사용하 type 을 넣어주기 위해

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoggined } = useSelector((state) => state.user);
    // const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
      isLoggined && dispatch(authHandler());
      // 로그인 하지 않은 상태
      // 로그인 하지 앉은 사용자가 로그인한 유저만 접속가능한 페이지에
      // 접근하면 로그인 페이지로 이동시켜라
      if (!isLoggined) {
        if (option) {
          history.push("/login");
          // setTimeout(() => alert("로그인이 필요합니다!!"), 500);
        }
      } else {
        //로그인 한 상태
        //로그인 한 유저가 로그인하지 않은 사용자만 접근 가능한 페이지에
        if (option === false) {
          history.push("/");
        }
      }
    }, [isLoggined]);

    return <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
};

export default authcheck;

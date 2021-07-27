// import axios from "axios";

// // 초기 값 설정
// const initialState = {
//   isLoggined: false,
//   userData: {},
//   // userData: {
//   // userId: "",
//   // email: "",
//   // phone: 0,
//   // nickname: "",
//   // },
// };

// // 2.action type 상수로 정리
// const LOG_IN = "user/login";
// const LOG_OUT = "user/logout";
// const AUTH = "user/auth";

// // 3.action creater 액션 생성자 함수 정의
// export const setauth = (payload) => ({ type: AUTH, payload });
// export const setlogout = () => ({ type: LOG_OUT });
// export const setlogin = () => {
//   return { type: LOG_IN };
// };

// // auth action
// export const auth = (history, option) => async (dispatch) => {
//   // console.log(a, b, state, ctx);
//   try {
//     //
//     const { data } = await axios.get("http://localhost:3601/api/users/auth", {
//       withCredentials: true,
//     });

//     /**
//      *
//      * null : 모두가능
//      * true: 인증된 사용자만 가능
//      * false : 인증 되지 않은 사용자 사용
//      */
//     dispatch(setauth(data));

//     if (option !== null) {
//       if (!option) {
//         // data.isAuth && history.push("/");
//         if (data.isAuth) {
//           history.push("/");
//         }
//       }
//     }
//   } catch (error) {
//     // console.log(error);
//     if (option !== null) {
//       if (option) {
//         history.push("/");
//       }
//     }
//   }
// };

// export const login = (history, loginInfo) => async (dispatch, getState) => {
//   try {
//     const { data } = await axios.post(
//       "http://localhost:3601/api/users/login",
//       loginInfo,
//       { withCredentials: true }
//     );
//     // 쿠키 값 X_AUTH 출력하기
//     // AXIOS CONFIG 구성 하기 (헤더에 쿠키값 넣기)
//     dispatch(setlogin());
//     alert(`${data.user.name}님이 로그인 하였습니다.`);

//     const { user: isLoggined } = getState();
//     isLoggined && history.push("/");
//   } catch (error) {
//     console.log(error);
//     alert(error.data.message);
//     // alert(`${error.data.message}님이 로그인 하였습니다.`);
//   }
// };

// // log_out 로그 아웃
// export const logout = () => async (dispatch, state) => {
//   try {
//     const response = await axios.get("http://localhost:3601/api/users/logout", {
//       withCredentials: true,
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// // 4 reducer 함수
// export default function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case LOG_IN:
//       return {
//         ...state,
//         isLoggined: true,
//       };
//     case LOG_OUT:
//       return {
//         ...state,
//         isLoggined: false,
//       };
//     case AUTH:
//       return {
//         ...state,
//         userData: {
//           ...action.payload,
//           // userId: action.payload.userId,
//           // email: action.payload.email,
//           // phone: action.payload.phone,
//           // nickname: action.payload.nickname,
//         },
//       };
//     default:
//       return state;
//   }
// }

// const response = await axios.get("http://localhost:3601/api/users/auth", {
// const data = response.data; > // const { data } = response

// const { data } = { data: {user: {}, coupon: {}}, statusCode:..., ...};
// response.data = .. // data
// response.data.user = .. // data.user
// response.data.isAuth = .. //data.isAuth

// const { data: {user, coupon} } = { data: {user: {}, coupon: {}}, statusCode:..., ...};
// response.data.user = .. // user
// response.data.coupon = .. // coupon
//  쿠키값이 없으면 THORW
// console.log(cookies);
// const iscookies = cookies;

// if (!iscookies) {
//   throw new Error("ERROR");
// }

// import { createSlice } from "@reduxjs/toolkit";
// import { authHandler } from "../actions";
// import cookies from "js-cookie";
// const initialState = {
//   isAuth: cookies.get("x_auth") !== undefined,
  
// };

// const authHandlerSlice = createSlice({
//   name: "authHandler",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) =>
//     builder
//       .addCase(authHandler.pending, (state, actions) => {})
//       .addCase(authHandler.fulfilled, (state, actions) => {
//         state.isAuth = true;

//         console.log("sucess");
//       })
//       .addCase(authHandler.rejected, (state, actions) => {
//         state.isAuth = false;

//         console.log("falied");
//       }),
// });

// export default authHandlerSlice;

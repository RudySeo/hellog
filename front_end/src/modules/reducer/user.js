import { createSlice } from "@reduxjs/toolkit";
import { login, logout, authHandler } from "../actions";
import cookies from "js-cookie";
// authHandler
const initialState = {
  isLoggined: cookies.get("x_auth") !== undefined,
  isAuth: cookies.get("x_auth") !== undefined,
  userData: { name: "", email: "", user_id: "" },
};

// || cookies.get.x_auth !=null,

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, actions) => {
        console.log(actions.payload.user);
        const { name, email, user_id } = actions.payload.user;
        state.userData = { name, email, user_id };
        cookies.set("name", name);
        state.isLoggined = true;
      })
      .addCase(login.rejected, (state, actions) => {
        state.isLoggined = false;
      })
      .addCase(logout.fulfilled, (state, actions) => {
        state.isLoggined = false;
        cookies.remove("name");
      })
      .addCase(logout.rejected, (state, actions) => {
        state.isLoggined = true;
      })

      .addCase(authHandler.fulfilled, (state, actions) => {
        state.isAuth = true;
      })
      .addCase(authHandler.rejected, (state, actions) => {
        state.isAuth = false;
      }),
});

export default userSlice;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "user/login",
  async (userInfo, thunkAPI) => {
    const { data } = await axios.post(
      "http://localhost:3601/api/users/login",
      userInfo,
      { withCredentials: true }
    );
    if (data.statusCode === 200) {
      alert(`${data.user.name}님이 로그인 하였습니다.`);
    } else {
      alert(`${data.user.name}님이 로그인 실패 하였습니다.`);
    }
    return data;
  }
);

e
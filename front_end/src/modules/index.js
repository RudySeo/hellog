import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./reducer/user";
// import authHandlerSlice from "./reducer/authhandler";
import getTotalSlice from "./reducer/timeline";

const reducer = combineReducers({
  user: userSlice.reducer,
  // auth: authHandlerSlice.reducer,
  timeInfor: getTotalSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;

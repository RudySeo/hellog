import { createSlice } from "@reduxjs/toolkit";
import { getTotal } from "../actions";

const initialState = {
  timeline: [],
  workouts: [],
  meales: [],
};

const getTotalSlice = createSlice({
  name: "getTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getTotal.pending, (state, actions) => {})
      .addCase(getTotal.fulfilled, (state, actions) => {
        // action : async api data (비동기 api를 처리한다.)
        // addCase : update state to payload data (상태를 변경한다.)
        const { mealData, workoutData } = actions.payload;
        state.workouts = workoutData;
        state.meales = mealData;
        state.timeline = [...workoutData, ...mealData];
      })
      .addCase(getTotal.rejected, (state, actions) => {}),
});

export default getTotalSlice;

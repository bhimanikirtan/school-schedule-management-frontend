import { createSlice } from "@reduxjs/toolkit";
import {
  deleteScheduleData,
  getAllScheduleData,
  getAllteacherScheduleData,
  setScheduleData,
  updateScheduleData,
} from "../thunk/scheduleThunk";

const initialState = {
  allSchedule: [],
  allteacherSchedule: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*************************************setSchedulesData**************************/
      .addCase(setScheduleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setScheduleData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setScheduleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************getAllSchedulesData**************************/
      .addCase(getAllScheduleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllScheduleData.fulfilled, (state, action) => {
        state.loading = false;
        state.allSchedule = action.payload.allSchedules;
      })
      .addCase(getAllScheduleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************getAllteacherSchedulesData**************************/
      .addCase(getAllteacherScheduleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllteacherScheduleData.fulfilled, (state, action) => {
        state.loading = false;
        state.allteacherSchedule = action.payload.allteacherSchedule;
      })
      .addCase(getAllteacherScheduleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************updateSchedulesData**************************/
      .addCase(updateScheduleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScheduleData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateScheduleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************deleteSchedulesData**************************/
      .addCase(deleteScheduleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteScheduleData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteScheduleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default scheduleSlice.reducer;

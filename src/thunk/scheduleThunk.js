import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteScheduleAPI,
  getAllScheduleAPI,
  setScheduleAPI,
  updateScheduleAPI,
} from "../apis/scheduleAPI";

export const setScheduleData = createAsyncThunk(
  "schedule/setSchedule",
  async (values) => {
    try {
      console.log(values);

      const response = await setScheduleAPI(values);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const getAllScheduleData = createAsyncThunk(
  "schedule/getAllSchedule",
  async () => {
    try {
      const response = await getAllScheduleAPI();
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const updateScheduleData = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ id, teacherId,title, start, end }) => {
    try {
      console.log(start, "+++++++++++++");
      console.log(end, "________________");

      const response = await updateScheduleAPI({ id, teacherId,title, start, end });
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const deleteScheduleData = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id) => {
    try {
      const response = await deleteScheduleAPI(id);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);

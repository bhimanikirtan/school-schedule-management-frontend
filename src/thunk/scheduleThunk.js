import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteScheduleAPI,
  getAllScheduleAPI,
  getAllteacherScheduleAPI,
  setScheduleAPI,
  updateScheduleAPI,
} from "../apis/scheduleAPI";

export const setScheduleData = createAsyncThunk(
  "schedule/setSchedule",
  async (values, { rejectWithValue }) => {
    try {
      const response = await setScheduleAPI(values);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to add schedule");
    }
  }
);

export const getAllScheduleData = createAsyncThunk(
  "schedule/getAllSchedule",
  async (teacherId, { rejectWithValue }) => {
    try {
      const response = await getAllScheduleAPI(teacherId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch schedules");
    }
  }
);

export const getAllteacherScheduleData = createAsyncThunk(
  "schedule/getAllteacherSchedule",
  async () => {
    try {
      const response = await getAllteacherScheduleAPI();
      return response;
    } catch (error) {
      return error.response || "Failed to fetch teacher schedules";
    }
  }
);

export const updateScheduleData = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateScheduleAPI({
        id,
        values,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to update schedule");
    }
  }
);

export const deleteScheduleData = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteScheduleAPI(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to delete schedule");
    }
  }
);

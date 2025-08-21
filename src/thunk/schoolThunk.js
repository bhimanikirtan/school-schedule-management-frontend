import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTeachersAPI } from "../apis/schoolAPI";

export const getAllTeachersData = createAsyncThunk(
  "school/getAllteachers",
  async ({ rejectWithValue }) => {
    try {
      const response = await getAllTeachersAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);

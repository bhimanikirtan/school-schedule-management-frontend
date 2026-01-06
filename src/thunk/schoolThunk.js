import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTeachersAPI } from "../apis/schoolAPI";

export const getAllTeachersData = createAsyncThunk(
  "school/getAllteachers",
  async () => {
    try {
      const response = await getAllTeachersAPI();
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);

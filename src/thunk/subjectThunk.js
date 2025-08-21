import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSubjectAPI,
  deleteSubjectAPI,
  getAllSubjectAPI,
  updateSubjectAPI,
} from "../apis/subjectAPI";

export const addSubjectData = createAsyncThunk(
  "subject/addSubject",
  async (values, { rejectWithValue }) => {
    try {
      const response = await addSubjectAPI(values);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);
export const getAllSubjectData = createAsyncThunk(
  "subject/getAllSubject",
  async () => {
    try {
      const response = await getAllSubjectAPI();
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const updateSubjectData = createAsyncThunk(
  "subject/updateSubject",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectAPI({ id, values });
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);
export const deleteSubjectData = createAsyncThunk(
  "subject/deleteSubject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteSubjectAPI(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);

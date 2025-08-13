import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSubjectAPI,
  deleteSubjectAPI,
  getAllSubjectAPI,
  updateSubjectAPI,
} from "../apis/subjectAPI";

export const addSubjectData = createAsyncThunk(
  "subject/addSubject",
  async (values) => {
    try {
      const response = await addSubjectAPI(values);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
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
  async ({ id, values }) => {
    try {
      console.log(id);
      console.log(values);

      const response = await updateSubjectAPI({ id, values });
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const deleteSubjectData = createAsyncThunk(
  "subject/deleteSubject",
  async (id) => {
    try {
      const response = await deleteSubjectAPI(id);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);

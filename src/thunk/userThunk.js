import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  schoolRegisterAPI,
  sendEmailAPI,
  teacherRegisterAPI,
} from "../apis/userAPI";

export const schoolRegisterData = createAsyncThunk(
  "user/schoolRegister",
  async (values) => {
    try {
      const response = await schoolRegisterAPI(values);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const loginData = createAsyncThunk("user/login", async (values) => {
  try {
    const response = await loginAPI(values);
    return response;
  } catch (error) {
    return error.response || "Failed to fetch Products";
  }
});
export const sendEmailData = createAsyncThunk(
  "user/sendEmail",
  async (email) => {
    try {
      const response = await sendEmailAPI(email);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
export const teacherRegisterData = createAsyncThunk(
  "user/teacherRegister",
  async (values) => {
    try {
      const response = await teacherRegisterAPI(values);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);

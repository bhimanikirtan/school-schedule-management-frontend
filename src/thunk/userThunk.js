import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  schoolLoginAPI,
  schoolRegisterAPI,
  sendEmailAPI,
  teacherLoginAPI,
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
export const schoolLoginData = createAsyncThunk(
  "user/schoolLogin",
  async (values) => {
    try {
      const response = await schoolLoginAPI(values);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);
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
export const teacherLoginData = createAsyncThunk(
  "user/teacherLogin",
  async (values) => {
    try {
      const response = await teacherLoginAPI(values);
      return response;
    } catch (error) {
      return error.response || "Failed to fetch Products";
    }
  }
);

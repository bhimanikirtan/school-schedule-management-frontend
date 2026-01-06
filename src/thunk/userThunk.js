import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserAPI,
  loginAPI,
  schoolRegisterAPI,
  sendEmailAPI,
  teacherRegisterAPI,
  updateProfileAPI,
} from "../apis/userAPI";

export const schoolRegisterData = createAsyncThunk(
  "user/schoolRegister",
  async (values, { rejectWithValue }) => {
    try {
      const response = await schoolRegisterAPI(values);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);
export const loginData = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await loginAPI(values);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);
export const sendEmailData = createAsyncThunk(
  "user/sendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendEmailAPI(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);
export const teacherRegisterData = createAsyncThunk(
  "user/teacherRegister",
  async (values, { rejectWithValue }) => {
    try {
      const response = await teacherRegisterAPI(values);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);
export const fetchUserData = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await fetchUserAPI();
    return response;
  } catch (error) {
    return error.response || "Failed to fetch Products";
  }
});
export const updateProfileData = createAsyncThunk(
  "user/updateProfile",
  async (values, { rejectWithValue }) => {
    try {
      const response = await updateProfileAPI(values);
      return response;
    } catch (error) {
      return rejectWithValue(error.response || "Failed to fetch Products");
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { schoolLoginAPI, schoolRegisterAPI } from "../apis/userAPI";

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

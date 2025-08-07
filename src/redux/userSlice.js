import { createSlice } from "@reduxjs/toolkit";
import {
  schoolLoginData,
  schoolRegisterData,
  sendEmailData,
  teacherLoginData,
  teacherRegisterData,
} from "../thunk/userThunk";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*************************************schoolRegisterData**************************/
      .addCase(schoolRegisterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(schoolRegisterData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(schoolRegisterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************schoolLoginData**************************/
      .addCase(schoolLoginData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(schoolLoginData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(schoolLoginData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })

      /*************************************sendemailData**************************/
      .addCase(sendEmailData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************teacherRegisterData**************************/
      .addCase(teacherRegisterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teacherRegisterData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(teacherRegisterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************teacherLoginData**************************/
      .addCase(teacherLoginData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teacherLoginData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(teacherLoginData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default userSlice.reducer;

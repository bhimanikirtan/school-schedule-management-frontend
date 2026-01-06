import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserData,
  loginData,
  schoolRegisterData,
  sendEmailData,
  teacherRegisterData,
  updateProfileData,
} from "../thunk/userThunk";

const initialState = {
  user: null,
};

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
      .addCase(loginData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginData.rejected, (state, action) => {
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
      /*************************************fetchUserData**************************/
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.fetchUser;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************updateProfileData**************************/
      .addCase(updateProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default userSlice.reducer;

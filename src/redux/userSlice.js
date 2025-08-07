import { createSlice } from "@reduxjs/toolkit";
import { schoolLoginData, schoolRegisterData } from "../thunk/userThunk";

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
      });
  },
});

export default userSlice.reducer;

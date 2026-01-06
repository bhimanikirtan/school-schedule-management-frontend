import { createSlice } from "@reduxjs/toolkit";
import { getAllTeachersData } from "../thunk/schoolThunk";

const initialState = {
  allTeachers: [],
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*************************************getAllteachersData**************************/
      .addCase(getAllTeachersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeachersData.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeachers = action.payload.allTeachers;
      })
      .addCase(getAllTeachersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default schoolSlice.reducer;

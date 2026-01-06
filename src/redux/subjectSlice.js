import { createSlice } from "@reduxjs/toolkit";
import {
  addSubjectData,
  deleteSubjectData,
  getAllSubjectData,
  updateSubjectData,
} from "../thunk/subjectThunk";

const initialState = {
  allSubjects: [],
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*************************************addSubjectData**************************/
      .addCase(addSubjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubjectData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addSubjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************getAllSubjectsData**************************/
      .addCase(getAllSubjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubjectData.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubjects = action.payload.allSubjects;
      })
      .addCase(getAllSubjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************updateSubjectData**************************/
      .addCase(updateSubjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubjectData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSubjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      })
      /*************************************deleteSubjectData**************************/
      .addCase(deleteSubjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubjectData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSubjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching Products";
      });
  },
});

export default subjectSlice.reducer;

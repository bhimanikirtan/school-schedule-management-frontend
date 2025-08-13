import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import schoolReducer from "../redux/schoolSlice";
import scheduleReducer from "../redux/scheduleSlice";
import subjectReducer from "../redux/subjectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    school: schoolReducer,
    schedule: scheduleReducer,
    subject: subjectReducer,
  },
});

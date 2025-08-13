import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import schoolReducer from "../redux/schoolSlice";
import scheduleReducer from "../redux/scheduleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    school: schoolReducer,
    schedule: scheduleReducer,
  },
});

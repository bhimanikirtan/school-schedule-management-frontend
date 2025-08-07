import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import schoolReducer from "../redux/schoolSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    school: schoolReducer,
  },
});

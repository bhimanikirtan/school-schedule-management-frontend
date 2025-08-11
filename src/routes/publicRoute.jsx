import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../thunk/userThunk";

export const PublicRoute = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  if (token && user?.role === "school") {
    return <Navigate to="/school/schoolDashboard" />;
  } else if (token && user?.role === "teacher") {
    return <Navigate to="/teacher/teacherDashboard" />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;

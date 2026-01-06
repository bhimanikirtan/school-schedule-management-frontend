import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import SchoolRegister from "./school/schoolRegister";
import Home from "./pages/Home";
import SchoolDashboard from "./school/schoolDashboard";
import ManageTeacher from "./school/manageTeacher";
import TeacherRegister from "./teacher/teacherRegister";
import TeacherDashboard from "./teacher/teacherDashboard";
import Login from "./pages/login";
import SchoolLayout from "./layout/schoolLayout";
import TeacherLayout from "./layout/teacherLayout";
import TeacherProfilePage from "./teacher/teacherProfile";
import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";
import SchoolProfile from "./school/schoolProfile";
import ManageSchedule from "./school/manageSchedule";
import ManageteacherSchedule from "./teacher/manageteacherSchedule";
import ManageSubjects from "./school/manageSubjects";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacherRegister" element={<TeacherRegister />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PublicRoute />}>
            <Route path="/schoolRegister" element={<SchoolRegister />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<TeacherLayout />}>
              <Route
                path="/teacher/teacherDashboard"
                element={<TeacherDashboard />}
              />
              <Route
                path="/teacher/teacherProfile"
                element={<TeacherProfilePage />}
              />
              <Route
                path="/teacher/manageteacherSchedule"
                element={<ManageteacherSchedule />}
              />
            </Route>
            <Route element={<SchoolLayout />}>
              <Route
                path="/school/schoolDashboard"
                element={<SchoolDashboard />}
              />
              <Route path="/school/manageTeacher" element={<ManageTeacher />} />
              <Route
                path="/school/manageSubjects"
                element={<ManageSubjects />}
              />
              <Route
                path="/school/manageSchedule"
                element={<ManageSchedule />}
              />
              <Route path="/school/schoolProfile" element={<SchoolProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

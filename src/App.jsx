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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schoolRegister" element={<SchoolRegister />} />
          <Route path="/teacherRegister" element={<TeacherRegister />} />
          <Route element={<TeacherLayout />}>
            <Route
              path="/teacher/teacherDashboard"
              element={<TeacherDashboard />}
            />
          </Route>
          <Route element={<SchoolLayout />}>
            <Route
              path="/school/schoolDashboard"
              element={<SchoolDashboard />}
            />
            <Route path="/school/manageTeacher" element={<ManageTeacher />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

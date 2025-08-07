import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import SchoolLogin from "./pages/schoolLogin";
import SchoolRegister from "./pages/schoolRegister";
import Home from "./pages/Home";
import SchoolDashboard from "./school/schoolDashboard";
import ManageTeacher from "./school/manageTeacher";
import TeacherRegister from "./teacher/teacherRegister";
import Teacherlogin from "./teacher/teacherlogin";
import TeacherDashboard from "./teacher/teacherDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schoolLogin" element={<SchoolLogin />} />
          <Route path="/schoolRegister" element={<SchoolRegister />} />
          <Route path="/schoolDashboard" element={<SchoolDashboard />} />
          <Route path="/manageTeacher" element={<ManageTeacher />} />
          <Route path="/teacherRegister" element={<TeacherRegister />} />
          <Route path="/teacherLogin" element={<Teacherlogin />} />
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

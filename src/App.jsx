import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import SchoolLogin from "./pages/schoolLogin";
import SchoolRegister from "./pages/schoolRegister";
import Home from "./pages/Home";
import SchoolDashboard from "./school/schoolDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schoolLogin" element={<SchoolLogin />} />
          <Route path="/schoolRegister" element={<SchoolRegister />} />
          <Route path="/schoolDashboard" element={<SchoolDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

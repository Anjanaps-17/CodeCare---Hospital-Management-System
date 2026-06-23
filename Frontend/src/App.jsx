import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "../src/components/Auth/login";
import Dashboard from "./pages/Dashboard";
import Signup from "../src/components/Auth/Signup";
import AddPatient from "./Pages/Receptionist/AddPatient";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import ReceptionistDashboard from "./Pages/Dashboard/ReceptionistDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/doctor/dashboard" element={<DoctorDashboard />} /> */}
        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
        {/* <Route path="/lab/dashboard" element={<LabDashboard />} /> */}
        <Route
          path="/receptionist/add-patient"
          element={<AddPatient />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
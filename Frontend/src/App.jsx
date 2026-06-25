import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Login from "../src/components/Auth/login";
import Signup from "../src/components/Auth/Signup";

import AddPatient from "./Pages/Receptionist/AddPatient";
import BookAppointment from "./Pages/Receptionist/BookAppointment";
import UpdatePatient from "./Pages/Receptionist/UpdatePatient";
import VerifyQR from "./Pages/Receptionist/VerifyQR";
import DoctorAvailability from "./Pages/Receptionist/DoctorAvailability";

import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import DoctorDashboard from "./Pages/Dashboard/DoctorDashboard";
import ReceptionistDashboard from "./Pages/Dashboard/ReceptionistDashboard";
import LabDashboard from "./Pages/Dashboard/LabtechDashboard";

import Users from "./Pages/Admin/Users";
import AddUser from "./Pages/Admin/AddUser";
import EditUser from "./Pages/Admin/EditUser";

import Doctors from "./Pages/Admin/Doctor";
import AddDoctor from "./Pages/Admin/AddDoctor";
import EditDoctor from "./Pages/Admin/EditDoctor";

import Departments from "./Pages/Admin/Departments";
import AddDepartment from "./Pages/Admin/AddDepartment";
import EditDepartment from "./Pages/Admin/EditDepartment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route
          path="/receptionist/dashboard"
          element={<ReceptionistDashboard />}
        />
        <Route path="/lab/dashboard" element={<LabDashboard />} />

        {/* Receptionist */}
        <Route path="/receptionist/add-patient" element={<AddPatient />} />
        <Route path="/receptionist/book-appointment" element={<BookAppointment />} />
        <Route path="/receptionist/update-patient" element={<UpdatePatient />} />
        <Route path="/receptionist/doctor-availability" element={<DoctorAvailability />} />
        
        {/* User Management */}
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users/edit/:id" element={<EditUser />} />

        {/* Doctor Management */}
        <Route path="/admin/doctors" element={<Doctors />} />
        <Route path="/admin/doctors/add" element={<AddDoctor />} />
        <Route path="/admin/doctors/edit/:id" element={<EditDoctor />} />
        <Route path="/receptionist/scan-qr" element={<VerifyQR />} />

        {/* Department Management */}
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/departments/add" element={<AddDepartment />} />
        <Route
          path="/admin/departments/edit/:id"
          element={<EditDepartment />}
        />
      </Routes>
       {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
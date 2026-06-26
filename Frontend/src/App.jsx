import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Auth
import Login from "./components/Auth/login";
// import Signup from "./components/Auth/Signup";

// Dashboards
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import DoctorDashboard from "./Pages/Dashboard/DoctorDashboard";
import ReceptionistDashboard from "./Pages/Dashboard/ReceptionistDashboard";
import LabDashboard from "./Pages/Dashboard/LabtechDashboard";

// Admin - Users
import Users from "./Pages/Admin/Users";
import AddUser from "./Pages/Admin/AddUser";
import EditUser from "./Pages/Admin/EditUser";

// Admin - Doctors
import Doctors from "./Pages/Admin/Doctor";
import AddDoctor from "./Pages/Admin/AddDoctor";
import EditDoctor from "./Pages/Admin/EditDoctor";

// Admin - Departments
import Departments from "./Pages/Admin/Departments";
import AddDepartment from "./Pages/Admin/AddDepartment";
import EditDepartment from "./Pages/Admin/EditDepartment";

// Receptionist
import AddPatient from "./Pages/Receptionist/AddPatient";
import BookAppointment from "./Pages/Receptionist/BookAppointment";
import UpdatePatient from "./Pages/Receptionist/UpdatePatient";
import VerifyQR from "./Pages/Receptionist/VerifyQR";
import DoctorAvailability from "./Pages/Receptionist/DoctorAvailability";
import CancelAppointment from "./Pages/Receptionist/CancelAppointment";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          {/* Dashboards */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route
            path="/receptionist/dashboard"
            element={<ReceptionistDashboard />}
          />
          <Route path="/lab/dashboard" element={<LabDashboard />} />

          {/* Receptionist */}
          <Route
            path="/receptionist/add-patient"
            element={<AddPatient />}
          />
          <Route
            path="/receptionist/book-appointment"
            element={<BookAppointment />}
          />
          <Route
            path="/receptionist/update-patient"
            element={<UpdatePatient />}
          />
          <Route
            path="/receptionist/doctor-availability"
            element={<DoctorAvailability />}
          />
          <Route
            path="/receptionist/scan-qr"
            element={<VerifyQR />}
          />
          <Route
            path="/receptionist/cancel-appointment"
            element={<CancelAppointment />}
          />

          {/* User Management */}
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/users/edit/:id" element={<EditUser />} />

          {/* Doctor Management */}
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/doctors/add" element={<AddDoctor />} />
          <Route path="/admin/doctors/edit/:id" element={<EditDoctor />} />

          {/* Department Management */}
          <Route path="/admin/departments" element={<Departments />} />
          <Route
            path="/admin/departments/add"
            element={<AddDepartment />}
          />
          <Route
            path="/admin/departments/edit/:id"
            element={<EditDepartment />}
          />
        </Routes>
      </BrowserRouter>

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
    </>
  );
}

export default App;
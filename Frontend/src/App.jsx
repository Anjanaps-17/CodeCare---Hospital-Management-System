import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "./components/Auth/login";

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
import AdminReports from "./Pages/Admin/Reports";

// Receptionist
import AddPatient from "./Pages/Receptionist/AddPatient";
import BookAppointment from "./Pages/Receptionist/BookAppointment";
import UpdatePatient from "./Pages/Receptionist/UpdatePatient";
import VerifyQR from "./Pages/Receptionist/VerifyQR";

import Home from "./Pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Doctor Dashboard */}
          <Route
            path="/doctor/dashboard"
            element={<DoctorDashboard />}
          />

          {/* Lab Dashboard */}
          <Route
            path="/lab/dashboard"
            element={<LabDashboard />}
          />

          {/* Receptionist Dashboard */}
          <Route
            path="/receptionist/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Receptionist"]}>
                <ReceptionistDashboard />
              </ProtectedRoute>
            }
          />

          {/* Receptionist Pages */}
          <Route
            path="/receptionist/add-patient"
            element={
              <ProtectedRoute allowedRoles={["Receptionist"]}>
                <AddPatient />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/book-appointment"
            element={
              <ProtectedRoute allowedRoles={["Receptionist"]}>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/update-patient"
            element={
              <ProtectedRoute allowedRoles={["Receptionist"]}>
                <UpdatePatient />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/scan-qr"
            element={
              <ProtectedRoute allowedRoles={["Receptionist"]}>
                <VerifyQR />
              </ProtectedRoute>
            }
          />

          {/* Admin Users */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users/add"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AddUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />

          {/* Admin Doctors */}
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Doctors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/doctors/add"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AddDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/doctors/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDoctor />
              </ProtectedRoute>
            }
          />

          {/* Admin Departments */}
          <Route
            path="/admin/departments"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Departments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments/add"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AddDepartment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDepartment />
              </ProtectedRoute>
            }
          />

          {/* Admin Reports */}
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminReports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
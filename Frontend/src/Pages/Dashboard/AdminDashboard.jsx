import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalDepartments: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return res.json();
      })
      .then((data) => {
        setDashboardData(data.data);
      })
      .catch((err) => {
        console.log("Dashboard Error:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">

        {/* Sidebar */}
        <div className="col-md-2 sidebar vh-100">
          <h4 className="text-center text-white mt-4 mb-4">
            NAVIGATION
          </h4>

          <ul className="list-group list-group-flush">

            <li
              className="list-group-item fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/users")}
            >
               Users
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/doctors")}
            >
              🩺 Doctors
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/departments")}
            >
               Departments
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/reports")}
            >
              🧾 Reports
            </li>

            <li
              className="list-group-item text-danger fw-bold"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </li>

          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">

          <h1 className="text-center mb-4">
            ADMIN DASHBOARD
          </h1>

          {/* Welcome Card */}
          <div className="card shadow mb-4">
            <div className="card-body text-center">
              <h3>Welcome Admin!!!</h3>
              <p className="mb-0">
                Manage doctors, users, departments and reports from one place.
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row g-4 mb-5">

            <div className="col-md-4">
              <div className="card bg-primary text-white shadow h-100">
                <div className="card-body text-center">
                  <h5>Total Users</h5>
                  <h1>{dashboardData.totalUsers}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-success text-white shadow h-100">
                <div className="card-body text-center">
                  <h5>Total Doctors</h5>
                  <h1>{dashboardData.totalDoctors}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-warning text-dark shadow h-100">
                <div className="card-body text-center">
                  <h5>Total Departments</h5>
                  <h1>{dashboardData.totalDepartments}</h1>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Access */}
          <div className="card shadow mb-4">
            <div className="card-body text-center">

              <h4 className="mb-4">
                Quick Access
              </h4>

              <div className="d-flex flex-wrap justify-content-center gap-3">

                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/admin/users")}
                >
                  User Management
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => navigate("/admin/doctors")}
                >
                  Doctor Management
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/admin/departments")}
                >
                  Department Management
                </button>

                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/admin/reports")}
                >
                  Reports
                </button>

              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="card shadow">
            <div className="card-body text-center">
              <h5>CodeCare Hospital Management System</h5>
              <p className="mb-0">
                Admin Control Panel
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
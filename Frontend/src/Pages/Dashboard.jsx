import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalDoctors: 0,
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
        setDashboardData(data);
      })
      .catch((err) => {
        console.log("Dashboard Error:", err);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        
        {/* Sidebar */}
        <div className="col-md-2 bg-light vh-100 border-end">
          <h5 className="text-center mt-4 mb-4">
            NAVIGATION
          </h5>

          <ul className="list-group list-group-flush">
            <li className="list-group-item fw-bold">
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
              Doctors
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/reports")}
            >
              Reports
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h2 className="mb-4">
            ADMIN DASHBOARD
          </h2>

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h6>Total Users</h6>
                  <h3>{dashboardData.totalUsers}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h6>Total Doctors</h6>
                  <h3>{dashboardData.totalDoctors}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <h5 className="mb-3">
            QUICK ACCESS
          </h5>

          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/admin/users")}
            >
              User Management
            </button>

            <button
              className="btn btn-outline-success"
              onClick={() => navigate("/admin/doctors")}
            >
              Doctor Management
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/admin/reports")}
            >
              Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
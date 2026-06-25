import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardFooter from "../Dashboard/DashboardFooter";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalDepartments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await res.json();

        setDashboardData({
          totalUsers: data?.data?.totalUsers ?? 0,
          totalDoctors: data?.data?.totalDoctors ?? 0,
          totalDepartments: data?.data?.totalDepartments ?? 0,
        });
      } catch (err) {
        setError(err.message);
        console.log("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid p-0">
        <div className="row g-0">

          {/* Sidebar */}
          <div className="col-md-2 sidebar min-vh-100">
            <h4 className="text-center text-white mt-4 mb-4">
              NAVIGATION
            </h4>

            <ul className="list-group list-group-flush">

              <li className="list-group-item fw-bold" onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </li>

              <li className="list-group-item" onClick={() => navigate("/admin/users")}>
                Users
              </li>

              <li className="list-group-item" onClick={() => navigate("/admin/doctors")}>
                🩺 Doctors
              </li>

              <li className="list-group-item" onClick={() => navigate("/admin/departments")}>
                Departments
              </li>

              <li className="list-group-item" onClick={() => navigate("/admin/reports")}>
                🧾 Reports
              </li>

              <li className="list-group-item text-danger fw-bold" onClick={handleLogout}>
                Logout
              </li>

            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">
          <h1 className="text-center fw-bold text-theme mb-4">
   Admin Dashboard
</h1>

            {/* Loading / Error */}
            {loading && (
              <div className="text-center">
                <h5>Loading dashboard...</h5>
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Welcome Card */}
                <div className="card shadow mb-4">
                  <div className="card-body text-center">
                    <h3 className="fw-bold">
   Welcome Back, Admin
</h3>
                    <p className="mb-0">
                      Manage doctors, users, departments and reports from one place.
                    </p>
                  </div>
                </div>

               {/* Stats */}
<div className="row g-4 mb-5">

  <div className="col-md-4">
    <div className="stats-card users-card h-100">
      <i className="bi bi-people-fill fs-1"></i>
      <h4 className="mt-2">Total Users</h4>
      <h1>{dashboardData.totalUsers}</h1>
    </div>
  </div>

  <div className="col-md-4">
    <div className="stats-card doctors-card h-100">
      <i className="bi bi-person-badge-fill fs-1"></i>
      <h4 className="mt-2">Total Doctors</h4>
      <h1>{dashboardData.totalDoctors}</h1>
    </div>
  </div>

  <div className="col-md-4">
    <div className="stats-card departments-card h-100">
      <i className="bi bi-building fs-1"></i>
      <h4 className="mt-2">Total Departments</h4>
      <h1>{dashboardData.totalDepartments}</h1>
    </div>
  </div>

</div>

                {/* Quick Access */}
                <div className="card shadow mb-4">
                  <div className="card-body text-center">

                    <h4 className="mb-4">Quick Access</h4>

                    <div className="d-flex flex-wrap justify-content-center gap-3">

                     <div className="row g-3">

  <div className="col-md-3">
    <div
      className="card dashboard-card text-center p-3"
      onClick={() => navigate("/admin/users")}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-people-fill fs-1 text-info"></i>
      <h5 className="mt-2">Users</h5>
    </div>
  </div>

  <div className="col-md-3">
    <div
      className="card dashboard-card text-center p-3"
      onClick={() => navigate("/admin/doctors")}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-person-badge-fill fs-1 text-success"></i>
      <h5 className="mt-2">Doctors</h5>
    </div>
  </div>

  <div className="col-md-3">
    <div
      className="card dashboard-card text-center p-3"
      onClick={() => navigate("/admin/departments")}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-building fs-1 text-warning"></i>
      <h5 className="mt-2">Departments</h5>
    </div>
  </div>

  <div className="col-md-3">
    <div
      className="card dashboard-card text-center p-3"
      onClick={() => navigate("/admin/reports")}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-file-earmark-bar-graph-fill fs-1 text-danger"></i>
      <h5 className="mt-2">Reports</h5>
    </div>
  </div>

</div>
<div className="col-md-10 p-4">
  {/* Dashboard Content */}

  <DashboardFooter />
</div>
                    </div>

                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
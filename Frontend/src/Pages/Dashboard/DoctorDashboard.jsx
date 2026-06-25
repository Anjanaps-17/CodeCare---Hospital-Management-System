import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "../Dashboard/DashboardFooter";
const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    todayAppointments: 0,
    pending: 0,
    completed: 0,
    totalPatients: 0,
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/doctor/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data.data || stats);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/api/doctor/appointments/today", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
  <div className="container-fluid p-0">
      <div className="row g-0">

        {/* SIDEBAR */}
        <div className="col-md-2 sidebar vh-100 p-3">
          <h5 className="text-center fw-bold mb-4">
            Doctor Panel
          </h5>

          <ul className="list-group list-group-flush">

            <li className="list-group-item fw-bold">
              Dashboard
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/doctor/appointments")}
            >
              📅 Today’s Appointments
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/doctor/patients")}
            >
               My Patients
            </li>

            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/doctor/reports")}
            >
              🧾 Lab Reports
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

        {/* MAIN CONTENT */}
        <div className="col-md-10 p-4">

          <h2 className="text-center mb-4 fw-bold">
            DOCTOR DASHBOARD
          </h2>

          {/* STATS */}
          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="stats-card" style={{ backgroundColor: "#0ea5a4" }}>
                <h6>Today Appointments</h6>
                <h1>{stats.todayAppointments}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stats-card" style={{ backgroundColor: "#f59e0b" }}>
                <h6>Pending</h6>
                <h1>{stats.pending}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stats-card" style={{ backgroundColor: "#22c55e" }}>
                <h6>Completed</h6>
                <h1>{stats.completed}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stats-card" style={{ backgroundColor: "#3b82f6" }}>
                <h6>Total Patients</h6>
                <h1>{stats.totalPatients}</h1>
              </div>
            </div>

          </div>

          {/* APPOINTMENTS TABLE */}
          <div className="card dashboard-card shadow mb-4">
            <div className="card-body">

              <h4 className="mb-3">
                📅 Today's Appointments
              </h4>

              {appointments.length === 0 ? (
                <p className="text-muted">
                  No appointments today
                </p>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((app, index) => (
                      <tr key={index}>
                        <td>{app.patientName}</td>
                        <td>{app.time}</td>
                        <td>{app.status}</td>
                        <td>
                          <button className="btn btn-primary btn-sm">
                            Open
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="card dashboard-card shadow mb-4">
            <div className="card-body text-center">

              <button
                className="btn-theme m-2"
                style={{ width: "auto" }}
                onClick={() => navigate("/doctor/patients")}
              >
                View Patients
              </button>

              <button
                className="btn-theme m-2"
                style={{ width: "auto", backgroundColor: "#f59e0b" }}
                onClick={() => navigate("/doctor/reports")}
              >
                Lab Reports
              </button>

            </div>
          </div>
<div className="col-md-10 p-4">
  {/* Dashboard Content */}

  <DashboardFooter />
</div>
          

               </div>
      </div>
    </div>
  </div>
  );
};

export default DoctorDashboard;
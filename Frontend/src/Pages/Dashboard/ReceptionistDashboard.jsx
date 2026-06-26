import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPatient } from "../../api/ReceptionistService";
import DashboardFooter from "../Dashboard/DashboardFooter";
const ReceptionistDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPatientsToday: 0,
    pendingAppointments: 0,
  });

  const [appointments, setAppointments] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [searchResult, setSearchResult] = useState([]);

const handleSearch = async () => {
  try {
    const response = await searchPatient(searchTerm);

    if (Array.isArray(response.data)) {
      setSearchResult(response.data);
    } else {
      setSearchResult([]);
    }
  } catch (error) {
    console.error(error);
    setSearchResult([]);
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Dashboard stats
    // fetch("http://localhost:5000/api/receptionist/dashboard", {
    fetch("http://localhost:5000/api/receptionist/appointments/today", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(
          data.data || {
            totalPatientsToday: 0,
            pendingAppointments: 0,
          }
        );
      })
      .catch((err) => console.log(err));

    // Today appointments
    // fetch("http://localhost:5000/api/appointments/today", {
    fetch("http://localhost:5000/api/receptionist/appointments/today", {
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
            <h5 className="text-center mb-4 fw-bold">
              Receptionist Panel
            </h5>

            <ul className="list-group list-group-flush">

              <li className="list-group-item fw-bold">
                Dashboard
              </li>

              <li
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/receptionist/add-patient")}
              >
                Add Patient
              </li>

              <li
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/receptionist/book-appointment")}
              >
                📅 Book Appointment
              </li>

              <li
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/receptionist/doctors")}
              >
                Doctor Availability
              </li>

              <li
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/receptionist/scan-qr")}
              >
                📷 Verify QR
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
              RECEPTIONIST DASHBOARD
            </h2>

            {/* SEARCH */}
            <div className="card dashboard-card shadow mb-4">
              <div className="card-body d-flex gap-2">
               <input
  type="text"
  className="form-control"
  placeholder="Search patient by name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

                <button
  className="btn btn-primary"
  onClick={handleSearch}
>
  Search
</button>
              </div>
            </div>

            {searchResult.length > 0 && (
  <div className="card mt-3">
    <div className="card-body">
      <h5>Patient Found</h5>

      {searchResult.map((patient) => (
        <div key={patient._id}>
          <p>
            <strong>ID:</strong> {patient.patientId}
          </p>

          <p>
            <strong>Name:</strong> {patient.name}
          </p>

          <p>
            <strong>Phone:</strong> {patient.phone}
          </p>

          <p>
            <strong>Blood Group:</strong> {patient.bloodGroup}
          </p>

          <hr />
        </div>
      ))}
    </div>
  </div>
)}

            {/* QUICK ACTIONS */}
            <div className="card dashboard-card shadow mb-4">
              <div className="card-body text-center">

                <button
                  className="btn-theme mb-2"
                  style={{ width: "auto", marginRight: "10px" }}
                  onClick={() => navigate("/receptionist/add-patient")}
                >
                  Add New Patient
                </button>

                <button
                  className="btn-theme mb-2"
                  style={{ width: "auto", marginRight: "10px" }}
                  onClick={() => navigate("/receptionist/book-appointment")}
                >
                  📅 Book Appointment
                </button>

                <button
                  className="btn-theme mb-2"
                  style={{ width: "auto", backgroundColor: "#f59e0b" }}
                  onClick={() => navigate("/receptionist/update-patient")}
                >
                  📝 Update Patient
                </button>

                <button
                  className="btn-theme mb-2"
                  style={{ width: "auto" }}
                  onClick={() => navigate("/receptionist/scan-qr")}
                >
                  📷 Verify QR
                </button>

              </div>
            </div>

            {/* STATS */}
            <div className="row g-4 mb-4">

              <div className="col-md-6">
                <div
                  className="stats-card"
                  style={{ backgroundColor: "#0ea5a4" }}
                >
                  <h5>Today's Patients</h5>
                  <h1>{stats.totalPatientsToday}</h1>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="stats-card"
                  style={{ backgroundColor: "#ef4444" }}
                >
                  <h5>Pending Appointments</h5>
                  <h1>{stats.pendingAppointments}</h1>
                </div>
              </div>

            </div>

            {/* TODAY APPOINTMENTS */}
            <div className="card dashboard-card shadow mb-4">
              <div className="card-body">

                <h4 className="mb-3">
                  📅 Today's Appointments
                </h4>

                {appointments.length === 0 ? (
                  <p className="text-muted">
                    No appointments for today
                  </p>
                ) : (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {appointments.map((app, index) => (
                        <tr key={index}>
                          <td>{app.patientName}</td>
                          <td>{app.doctorName}</td>
                          <td>{app.time}</td>
                          <td>{app.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

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

export default ReceptionistDashboard;
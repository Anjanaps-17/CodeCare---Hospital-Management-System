import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReceptionistDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPatientsToday: 0,
    pendingAppointments: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // New state for patient details modal
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Dashboard stats
    fetch("http://localhost:5000/api/receptionist/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data.data || stats);
      })
      .catch((err) => console.log(err));

    // Today appointments
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

  const fetchSuggestions = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/receptionist/patients/search?name=${encodeURIComponent(value)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Enter patient name or ID");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const isPatientId = searchQuery.toUpperCase().startsWith("PAT-");

      const url = isPatientId
        ? `http://localhost:5000/api/receptionist/patients/search?patientId=${encodeURIComponent(searchQuery)}`
        : `http://localhost:5000/api/receptionist/patients/search?name=${encodeURIComponent(searchQuery)}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        setSearchResults([]);
        return;
      }

      setSearchResults(data);
    } catch (error) {
      console.log(error);
      toast.error("Search failed");
    }
  };

  const showCancelConfirmation = (appointmentId) => {
    toast.dismiss();
    toast.info(
      ({ closeToast }) => (
        <div
          style={{
            minWidth: "420px",
            padding: "15px",
          }}
        >
          <p
            className="mb-3 fw-bold"
            style={{
              fontSize: "20px",
              fontWeight: "700",
              textAlign: "center",
              lineHeight: "1.5",
              marginLeft: "-50px",
            }}
          >
            Are you sure you want to cancel this appointment?
          </p>

          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              style={{
                minWidth: "85px",
                height: "40px",
                fontWeight: "600",
              }}
              onClick={closeToast}
            >
              No
            </button>

            <button
              className="btn btn-danger"
              style={{
                minWidth: "85px",
                height: "40px",
                fontWeight: "600",
              }}
              onClick={() => {
                closeToast();
                handleCancelAppointment(appointmentId);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
        style: {
          width: "460px",
          padding: "15px",
        },
      }
    );
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/receptionist/appointments/${appointmentId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Appointment cancelled successfully!");

      // Refresh today's appointments
      const appointmentsResponse = await fetch(
        "http://localhost:5000/api/receptionist/appointments/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const appointmentsData = await appointmentsResponse.json();
      setAppointments(appointmentsData.data || []);

      // Refresh dashboard statistics
      const statsResponse = await fetch(
        "http://localhost:5000/api/receptionist/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const statsData = await statsResponse.json();
      setStats(statsData.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel appointment.");
    }
  };

  // Open patient details modal
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  // Close patient details modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  // Helper to safely display a value or fallback
  const displayValue = (value) =>
    value !== undefined && value !== null && value !== "" ? value : "Not Available";

  // Quick Actions data
  const quickActions = [
    {
      icon: "bi-person-plus-fill",
      title: "Add Patient",
      subtitle: "Register a new patient",
      iconColor: "#22c55e",
      bgTint: "#f0fdf4",
      onClick: () => navigate("/receptionist/add-patient"),
    },
    {
      icon: "bi-calendar-check-fill",
      title: "Book Appointment",
      subtitle: "Schedule a new appointment",
      iconColor: "#3b82f6",
      bgTint: "#eff6ff",
      onClick: () => navigate("/receptionist/book-appointment"),
    },
    {
      icon: "bi-pencil-square",
      title: "Update Patient",
      subtitle: "Edit patient information",
      iconColor: "#f59e0b",
      bgTint: "#fffbeb",
      onClick: () => navigate("/receptionist/update-patient"),
    },
    {
      icon: "bi-heart-pulse-fill",
      title: "Doctor Availability",
      subtitle: "Check doctor schedules",
      iconColor: "#8b5cf6",
      bgTint: "#f5f3ff",
      onClick: () => navigate("/receptionist/doctor-availability"),
    },
    {
      icon: "bi-qr-code-scan",
      title: "Verify QR",
      subtitle: "Scan and verify patient QR",
      iconColor: "#06b6d4",
      bgTint: "#ecfeff",
      onClick: () => navigate("/receptionist/scan-qr"),
    },
    {
      icon: "bi-x-circle-fill",
      title: "Cancel Appointment",
      subtitle: "Cancel a booked appointment",
      iconColor: "#ef4444",
      bgTint: "#fef2f2",
      onClick: () => navigate("/receptionist/cancel-appointment"),
    },
  ];

  return (
    <>
      {/* Inline styles for Quick Action card hover effect */}
      <style>{`
        .qa-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 28px 16px 22px;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
          user-select: none;
        }
        .qa-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }
        .qa-card:active {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
        .qa-icon-wrapper {
          width: 62px;
          height: 62px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .qa-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 5px;
          line-height: 1.3;
        }
        .qa-card-subtitle {
          font-size: 0.78rem;
          color: #6b7280;
          line-height: 1.4;
          margin: 0;
        }
      `}</style>

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
                onClick={() => navigate("/receptionist/doctor-availability")}
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
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/receptionist/cancel-appointment")}
              >
                ❌ Cancel Appointment
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
              <div className="card-body d-flex gap-2 align-items-start">

                <div style={{ position: "relative", flex: 1 }}>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search patient by name or ID..."
                    value={searchQuery}
                    onChange={(e) => fetchSuggestions(e.target.value)}
                  />

                  {suggestions.length > 0 && (
                    <div
                      className="list-group mt-2"
                      style={{
                        maxHeight: "220px",
                        overflowY: "auto",
                        border: "1px solid #dee2e6",
                        borderRadius: "8px",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                        background: "#fff",
                      }}
                    >
                      {suggestions.map((patient) => (
                        <button
                          key={patient._id}
                          type="button"
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            setSearchQuery(patient.name);
                            setSearchResults([patient]);
                            setSuggestions([]);
                            document.activeElement.blur();
                          }}
                        >
                          <strong>{patient.name}</strong>
                          <br />
                          <small>{patient.patientId}</small>
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>

              </div>
            </div>

            {/* SEARCH RESULTS */}
            {searchResults.length > 0 && (
              <div className="card dashboard-card shadow mb-4">
                <div className="card-body">
                  <h4 className="mb-3">Search Results</h4>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {searchResults.map((patient) => (
                        <tr key={patient._id}>
                          <td>{patient.patientId}</td>
                          <td>{patient.name}</td>
                          <td>{patient.phone}</td>
                          <td>{patient.status}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-info text-white"
                              onClick={() => handleViewPatient(patient)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── QUICK ACTIONS ── */}
            <div className="card dashboard-card shadow mb-4">
              <div className="card-body px-4 pt-4 pb-3">

                <h5
                  className="fw-bold text-center mb-4"
                  style={{ fontSize: "1.1rem", color: "#374151", letterSpacing: "0.3px" }}
                >
                  Quick Actions
                </h5>

                <div className="row g-3 justify-content-center">
                  {quickActions.map((action, index) => (
                    <div className="col-12 col-sm-6 col-md-4" key={index}>
                      <div
                        className="qa-card"
                        onClick={action.onClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && action.onClick()}
                      >
                        <div
                          className="qa-icon-wrapper"
                          style={{ backgroundColor: action.bgTint }}
                        >
                          <i
                            className={`bi ${action.icon}`}
                            style={{ fontSize: "1.7rem", color: action.iconColor }}
                          />
                        </div>
                        <p className="qa-card-title">{action.title}</p>
                        <p className="qa-card-subtitle">{action.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            {/* ── END QUICK ACTIONS ── */}

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
                        <th>Token</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {appointments
                        .filter((app) => app.status !== "Cancelled")
                        .map((app) => (
                          <tr key={app._id}>
                            <td>{app.patientId?.name}</td>
                            <td>{app.doctorId?.name}</td>
                            <td>
                              <td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {app.token ? (
                                    <span
                                      className="badge bg-warning text-dark"
                                      style={{
                                        fontSize: "0.9rem",
                                        padding: "8px 12px",
                                        borderRadius: "8px",
                                      }}
                                    >
                                      #{app.token}
                                    </span>
                                  ) : (
                                    <span className="text-muted">--</span>
                                  )}
                                </td>
                              </td>
                            </td>
                            <td>{app.time}</td>
                            <td>{app.status}</td>
                            <td>
                              {app.status === "Cancelled" ? (
                                <span className="text-danger fw-bold">
                                  Cancelled
                                </span>
                              ) : (
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => showCancelConfirmation(app._id)}
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}

              </div>
            </div>

            {/* FOOTER */}
            <div className="card footer-card shadow">
              <div className="card-body text-center">
                <h5>CodeCare Hospital System</h5>
                <p className="mb-0">
                  Receptionist Control Panel
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* PATIENT DETAILS MODAL */}
        {showModal && selectedPatient && (
          <>
            {/* Backdrop */}
            <div
              className="modal-backdrop fade show"
              style={{ zIndex: 1040 }}
              onClick={handleCloseModal}
            />

            {/* Modal */}
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
              style={{ zIndex: 1050 }}
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="modal-content"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "none",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Modal Header */}
                  <div
                    className="modal-header"
                    style={{
                      background: "linear-gradient(135deg, #0ea5a4, #0d8f8e)",
                      color: "#fff",
                      padding: "18px 24px",
                      borderBottom: "none",
                    }}
                  >
                    <h5
                      className="modal-title fw-bold"
                      style={{ fontSize: "1.2rem", letterSpacing: "0.5px" }}
                    >
                      🏥 Patient Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      aria-label="Close"
                      onClick={handleCloseModal}
                    />
                  </div>

                  {/* Modal Body */}
                  <div
                    className="modal-body"
                    style={{ padding: "28px 32px", background: "#f8fafc" }}
                  >
                    <div className="row g-4">

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Patient ID
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {displayValue(selectedPatient.patientId)}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Full Name
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {displayValue(selectedPatient.name)}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Date of Birth
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {selectedPatient.dob
                              ? new Date(selectedPatient.dob).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "Not Available"}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Gender
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {displayValue(selectedPatient.gender)}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Phone Number
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {displayValue(selectedPatient.phone)}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Blood Group
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {displayValue(selectedPatient.bloodGroup)}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Current Status
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {displayValue(selectedPatient.status)}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        >
                          <p
                            className="mb-1"
                            style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}
                          >
                            Address
                          </p>
                          <p
                            className="mb-0 fw-bold"
                            style={{ fontSize: "1rem", color: "#111827" }}
                          >
                            {displayValue(selectedPatient.address)}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div
                    className="modal-footer"
                    style={{
                      background: "#f8fafc",
                      borderTop: "1px solid #e5e7eb",
                      padding: "16px 24px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{
                        minWidth: "100px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        padding: "8px 20px",
                      }}
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default ReceptionistDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/BookAppointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/receptionist/doctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/receptionist/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/receptionist/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
          patientId,
          doctorId,
          department: selectedDoctor?.Department,
          date,
          time,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setAppointmentDetails({
  patient:
    patients.find((p) => p.patientId === patientId)?.name || "",
  doctor: selectedDoctor?.DoctorName || "",
  department: selectedDoctor?.Department || "",
  date,
  time,
  token: data.appointment.token,
});

      alert("Appointment booked successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to book appointment");
    }
  };

  const resetForm = () => {
    setAppointmentDetails(null);
    setPatientId("");
    setDoctorId("");
    setDate("");
    setTime("");
    setSelectedDoctor(null);
  };

  return (
    <div className="ap-wrapper">
      <div className="ap-container  ba-container">

        {/* Header */}
        <div className="ap-header">
          <div className="ap-header-icon"></div>

          <div>
            <h2 className="ap-title">Book Appointment</h2>
            <p className="ap-subtitle">
              CodeCare Hospital Management System
            </p>
          </div>
        </div>

        {!appointmentDetails ? (

          /* FORM */
          <div className="ap-form">

            <div className="ap-section-label">
              APPOINTMENT INFORMATION
            </div>

            <div className="ap-grid-2 ba-grid">

              {/* Patient */}
              <div className="ap-field ba-field">
                <label>Patient</label>

                <select
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                >
                  <option value="">Select Patient</option>

                  {patients.map((patient) => (
                    <option
                      key={patient._id}
                      value={patient.patientId}
                    >
                      {patient.name} ({patient.patientId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div className="ap-field ba-field">
                <label>Doctor</label>

                <select
                  value={doctorId}
                  onChange={(e) => {
                    setDoctorId(e.target.value);

                    const doctor = doctors.find(
                      (doc) => doc._id === e.target.value
                    );

                    setSelectedDoctor(doctor);
                  }}
                >
                  <option value="">Select Doctor</option>

                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.DoctorName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div className="ap-field ba-field">
                <label>Department</label>

                <input
                  type="text"
                  value={selectedDoctor?.Department || ""}
                  readOnly
                />
              </div>

              {/* Date */}
              <div className="ap-field ba-field">
                <label>Appointment Date</label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Time */}
              <div className="ap-field ba-field">
                <label>Appointment Time</label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

            </div>

            <div className="ap-actions ba-actions">

              <button
                type="button"
                className="ap-btn-ghost"
                onClick={() =>
                  navigate("/receptionist/dashboard")
                }
              >
                <i className="bi bi-arrow-left me-1"></i>
                Back
              </button>

              <button
                type="button"
                className="ap-btn-primary"
                onClick={handleSubmit}
              >
                Book Appointment
              </button>

            </div>

          </div>

        ) : (

          /* SUCCESS CARD */
          <div className="ap-result">

            <div className="ap-card">

              <div className="ap-card-header">
                <i className="bi bi-calendar-check-fill me-2"></i>
                Appointment Booked Successfully
              </div>

              <div className="ap-card-body">

                <table className="ap-info-table">
                  <tbody>

                    {[
  ["Patient", appointmentDetails.patient],
  ["Doctor", appointmentDetails.doctor],
  ["Department", appointmentDetails.department],
  [
    "Date",
    new Date(appointmentDetails.date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ),
  ],
  ["Time", appointmentDetails.time],
  ["Status", "Scheduled"],
  ["Token Number", appointmentDetails.token],
].map(([k, v]) => (
                      <tr key={k}>
                        <td className="ap-info-key">{k}</td>
                        <td className="ap-info-val">{v}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>

              </div>

            </div>

            <div className="ap-result-actions">

              <button
                className="ap-btn-ghost"
                onClick={() =>
                  navigate("/receptionist/dashboard")
                }
              >
                <i className="bi bi-arrow-left me-1"></i>
                Back to Dashboard
              </button>

              <button
                className="ap-btn-outline"
                onClick={resetForm}
              >
                <i className="bi bi-plus-circle me-1"></i>
                Book Another Appointment
              </button>

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default BookAppointment;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/BookAppointment.css";
import { toast } from "react-toastify";

const BookAppointment = () => {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [department, setDepartment] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [patientSearch, setPatientSearch] = useState("");
const [patientSuggestions, setPatientSuggestions] = useState([]);

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


  const searchPatients = (value) => {
  setPatientSearch(value);

  if (!value.trim()) {
    setPatientSuggestions([]);
    return;
  }

  const filtered = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(value.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(value.toLowerCase())
  );

  setPatientSuggestions(filtered);
};
  

  const handleSubmit = async () => {
if (!patientId) {
    toast.warning("Please select a patient.");
    return;
  }

  if (!doctorId) {
    toast.warning("Please select a doctor.");
    return;
  }

  if (!date) {
    toast.warning("Please select an appointment date.");
    return;
  }

  if (!time) {
    toast.warning("Please select an appointment time.");
    return;
  }


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
          department,
          date,
          time,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
  toast.error(data.message);
  return;
}

      setAppointmentDetails({
        appointmentId: data.appointment.appointmentId,
  patient:
    patients.find((p) => p.patientId === patientId)?.name || "",
  doctor: selectedDoctor?.name || "",
department: selectedDoctor?.department?.name || "",
  date,
  time,
  token: data.appointment.token,
});

      toast.success("Appointment booked successfully!");
    } catch (error) {
  console.log(error);

  toast.error("Failed to book appointment!");
}
  };

  const resetForm = () => {
    setAppointmentDetails(null);
    setPatientId("");
    setPatientSearch("");
setPatientSuggestions([]);
    setDoctorId("");
    setDepartment("");
    setDate("");
    setTime("");
    setSelectedDoctor(null);
  };

  const filteredDoctors =
  department === ""
    ? doctors
    : doctors.filter(
        (doctor) => doctor.department?.name === department
      );

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

  <div style={{ position: "relative" }}>
    <input
      type="text"
      className="form-control"
      placeholder="Search patient..."
      value={patientSearch}
      onChange={(e) => searchPatients(e.target.value)}
    />

    {patientSuggestions.length > 0 && (
      <div
        className="list-group"
        style={{
          position: "absolute",
          width: "100%",
          zIndex: 1000,
          maxHeight: "200px",
          overflowY: "auto",
          background: "#fff",
          border: "1px solid #ddd",
        }}
      >
        {patientSuggestions.map((patient) => (
          <button
            key={patient._id}
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => {
              setPatientSearch(patient.name);
              setPatientId(patient.patientId);
              setPatientSuggestions([]);
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

                  {filteredDoctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                     {doctor.name}
                   </option>
                   ))}
                </select>
              </div>

             {/* Department */}
<div className="ap-field ba-field">
  <label>Department</label>

  <select
    value={department}
    onChange={(e) => {
      setDepartment(e.target.value);
      setDoctorId("");
      setSelectedDoctor(null);
    }}
  >
    <option value="">Select Department</option>

    {[...new Set(doctors.map(doc => doc.department?.name))].map(dep => (
      <option key={dep} value={dep}>
        {dep}
      </option>
    ))}
  </select>
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
  ["Appointment ID", appointmentDetails.appointmentId],
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
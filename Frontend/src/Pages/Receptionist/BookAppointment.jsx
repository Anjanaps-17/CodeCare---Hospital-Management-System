import { useEffect, useState } from "react";

const BookAppointment = () => {

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDoctors();
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

return (
  <div className="container mt-4">
    <h2 className="mb-4">Book Appointment</h2>

    <div className="mb-3">
      <label className="form-label">Patient ID</label>
      <input
        type="text"
        className="form-control"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Doctor</label>

      <select
        className="form-control"
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
            {doctor.name}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label">Department</label>

      <input
        type="text"
        className="form-control"
        value={selectedDoctor?.department?.DepartmentName || ""}
        readOnly
      />
    </div>

  </div>
);
};

export default BookAppointment;
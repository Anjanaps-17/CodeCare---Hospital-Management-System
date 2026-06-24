import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../../styles/VerifyQR.css";

const VerifyQR = () => {
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState("");
  const [patient, setPatient] = useState(null);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setQrCode(decodedText);
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
 }, []);

  const handleVerify = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
  `http://localhost:5000/api/receptionist/appointments/verify-qr?qr=${qrCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setPatient(data.patient);
      setAppointment(data.appointment);

    } catch (error) {
  console.error("Verify QR Error:", error);
  alert(error.message);
}
  };

  const resetPage = () => {
    setQrCode("");
    setPatient(null);
    setAppointment(null);

  };

  return (
  <div className="ap-wrapper">
    <div className="ap-container">

      {/* Header */}
      <div className="ap-header">
        <div>
          <h2 className="ap-title">Verify QR</h2>
          <p className="ap-subtitle">
            CodeCare Hospital Management System
          </p>
        </div>
      </div>

      <div className="row g-4">

        {/* QR Scanner */}
        <div className="col-md-4">

          <div className="ap-card">

            <div className="ap-card-header">
              QR Scanner
            </div>

            <div className="ap-card-body">

              <div
                id="reader"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  margin: "20px auto",
                }}
              ></div>

              <div className="ap-field mt-3">
                <label>QR Code</label>

                <input
                  type="text"
                  placeholder="Scan or enter Patient ID"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                />
              </div>

              <div className="ap-actions mt-3">

                <button
                  className="ap-btn-ghost"
                  onClick={() => navigate("/receptionist/dashboard")}
                >
                  Back
                </button>

                <button
                  className="ap-btn-primary"
                  onClick={handleVerify}
                >
                  Verify QR
                </button>

              </div>

              <div
  className="mt-3"
  style={{
    display: "flex",
    justifyContent: "center",
  }}
>
  <button
    className="ap-btn-outline"
    onClick={resetPage}
  >
    Verify Another QR
  </button>
</div>

            </div>

          </div>

        </div>

        {/* Patient Details */}
        <div className="col-md-4">

          <div className="ap-card">

            <div className="ap-card-header">
              Patient Details
            </div>

            <div className="ap-card-body">

              <table className="verify-info-table">
                <tbody>
<tr>
  <td colSpan="2">
    <strong>Patient ID</strong>
    <div>{patient?.patientId || "--"}</div>
  </td>
</tr>

                  <tr>
                    <td>Name</td>
                    <td>{patient?.name || "--"}</td>
                  </tr>

                  <tr>
                    <td>Phone</td>
                    <td>{patient?.phone || "--"}</td>
                  </tr>

                  <tr>
                    <td>Blood Group</td>
                    <td>{patient?.bloodGroup || "--"}</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>{patient?.status || "--"}</td>
                  </tr>

                </tbody>
              </table>

            </div>

          </div>

        </div>

        {/* Appointment Details */}
        <div className="col-md-4">

          <div className="ap-card">

            <div className="ap-card-header">
              Appointment Verification
            </div>

            <div className="ap-card-body">

              <table className="verify-info-table">
                <tbody>

                  <tr>
  <td colSpan="2">
    <strong>Appointment ID</strong>
    <div>{appointment?.token || "--"}</div>
  </td>
</tr>

                  <tr>
                    <td>Date</td>
                    <td>
                      {appointment
                        ? new Date(appointment.date).toLocaleDateString("en-GB")
                        : "--"}
                    </td>
                  </tr>

                  <tr>
                    <td>Department</td>
                    <td>
  {appointment?.department &&
  appointment.department.length > 20
    ? "Department"
    : appointment?.department || "--"}
</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>{appointment?.status || "--"}</td>
                  </tr>

                </tbody>
              </table>

            </div>

          </div>

        </div>

      </div>

      

    </div>
  </div>
);
};

export default VerifyQR;
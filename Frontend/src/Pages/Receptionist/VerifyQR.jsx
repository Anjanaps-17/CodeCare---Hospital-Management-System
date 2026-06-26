import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";
import "../../styles/VerifyQR.css";
 
const VerifyQR = () => {
  const navigate = useNavigate();
 
  const [qrCode, setQrCode] = useState("");
  const [patient, setPatient] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");
 
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
    setError("");
    if (!qrCode.trim()) {
  setError("Please scan or enter a QR code.");
  return;
}
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
        setError(data.message);
        return;
      }
 
      setError("");

setPatient(data.patient);

setAppointment(data.appointment);

toast.success("QR verified successfully!");

    } catch (error) {
  console.error("Verify QR Error:", error);

  setError("");
  toast.error("Unable to verify QR code.");
}
  };
 
  const resetPage = () => {
  setQrCode("");
  setPatient(null);
  setAppointment(null);
  setError("");
};
 
  const getPatientStatusBadge = (status) => {
    if (!status) return <span className="vq-badge vq-badge--default">--</span>;
    const s = status.toLowerCase();
    if (s === "active")
      return (
        <span className="vq-badge vq-badge--green">
          <i className="bi bi-check-circle-fill"></i> {status}
        </span>
      );
    if (s === "inactive")
      return (
        <span className="vq-badge vq-badge--red">
          <i className="bi bi-x-circle-fill"></i> {status}
        </span>
      );
    return <span className="vq-badge vq-badge--yellow">{status}</span>;
  };
 
  const getAppointmentStatusBadge = (status) => {
    if (!status) return <span className="vq-badge vq-badge--default">--</span>;
    const s = status.toLowerCase();
    if (s === "verified" || s === "completed")
      return (
        <span className="vq-badge vq-badge--green">
          <i className="bi bi-patch-check-fill"></i> {status}
        </span>
      );
    if (s === "pending")
      return (
        <span className="vq-badge vq-badge--yellow">
          <i className="bi bi-clock-fill"></i> {status}
        </span>
      );
    if (s === "cancelled")
      return (
        <span className="vq-badge vq-badge--red">
          <i className="bi bi-x-circle-fill"></i> {status}
        </span>
      );
    return <span className="vq-badge vq-badge--default">{status}</span>;
  };
 
  return (
    <div className="vq-wrapper">
      <div className="vq-container">
 
        {/* Header */}
        <header className="vq-header">
          <div className="vq-header__left">
            <div className="vq-header__icon">
              <i className="bi bi-qr-code-scan"></i>
            </div>
            <div className="vq-header__text">
              <h2 className="vq-header__title">Verify QR</h2>
              <p className="vq-header__subtitle">
                <i className="bi bi-hospital"></i>
                CodeCare Hospital Management System
              </p>
            </div>
          </div>
          <div className="vq-header__badge">
            <i className="bi bi-person-badge"></i>
            Receptionist Portal
          </div>
        </header>

        {error && (
  <div className="ap-alert ap-alert-err">
    <i className="bi bi-x-circle me-2" />
    {error}
  </div>
)}
 
        {/* Three-column grid */}
        <div className="vq-grid">
 
          {/* LEFT — QR Scanner */}
          <div className="vq-card">
            <div className="vq-card__header">
              <i className="bi bi-camera"></i>
              QR Scanner
            </div>
            <div className="vq-card__body">
 
              <div className="vq-scanner-frame">
                <div id="reader"></div>
              </div>
 
              <div className="vq-field">
                <label className="vq-label">
                  <i className="bi bi-upc-scan"></i>
                  QR Code
                </label>
                <div className="vq-input-wrap">
                  <i className="bi bi-qr-code vq-input-icon"></i>
                  <input
                    className="vq-input"
                    type="text"
                    placeholder="Scan or enter Patient ID"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                  />
                </div>
              </div>
 
              <div className="vq-actions">
                <button
                  className="vq-btn vq-btn--ghost"
                  onClick={() => navigate("/receptionist/dashboard")}
                >
                  <i className="bi bi-arrow-left"></i>
                  Back
                </button>
                <button
                  className="vq-btn vq-btn--primary"
                  onClick={handleVerify}
                >
                  <i className="bi bi-shield-check"></i>
                  Verify QR
                </button>
              </div>
 
              <div className="vq-reset-row">
                <button className="vq-btn vq-btn--outline" onClick={resetPage}>
                  <i className="bi bi-arrow-repeat"></i>
                  Verify Another QR
                </button>
              </div>
 
            </div>
          </div>
 
          {/* CENTER — Patient Details */}
          <div className="vq-card">
            <div className="vq-card__header">
              <i className="bi bi-person-circle"></i>
              Patient Details
            </div>
            <div className="vq-card__body">
 
              <div className="vq-id-box">
                <p className="vq-id-box__label">
                  <i className="bi bi-fingerprint"></i>
                  Patient ID
                </p>
                <p className="vq-id-box__value">
                  {patient?.patientId || "--"}
                </p>
              </div>
 
              <ul className="vq-info-list">
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-person"></i>
                    Name
                  </span>
                  <span className="vq-info-list__val">
                    {patient?.name || "--"}
                  </span>
                </li>
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-telephone"></i>
                    Phone
                  </span>
                  <span className="vq-info-list__val">
                    {patient?.phone || "--"}
                  </span>
                </li>
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-droplet-half"></i>
                    Blood Group
                  </span>
                  <span className="vq-info-list__val">
                    {patient?.bloodGroup || "--"}
                  </span>
                </li>
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-toggle-on"></i>
                    Status
                  </span>
                  <span className="vq-info-list__val">
                    {getPatientStatusBadge(patient?.status)}
                  </span>
                </li>
              </ul>
 
            </div>
          </div>
 
          {/* RIGHT — Appointment Verification */}
          <div className="vq-card">
            <div className="vq-card__header">
              <i className="bi bi-calendar2-check"></i>
              Appointment Verification
            </div>
            <div className="vq-card__body">
 
              <div className="vq-id-box">
                <p className="vq-id-box__label">
                  <i className="bi bi-hash"></i>
                  Appointment ID
                </p>
                <p className="vq-id-box__value">
                  {appointment?.appointmentId || "--"}
                </p>
              </div>
 
              <ul className="vq-info-list">
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-ticket-perforated"></i>
                    Token
                  </span>
                  <span className="vq-info-list__val">
                    {appointment?.token || "--"}
                  </span>
                </li>
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-calendar3"></i>
                    Date
                  </span>
                  <span className="vq-info-list__val">
                    {appointment
                      ? new Date(appointment.date).toLocaleDateString("en-GB")
                      : "--"}
                  </span>
                </li>
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-person-badge"></i>
                    Doctor
                  </span>
                  <span className="vq-info-list__val">
                    {appointment?.doctorId?.name || "--"}
                  </span>
                </li>
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-building-cross"></i>
                    Department
                  </span>
                  <span className="vq-info-list__val">
                    {appointment?.department || "--"}
                  </span>
                </li>
                <li className="vq-info-list__item">
                  <span className="vq-info-list__key">
                    <i className="bi bi-circle-half"></i>
                    Status
                  </span>
                  <span className="vq-info-list__val">
                    {getAppointmentStatusBadge(appointment?.status)}
                  </span>
                </li>
              </ul>
 
            </div>
          </div>
 
        </div>
        {/* end .vq-grid */}
 
      </div>
    </div>
  );
};
 
export default VerifyQR;
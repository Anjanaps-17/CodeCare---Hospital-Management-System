import React, { useState, useRef, } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "../../styles/AddPatient.css";


const AddPatient = () => {
  const navigate = useNavigate();
  const qrCanvasRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    bloodGroup: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  const [patient, setPatient] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateQR = async (patientId) => {
    const url = await QRCode.toDataURL(patientId, {
      width: 200,
      margin: 1,
      color: { dark: "#0d6e6e", light: "#ffffff" },
    });
    setQrDataUrl(url);
    return url;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    // Full Name validation
if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
  setError("Patient name should contain only alphabets and spaces.");
  return;
}

// Emergency Contact Name validation
if (!/^[A-Za-z\s]+$/.test(formData.emergencyName.trim())) {
  setError("Emergency contact name should contain only alphabets and spaces.");
  return;
}

// Patient phone number validation

if (
  !/^[6-9]\d{9}$/.test(formData.phone)
) {
  setError("Enter a valid patient phone number.");
  return;
}

if (
  !/^[6-9]\d{9}$/.test(formData.emergencyPhone)
) {
  setError("Enter a valid emergency contact phone number.");
  return;
}
setLoading(true);
setPatient(null);
setQrDataUrl("");


    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        bloodGroup: formData.bloodGroup,
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
        },
      };

      const res = await fetch("http://localhost:5000/api/receptionist/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");


      setError("");
      setPatient(data.patient);
      await generateQR(data.patient.patientId);
      toast.success(data.message);
    } catch (err) {
    toast.error(err.message);
} finally {
      setLoading(false);
    }
  };

  const formatDob = (dob) => {
    if (!dob) return "—";
    return new Date(dob).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const downloadIdCard = async () => {
    if (!patient || !qrDataUrl) return;

    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [85.6, 54] });

    // Background
    pdf.setFillColor(13, 110, 110);
    pdf.rect(0, 0, 85.6, 14, "F");

    // Hospital name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.text("CodeCare Hospital Management System", 42.8, 5.5, { align: "center" });
    pdf.setFontSize(6);
    pdf.setFont("helvetica", "normal");
    pdf.text("PATIENT IDENTITY CARD", 42.8, 10, { align: "center" });

    // White body
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 14, 85.6, 40, "F");

    // Left section – patient info
    const leftX = 4;
    let y = 20;
    const lineH = 5.2;

    const rows = [
      ["Name", patient.name],
      ["Patient ID", patient.patientId],
      ["Date of Birth", formatDob(patient.dob)],
      ["Gender", patient.gender],
      ["Blood Group", patient.bloodGroup],
      ["Phone", patient.phone],
      [
        "Emergency",
        `${patient.emergencyContact?.name || "—"} | ${patient.emergencyContact?.phone || "—"}`,
      ],
    ];

    rows.forEach(([label, value]) => {
      pdf.setFontSize(5.2);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(80, 80, 80);
      pdf.text(label + ":", leftX, y);

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(20, 20, 20);
      pdf.text(String(value), leftX + 22, y);
      y += lineH;
    });

    // Right section – QR
    const qrX = 62;
    const qrY = 17;
    const qrSize = 20;
    pdf.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

    pdf.setFontSize(4.5);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont("helvetica", "normal");
    pdf.text("Scan to verify patient", qrX + qrSize / 2, qrY + qrSize + 2.5, { align: "center" });

    // Footer strip
    pdf.setFillColor(232, 248, 248);
    pdf.rect(0, 49, 85.6, 5.6, "F");
    pdf.setFontSize(4.5);
    pdf.setTextColor(13, 110, 110);
    pdf.setFont("helvetica", "italic");
    pdf.text("This card is property of CodeCare HMS. If found, please return to the hospital.", 42.8, 52.2, {
      align: "center",
    });

    pdf.save(`${patient.patientId}_ID_Card.pdf`);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      dob: "",
      gender: "",
      phone: "",
      address: "",
      bloodGroup: "",
      emergencyName: "",
      emergencyPhone: "",
    });
    setPatient(null);
    setQrDataUrl("");
      setError(""); 
  };

  return (
    <div className="ap-wrapper">
      <div className="ap-container">
        {/* ── Header ── */}
        <div className="ap-header">
          <div className="ap-header-icon">
            <i className="bi bi-person-plus-fill" />
          </div>
          <div>
            <h2 className="ap-title">Register New Patient</h2>
            <p className="ap-subtitle">CodeCare Hospital Management System</p>
          </div>
        </div>

{/* Error Alert */}
{error && (
  <div className="ap-alert ap-alert-err">
    <i className="bi bi-x-circle me-2" />
    {error}
  </div>
)}
        
        {!patient ? (
          /* ── Registration form ── */
          <form onSubmit={handleSubmit} className="ap-form">
            <div className="ap-section-label">Personal Information</div>
            <div className="ap-grid-2">
              <div className="ap-field">
                <label>Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="ap-field">
                <label>Date of Birth *</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="ap-field">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="ap-field">
                <label>Blood Group *</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                  <option value="">Select blood group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div className="ap-field">
                <label>Phone Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  required
                />
              </div>
              <div className="ap-field">
                <label>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} placeholder="City / District" />
              </div>
            </div>

            <div className="ap-section-label mt-3">Emergency Contact</div>
            <div className="ap-grid-2">
              <div className="ap-field">
                <label>Contact Name *</label>
                <input
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  placeholder="Guardian / Relative name"
                  required
                />
              </div>
              <div className="ap-field">
                <label>Contact Phone *</label>
                <input
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="ap-actions">
              <button type="button" className="ap-btn-ghost" onClick={() => navigate("/receptionist/dashboard")}>
                <i className="bi bi-arrow-left me-1" /> Back
              </button>
              <button type="submit" className="ap-btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Registering…
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-check me-1" /> Register Patient
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* ── Success: patient card + QR ── */
          <div className="ap-result">
            {/* Patient detail card */}
            <div className="ap-card">
              <div className="ap-card-header">
                <i className="bi bi-person-badge-fill me-2" />
                Patient Registered Successfully
              </div>
              <div className="ap-card-body">
                <div className="ap-card-grid">
                  <div className="ap-info-left">
                    <table className="ap-info-table">
                      <tbody>
                        {[
                          ["Patient ID", patient.patientId],
                          ["Full Name", patient.name],
                          ["Date of Birth", formatDob(patient.dob)],
                          ["Gender", patient.gender],
                          ["Blood Group", patient.bloodGroup],
                          ["Phone", patient.phone],
                          ["Address", patient.address || "—"],
                          [
                            "Emergency",
                            `${patient.emergencyContact?.name} | ${patient.emergencyContact?.phone}`,
                          ],
                          ["Status", patient.status],
                        ].map(([k, v]) => (
                          <tr key={k}>
                            <td className="ap-info-key">{k}</td>
                            <td className="ap-info-val">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="ap-info-right">
                    <div className="ap-qr-box">
                      <p className="ap-qr-label">Patient QR Code</p>
                      {qrDataUrl ? (
                        <img src={qrDataUrl} alt="Patient QR" className="ap-qr-img" />
                      ) : (
                        <div className="ap-qr-placeholder">
                          <span className="spinner-border text-teal" />
                        </div>
                      )}
                      <p className="ap-qr-sub">{patient.patientId}</p>
                      <p className="ap-qr-hint">Scan to verify patient identity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="ap-result-actions">
              <button className="ap-btn-ghost" onClick={() => navigate("/receptionist/dashboard")}>
                <i className="bi bi-arrow-left me-1" /> Back to Dashboard
              </button>
              <button className="ap-btn-outline" onClick={resetForm}>
                <i className="bi bi-plus-circle me-1" /> Register Another
              </button>
              <button className="ap-btn-primary" onClick={downloadIdCard} disabled={!qrDataUrl}>
                <i className="bi bi-download me-1" /> Download ID Card (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPatient;
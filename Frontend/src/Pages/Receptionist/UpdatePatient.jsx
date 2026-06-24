import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AddPatient.css";

const UpdatePatient = () => {
  const navigate = useNavigate();

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
const [searchId, setSearchId] = useState("");
const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  


  const handleSearch = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/receptionist/patients/${searchId}`,
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

    setPatient(data);

    setFormData({
      name: data.name || "",
      dob: data.dob?.split("T")[0] || "",
      gender: data.gender || "",
      phone: data.phone || "",
      address: data.address || "",
      bloodGroup: data.bloodGroup || "",
      emergencyName: data.emergencyContact?.name || "",
      emergencyPhone: data.emergencyContact?.phone || "",
    });

  } catch (error) {
    console.log(error);
  }
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

  // Patient phone validation
  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    setError("Enter a valid patient phone number.");
    return;
  }

  // Emergency phone validation
  if (!/^[6-9]\d{9}$/.test(formData.emergencyPhone)) {
    setError("Enter a valid emergency contact phone number.");
    return;
  }

  setLoading(true);

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

    const response = await fetch(
      `http://localhost:5000/api/receptionist/patients/${patient.patientId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    setPatient(data.updatedPatient);
    setUpdateSuccess(true);

  } catch (error) {
    setError(error.message);
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
  setMessage("");
  setError("");
  setUpdateSuccess(false);
  setSearchId("");
};
  return (
  <div className="ap-wrapper">
    <div className="ap-container">

      {/* Header */}
      <div className="ap-header">
        <div className="ap-header-icon">
          <i className="bi bi-pencil-square" />
        </div>

        <div>
          <h2 className="ap-title">Update Patient</h2>
          <p className="ap-subtitle">
            CodeCare Hospital Management System
          </p>
        </div>
      </div>

      {/* Alerts */}
      {message && (
        <div className="ap-alert ap-alert-ok">
          <i className="bi bi-check-circle me-2" />
          {message}
        </div>
      )}

      {error && (
        <div className="ap-alert ap-alert-err">
          <i className="bi bi-x-circle me-2" />
          {error}
        </div>
      )}

      {!updateSuccess ? (

        <>
          {/* Search Section */}
          <div className="ap-form">

            <div className="ap-section-label">
              Search Patient
            </div>

            <div className="ap-field">
              <label>Patient ID</label>

              <input
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="PAT-XXXXXXXX"
              />
            </div>

            <div className="ap-actions">
              <button
                type="button"
                className="ap-btn-primary"
                onClick={handleSearch}
              >
                Search Patient
              </button>
            </div>
          </div>

          {/* Form only after patient found */}
          {patient && (

            <form onSubmit={handleSubmit} className="ap-form">

              <div className="ap-section-label">
                Personal Information
              </div>

              <div className="ap-grid-2">

                <div className="ap-field">
                  <label>Full Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ap-field">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ap-field">
                  <label>Gender *</label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="ap-field">
                  <label>Blood Group *</label>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
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
                    maxLength={10}
                    required
                  />
                </div>

                <div className="ap-field">
                  <label>Address</label>

                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="ap-section-label mt-3">
                Emergency Contact
              </div>

              <div className="ap-grid-2">

                <div className="ap-field">
                  <label>Contact Name *</label>

                  <input
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ap-field">
                  <label>Contact Phone *</label>

                  <input
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>

              </div>

              <div className="ap-actions">

                <button
                  type="button"
                  className="ap-btn-ghost"
                  onClick={() => navigate("/receptionist/dashboard")}
                >
                  <i className="bi bi-arrow-left me-1" />
                  Back
                </button>

                <button
                  type="submit"
                  className="ap-btn-primary"
                >
                  <i className="bi bi-pencil-square me-1" />
                  Update Patient
                </button>

              </div>

            </form>

          )}

        </>

      ) : (

        <div className="ap-result">

          <div className="ap-card">

            <div className="ap-card-header">
              <i className="bi bi-check-circle-fill me-2" />
              Patient Updated Successfully
            </div>

            <div className="ap-card-body">

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

          </div>

          <div className="ap-result-actions">

            <button
              className="ap-btn-ghost"
              onClick={() => navigate("/receptionist/dashboard")}
            >
              <i className="bi bi-arrow-left me-1" />
              Back to Dashboard
            </button>

              <button className="ap-btn-outline" onClick={resetForm}>
                <i className="bi bi-plus-circle me-1" /> Update Another
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default UpdatePatient;
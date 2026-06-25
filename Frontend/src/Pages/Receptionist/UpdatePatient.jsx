import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UpdatePatient.css";

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

    if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      setError("Patient name should contain only alphabets and spaces.");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(formData.emergencyName.trim())) {
      setError("Emergency contact name should contain only alphabets and spaces.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Enter a valid patient phone number.");
      return;
    }

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
    <div className="up-wrapper">
      <div className="up-page">

        {/* ── Page Header ── */}
        <div className="up-page-header">
          <div className="up-page-header-left">
            <div className="up-header-icon">
              <i className="bi bi-pencil-square" />
            </div>
            <div>
              <h1 className="up-page-title">Update Patient Record</h1>
              <p className="up-page-sub">CodeCare Hospital Management System</p>
            </div>
          </div>
          <div className="up-header-badge">
            <i className="bi bi-shield-check me-1" />
            Receptionist Portal
          </div>
        </div>

        {/* ── Alerts ── */}
        {message && (
          <div className="up-alert up-alert-ok">
            <i className="bi bi-check-circle-fill" />
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div className="up-alert up-alert-err">
            <i className="bi bi-exclamation-triangle-fill" />
            <span>{error}</span>
          </div>
        )}

        {!updateSuccess ? (
          <>
            {/* ── Search Card ── */}
            <div className="up-card">
              <div className="up-card-header">
                <i className="bi bi-search me-2" />
                Search Patient
              </div>
              <div className="up-card-body">
                <div className="up-search-row">
                  <div className="up-search-field">
                    <label className="up-label">Patient ID</label>
                    <input
                      className="up-input"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="e.g. PAT-XXXXXXXX"
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <button
                    type="button"
                    className="up-btn-primary up-search-btn"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search me-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* ── Edit Form ── */}
            {patient && (
              <form onSubmit={handleSubmit}>

                {/* Patient found banner */}
                <div className="up-found-banner">
                  <i className="bi bi-person-check-fill me-2" />
                  Record found for <strong>{patient.name}</strong>
                  <span className="up-found-id ms-2">({patient.patientId})</span>
                </div>

                <div className="up-two-col">

                  {/* Card 1 – Personal Info */}
                  <div className="up-card">
                    <div className="up-card-header">
                      <i className="bi bi-person-lines-fill me-2" />
                      Personal Information
                    </div>
                    <div className="up-card-body">
                      <div className="up-form-grid">

                        <div className="up-field">
                          <label className="up-label">Full Name <span className="up-req">*</span></label>
                          <input
                            className="up-input"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full legal name"
                            required
                          />
                        </div>

                        <div className="up-field">
                          <label className="up-label">Date of Birth <span className="up-req">*</span></label>
                          <input
                            className="up-input"
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="up-field">
                          <label className="up-label">Gender <span className="up-req">*</span></label>
                          <select
                            className="up-input"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div className="up-field">
                          <label className="up-label">Blood Group <span className="up-req">*</span></label>
                          <select
                            className="up-input"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                          >
                            {bloodGroups.map((bg) => (
                              <option key={bg}>{bg}</option>
                            ))}
                          </select>
                        </div>

                        <div className="up-field">
                          <label className="up-label">Phone Number <span className="up-req">*</span></label>
                          <input
                            className="up-input"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            required
                          />
                        </div>

                        <div className="up-field">
                          <label className="up-label">Address</label>
                          <input
                            className="up-input"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Street, City, State"
                          />
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Card 2 – Emergency Contact */}
                  <div className="up-card">
                    <div className="up-card-header up-card-header-alt">
                      <i className="bi bi-telephone-fill me-2" />
                      Emergency Contact
                    </div>
                    <div className="up-card-body">
                      <div className="up-form-grid">

                        <div className="up-field">
                          <label className="up-label">Contact Name <span className="up-req">*</span></label>
                          <input
                            className="up-input"
                            name="emergencyName"
                            value={formData.emergencyName}
                            onChange={handleChange}
                            placeholder="Full name of contact person"
                            required
                          />
                        </div>

                        <div className="up-field">
                          <label className="up-label">Contact Phone <span className="up-req">*</span></label>
                          <input
                            className="up-input"
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleChange}
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            required
                          />
                        </div>

                      </div>

                      {/* Note block inside emergency card */}
                      <div className="up-info-note">
                        <i className="bi bi-info-circle me-2" />
                        Emergency contacts are notified in case of critical medical events. Ensure the details are current and reachable.
                      </div>
                    </div>
                  </div>

                </div>

                {/* ── Form Actions ── */}
                <div className="up-form-actions">
                  <button
                    type="button"
                    className="up-btn-ghost"
                    onClick={() => navigate("/receptionist/dashboard")}
                  >
                    <i className="bi bi-arrow-left me-2" />
                    Back to Dashboard
                  </button>
                  <button
                    type="submit"
                    className="up-btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="up-spinner" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle me-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </>
        ) : (

          /* ── Success View ── */
          <div className="up-success-wrap">

            <div className="up-success-banner">
              <div className="up-success-icon">
                <i className="bi bi-check-lg" />
              </div>
              <div>
                <div className="up-success-title">Patient Record Updated Successfully</div>
                <div className="up-success-sub">All changes have been saved to the system.</div>
              </div>
            </div>

            <div className="up-card">
              <div className="up-card-header">
                <i className="bi bi-person-vcard me-2" />
                Updated Patient Details
              </div>
              <div className="up-card-body up-summary-body">

                <div className="up-summary-section">
                  <div className="up-summary-section-title">
                    <i className="bi bi-person-lines-fill me-1" /> Personal Information
                  </div>
                  <div className="up-summary-grid">
                    {[
                      ["Patient ID", patient.patientId],
                      ["Full Name", patient.name],
                      ["Date of Birth", formatDob(patient.dob)],
                      ["Gender", patient.gender],
                      ["Blood Group", patient.bloodGroup],
                      ["Phone", patient.phone],
                      ["Address", patient.address || "—"],
                      ["Status", patient.status],
                    ].map(([k, v]) => (
                      <div className="up-summary-row" key={k}>
                        <span className="up-summary-key">{k}</span>
                        <span className="up-summary-val">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="up-summary-divider" />

                <div className="up-summary-section">
                  <div className="up-summary-section-title">
                    <i className="bi bi-telephone-fill me-1" /> Emergency Contact
                  </div>
                  <div className="up-summary-grid">
                    {[
                      ["Contact Name", patient.emergencyContact?.name],
                      ["Contact Phone", patient.emergencyContact?.phone],
                    ].map(([k, v]) => (
                      <div className="up-summary-row" key={k}>
                        <span className="up-summary-key">{k}</span>
                        <span className="up-summary-val">{v || "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="up-form-actions">
              <button
                className="up-btn-ghost"
                onClick={() => navigate("/receptionist/dashboard")}
              >
                <i className="bi bi-arrow-left me-2" />
                Back to Dashboard
              </button>
              <button className="up-btn-outline" onClick={resetForm}>
                <i className="bi bi-pencil-square me-2" />
                Update Another Patient
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default UpdatePatient;

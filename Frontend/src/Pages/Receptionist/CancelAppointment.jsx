import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/CancelAppointment.css";

const CancelAppointment = () => {
  const navigate = useNavigate();

  const [appointmentId, setAppointmentId] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  /* ── Search appointment ──────────────────────────────────── */
  const handleSearch = async () => {
    if (!appointmentId.trim()) {
      toast.warning("Please enter an Appointment ID.");
      return;
    }

    setIsSearching(true);
    setAppointment(null);
    setIsCancelled(false);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/receptionist/appointments/${appointmentId.trim()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Appointment not found.");
        return;
      }

      setAppointment(data.appointment || data);
      setIsCancelled(
        (data.appointment?.status || data.status || "").toLowerCase() === "cancelled"
      );
    } catch (error) {
      console.error("Search Appointment Error:", error);
      toast.error("Failed to connect to the server.");
    } finally {
      setIsSearching(false);
    }
  };

  /* ── Cancel appointment ──────────────────────────────────── */

const showCancelConfirmation = () => {
    toast.dismiss();
  toast.info(
    ({ closeToast }) => (
      <div>
        <p className="mb-3 fw-bold">
          Are you sure you want to cancel this appointment?
        </p>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-secondary"
            onClick={closeToast}
          >
            No
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              closeToast();
              await handleCancel();
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
    }
  );
};

  const handleCancel = async () => {
    

    setIsCancelling(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/receptionist/appointments/${appointmentId.trim()}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to cancel appointment.");
        return;
      }
    
      toast.dismiss();
      toast.success("Appointment cancelled successfully.");
      setIsCancelled(true);
      setAppointment((prev) => ({ ...prev, status: "Cancelled" }));
    } catch (error) {
      console.error("Cancel Appointment Error:", error);
      toast.error("Failed to connect to the server.");
    } finally {
      setIsCancelling(false);
    }
  };

  /* ── Reset ───────────────────────────────────────────────── */
  const handleSearchAnother = () => {
    setAppointmentId("");
    setAppointment(null);
    setIsCancelled(false);
  };

  /* ── Status badge helper ─────────────────────────────────── */
  const getStatusBadge = (status) => {
    if (!status) return <span className="ca-badge ca-badge--default">--</span>;
    const s = status.toLowerCase();
    if (s === "confirmed" || s === "completed")
      return (
        <span className="ca-badge ca-badge--green">
          <i className="bi bi-check-circle-fill"></i> {status}
        </span>
      );
    if (s === "pending")
      return (
        <span className="ca-badge ca-badge--yellow">
          <i className="bi bi-clock-fill"></i> {status}
        </span>
      );
    if (s === "cancelled")
      return (
        <span className="ca-badge ca-badge--red">
          <i className="bi bi-x-circle-fill"></i> {status}
        </span>
      );
    return (
      <span className="ca-badge ca-badge--default">{status}</span>
    );
  };

  /* ── Format date ─────────────────────────────────────────── */
  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="ca-wrapper">
      <div className="ca-container">

        {/* ── Header ── */}
        <header className="ca-header">
          <div className="ca-header__left">
            <div className="ca-header__icon">
              <i className="bi bi-calendar-x"></i>
            </div>
            <div className="ca-header__text">
              <h2 className="ca-header__title">Cancel Appointment</h2>
              <p className="ca-header__subtitle">
                <i className="bi bi-hospital"></i>
                CodeCare Hospital Management System
              </p>
            </div>
          </div>
          <div className="ca-header__badge">
            <i className="bi bi-person-badge"></i>
            Receptionist Portal
          </div>
        </header>

        {/* ── Page body ── */}
        <div className="ca-body">

          {/* ── LEFT: Search card ── */}
          <div className="ca-card ca-card--search">
            <div className="ca-card__header">
              <i className="bi bi-search"></i>
              Search Appointment
            </div>
            <div className="ca-card__body">

              <div className="ca-field">
                <label className="ca-label">
                  <i className="bi bi-hash"></i>
                  Appointment ID
                </label>
                <div className="ca-input-wrap">
                  <i className="bi bi-calendar2-event ca-input-icon"></i>
                  <input
                    className="ca-input"
                    type="text"
                    placeholder="Enter Appointment ID"
                    value={appointmentId}
                    onChange={(e) => setAppointmentId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>

              <div className="ca-actions">
                <button
                  className="ca-btn ca-btn--ghost"
                  onClick={() => navigate("/receptionist/dashboard")}
                >
                  <i className="bi bi-arrow-left"></i>
                  Back
                </button>
                <button
                  className="ca-btn ca-btn--primary"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <span className="ca-spinner"></span>
                      Searching…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search"></i>
                      Search Appointment
                    </>
                  )}
                </button>
              </div>

              {appointment && (
                <div className="ca-reset-row">
                  <button
                    className="ca-btn ca-btn--outline"
                    onClick={handleSearchAnother}
                  >
                    <i className="bi bi-arrow-repeat"></i>
                    Search Another Appointment
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* ── RIGHT: Details card (shown after search) ── */}
          {appointment && (
            <div className="ca-card ca-card--details">
              <div className="ca-card__header">
                <i className="bi bi-calendar2-check"></i>
                Appointment Details
              </div>
              <div className="ca-card__body">

                {/* Appointment ID highlighted box */}
                <div className="ca-id-box">
                  <p className="ca-id-box__label">
                    <i className="bi bi-hash"></i>
                    Appointment ID
                  </p>
                  <p className="ca-id-box__value">
                    {appointment.appointmentId || appointment._id || "--"}
                  </p>
                </div>

                {/* Info rows */}
                <ul className="ca-info-list">
                  <li className="ca-info-list__item">
                    <span className="ca-info-list__key">
                      <i className="bi bi-person"></i>
                      Patient Name
                    </span>
                    <span className="ca-info-list__val">
                      {appointment.patient?.name || "--"}
                    </span>
                  </li>

                  <li className="ca-info-list__item">
                    <span className="ca-info-list__key">
                      <i className="bi bi-person-badge"></i>
                      Doctor
                    </span>
                    <span className="ca-info-list__val">
                      {appointment.doctor?.name ||
                        appointment.doctorId?.name ||
                        "--"}
                    </span>
                  </li>

                  <li className="ca-info-list__item">
                    <span className="ca-info-list__key">
                      <i className="bi bi-building-cross"></i>
                      Department
                    </span>
                    <span className="ca-info-list__val">
                      {appointment.department || "--"}
                    </span>
                  </li>

                  <li className="ca-info-list__item">
                    <span className="ca-info-list__key">
                      <i className="bi bi-calendar3"></i>
                      Date
                    </span>
                    <span className="ca-info-list__val">
                      {formatDate(appointment.date)}
                    </span>
                  </li>

                  <li className="ca-info-list__item">
                    <span className="ca-info-list__key">
                      <i className="bi bi-clock"></i>
                      Time
                    </span>
                    <span className="ca-info-list__val">
                      {appointment.time || "--"}
                    </span>
                  </li>

                  <li className="ca-info-list__item">
                    <span className="ca-info-list__key">
                      <i className="bi bi-circle-half"></i>
                      Status
                    </span>
                    <span className="ca-info-list__val">
                      {getStatusBadge(appointment.status)}
                    </span>
                  </li>
                </ul>

                {/* Divider */}
                <div className="ca-divider"></div>

                {/* Cancel button */}
                <button
                  className="ca-btn ca-btn--danger ca-btn--full"
                  onClick={showCancelConfirmation}
                  disabled={isCancelled || isCancelling}
                >
                  {isCancelling ? (
                    <>
                      <span className="ca-spinner ca-spinner--white"></span>
                      Cancelling…
                    </>
                  ) : isCancelled ? (
                    <>
                      <i className="bi bi-x-circle-fill"></i>
                      Appointment Cancelled
                    </>
                  ) : (
                    <>
                      <i className="bi bi-calendar-x-fill"></i>
                      Cancel Appointment
                    </>
                  )}
                </button>

                {isCancelled && (
                  <p className="ca-cancelled-note">
                    <i className="bi bi-info-circle"></i>
                    This appointment has been successfully cancelled and can no longer be modified.
                  </p>
                )}

              </div>
            </div>
          )}

        </div>
        {/* end .ca-body */}

      </div>
    </div>
  );
};

export default CancelAppointment;
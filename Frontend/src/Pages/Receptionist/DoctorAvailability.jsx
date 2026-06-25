import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DoctorAvailability.css";

const getAvailabilityStatus = (booked, limit) => {
  if (booked >= limit) return "fully-booked";
  if (booked >= 16) return "almost-full";
  return "available";
};

const getStatusLabel = (status) => {
  if (status === "fully-booked") return "Fully Booked";
  if (status === "almost-full") return "Almost Full";
  return "Available";
};

const getStatusIcon = (status) => {
  if (status === "fully-booked") return "bi-x-circle-fill";
  if (status === "almost-full") return "bi-exclamation-circle-fill";
  return "bi-check-circle-fill";
};

const getDepartmentIcon = (department) => {
  const icons = {
    Neurology: "bi-brain",
    Cardiology: "bi-heart-pulse",
    Orthopedics: "bi-bandaid",
    Pediatrics: "bi-balloon-heart",
    Dermatology: "bi-droplet",
    Radiology: "bi-activity",
    Oncology: "bi-capsule",
    Gynecology: "bi-person-hearts",
    Ophthalmology: "bi-eye",
    ENT: "bi-ear",
    Psychiatry: "bi-emoji-smile",
    Urology: "bi-shield-plus",
  };
  return icons[department] || "bi-hospital";
};

const getAvatarInitials = (name) => {
  return name
    .replace("Dr ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const DEPARTMENTS = [
  "All Departments",
  "Neurology",
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Radiology",
  "Oncology",
  "Gynecology",
  "Ophthalmology",
  "ENT",
  "Psychiatry",
  "Urology",
];

const DoctorAvailability = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [refreshing, setRefreshing] = useState(false);

  const fetchDoctors = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);

      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/receptionist/doctor-availability",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch doctor availability.");
        return;
      }

      setDoctors(data);
      setError(null);
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        selectedDepartment === "All Departments" ||
        doc.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [doctors, searchQuery, selectedDepartment]);

  const stats = useMemo(() => {
    const available = doctors.filter(
      (d) => getAvailabilityStatus(d.booked, d.limit) === "available"
    ).length;
    const almostFull = doctors.filter(
      (d) => getAvailabilityStatus(d.booked, d.limit) === "almost-full"
    ).length;
    const fullyBooked = doctors.filter(
      (d) => getAvailabilityStatus(d.booked, d.limit) === "fully-booked"
    ).length;
    return { available, almostFull, fullyBooked };
  }, [doctors]);

  return (
    <div className="da-wrapper">
      <div className="da-container">

        {/* ── Header ── */}
        <header className="da-header">
          <div className="da-header__left">
            <div className="da-header__icon">
              <i className="bi bi-person-lines-fill"></i>
            </div>
            <div className="da-header__text">
              <h2 className="da-header__title">Doctor Availability</h2>
              <p className="da-header__subtitle">
                <i className="bi bi-hospital"></i>
                CodeCare Hospital Management System
              </p>
            </div>
          </div>
          <div className="da-header__right">
            <div className="da-header__badge">
              <i className="bi bi-person-badge"></i>
              Receptionist Portal
            </div>
            <button
              className="da-btn da-btn--back"
              onClick={() => navigate("/receptionist/dashboard")}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>
          </div>
        </header>

        {/* ── Stats Row ── */}
        {!loading && !error && (
          <div className="da-stats">
            <div className="da-stat da-stat--available">
              <div className="da-stat__icon">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <div className="da-stat__body">
                <span className="da-stat__count">{stats.available}</span>
                <span className="da-stat__label">Available</span>
              </div>
            </div>
            <div className="da-stat da-stat--almost">
              <div className="da-stat__icon">
                <i className="bi bi-exclamation-circle-fill"></i>
              </div>
              <div className="da-stat__body">
                <span className="da-stat__count">{stats.almostFull}</span>
                <span className="da-stat__label">Almost Full</span>
              </div>
            </div>
            <div className="da-stat da-stat--full">
              <div className="da-stat__icon">
                <i className="bi bi-x-circle-fill"></i>
              </div>
              <div className="da-stat__body">
                <span className="da-stat__count">{stats.fullyBooked}</span>
                <span className="da-stat__label">Fully Booked</span>
              </div>
            </div>
            <div className="da-stat da-stat--total">
              <div className="da-stat__icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="da-stat__body">
                <span className="da-stat__count">{doctors.length}</span>
                <span className="da-stat__label">Total Doctors</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Toolbar ── */}
        <div className="da-toolbar">
          <div className="da-search">
            <i className="bi bi-search da-search__icon"></i>
            <input
              className="da-search__input"
              type="text"
              placeholder="Search by doctor name or department…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="da-search__clear"
                onClick={() => setSearchQuery("")}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          <div className="da-filter">
            <i className="bi bi-funnel da-filter__icon"></i>
            <select
              className="da-filter__select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <button
            className={`da-btn da-btn--refresh ${refreshing ? "da-btn--spinning" : ""}`}
            onClick={() => fetchDoctors(true)}
            disabled={refreshing}
          >
            <i className="bi bi-arrow-clockwise"></i>
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* ── Content ── */}
        {loading && (
          <div className="da-state da-state--loading">
            <div className="da-spinner"></div>
            <p className="da-state__text">Loading doctor availability…</p>
          </div>
        )}

        {error && !loading && (
          <div className="da-state da-state--error">
            <div className="da-state__icon">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <p className="da-state__text">{error}</p>
            <button
              className="da-btn da-btn--primary"
              onClick={() => fetchDoctors()}
            >
              <i className="bi bi-arrow-clockwise"></i>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredDoctors.length === 0 && (
          <div className="da-state da-state--empty">
            <div className="da-state__icon">
              <i className="bi bi-person-slash"></i>
            </div>
            <p className="da-state__text">No doctors found.</p>
            <p className="da-state__sub">Try adjusting the search or filter.</p>
          </div>
        )}

        {!loading && !error && filteredDoctors.length > 0 && (
          <div className="da-grid">
            {filteredDoctors.map((doc) => {
              const status = getAvailabilityStatus(doc.booked, doc.limit);
              const pct = Math.min((doc.booked / doc.limit) * 100, 100);
              const initials = getAvatarInitials(doc.name);
              const deptIcon = getDepartmentIcon(doc.department);

              return (
                <div key={doc._id} className={`da-card da-card--${status}`}>
                  <div className="da-card__header">
                    <div className={`da-avatar da-avatar--${status}`}>
                      {initials}
                    </div>
                    <span className={`da-badge da-badge--${status}`}>
                      <i className={`bi ${getStatusIcon(status)}`}></i>
                      {getStatusLabel(status)}
                    </span>
                  </div>

                  <div className="da-card__body">
                    <h3 className="da-doctor-name">{doc.name}</h3>

                    <div className="da-doctor-meta">
                      <span className="da-meta-item">
                        <i className={`bi ${deptIcon}`}></i>
                        {doc.department}
                      </span>
                      <span className="da-meta-item">
                        <i className="bi bi-clock"></i>
                        {doc.schedule}
                      </span>
                    </div>

                    <div className="da-progress-section">
                      <div className="da-progress-label">
                        <span>Today's Appointments</span>
                        <span className="da-progress-count">
                          <strong>{doc.booked}</strong> / {doc.limit}
                        </span>
                      </div>
                      <div className="da-progress">
                        <div
                          className={`da-progress-fill da-progress-fill--${status}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <div className="da-progress-hint">
                        {doc.limit - doc.booked > 0
                          ? `${doc.limit - doc.booked} slot${doc.limit - doc.booked > 1 ? "s" : ""} remaining`
                          : "No slots remaining"}
                      </div>
                    </div>
                  </div>

                  <div className="da-footer">
                    <button
                      className={`da-btn da-btn--action da-btn--action-${status}`}
                      disabled={status === "fully-booked"}
                    >
                      {status === "fully-booked" ? (
                        <>
                          <i className="bi bi-slash-circle"></i>
                          Fully Booked
                        </>
                      ) : status === "almost-full" ? (
                        <>
                          <i className="bi bi-calendar2-plus"></i>
                          Book Appointment
                        </>
                      ) : (
                        <>
                          <i className="bi bi-calendar2-check"></i>
                          Book Appointment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorAvailability;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/AdminService";
import { toast } from "react-toastify";
import "../../styles/AddPatient.css";

const AddUser = () => {
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
  username: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "Receptionist",
  gender: "",
  bloodGroup: "",
  address: "",
  qualification: "",
  birthDate: "",
  dateOfJoining: "",
  isActive: true
});

const [errors, setErrors] = useState({});

const changeHandler = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]:
      name === "isActive"
        ? value === "true"
        : value
  });

  setErrors((prev) => ({
    ...prev,
    [name]: ""
  }));
};

 const validateForm = () => {
  let newErrors = {};

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const fullNameRegex = /^[\p{L} .'-]{2,50}$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!formData.username.trim()) {
    newErrors.username = "Username is required";
  } else if (!usernameRegex.test(formData.username)) {
    newErrors.username =
      "Only letters, numbers and underscore allowed";
  }

     if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (!fullNameRegex.test(formData.fullName)) {
      newErrors.fullName = "Name contains invalid characters or is too short";
    }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid Email Address";
  }

  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone Number is required";
  } else if (!phoneRegex.test(formData.phoneNumber)) {
    newErrors.phoneNumber =
      "Must be a valid 10 digit Indian number";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password =
      "Password must be at least 6 characters";
  }

  if (!formData.gender) {
    newErrors.gender = "Please select Gender";
  }

  if (!formData.bloodGroup) {
    newErrors.bloodGroup =
      "Please select Blood Group";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const submitHandler = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.warning("Please fix the errors");
    return;
  }

  try {
    await createUser(formData);
    console.log(formData);
    toast.success("User Created Successfully");

    navigate("/admin/users");
  } catch (err) {
    console.log(err);

    toast.error(
      err?.response?.data?.message ||
      "Failed to Create User"
    );
  }
};
  
const [loading, setLoading] = useState(false);
return (
  <div className="ap-wrapper">
    <div className="ap-container">

     {/* Header */}
<div className="ap-header">

  <button
    type="button"
    className="ap-back-btn"
    onClick={() => navigate("/admin/users")}
  >
    <i className="bi bi-arrow-left"></i>
  </button>

  <div className="ap-header-icon">
    <i className="bi bi-person-plus-fill"></i>
  </div>

  <div>
    <h2 className="ap-title">Add New User</h2>
    <p className="ap-subtitle">
      CodeCare Hospital Management System
    </p>
  </div>

</div>

      <form onSubmit={submitHandler} className="ap-form">

        {/* Account Information */}

        <div className="ap-section-label">
          Account Information
        </div>

        <div className="ap-grid-2">

          <div className="ap-field">
            <label>Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </div>

          <div className="ap-field">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={changeHandler}
            />
            {errors.fullName && (
              <small className="text-danger">{errors.fullName}</small>
            )}
          </div>

          <div className="ap-field">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="ap-field">
            <label>Phone Number *</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={changeHandler}
              maxLength={10}
            />
            {errors.phoneNumber && (
              <small className="text-danger">{errors.phoneNumber}</small>
            )}
          </div>

          <div className="ap-field">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <div className="ap-field">
            <label>Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={changeHandler}
            >
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Lab Technician">Lab Technician</option>
            </select>
          </div>

        </div>

        {/* Personal Information */}

        <div className="ap-section-label mt-3">
          Personal Information
        </div>

        <div className="ap-grid-2">

          <div className="ap-field">
            <label>Gender *</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={changeHandler}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {errors.gender && (
              <small className="text-danger">{errors.gender}</small>
            )}
          </div>

          <div className="ap-field">
            <label>Blood Group *</label>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={changeHandler}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {errors.bloodGroup && (
              <small className="text-danger">{errors.bloodGroup}</small>
            )}
          </div>

          <div className="ap-field">
            <label>Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={changeHandler}
            />
          </div>

          <div className="ap-field">
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={changeHandler}
            />
          </div>

        </div>

        <div className="ap-field mt-3">
          <label>Address</label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={changeHandler}
          />
        </div>

        {/* Employment */}

        <div className="ap-section-label mt-3">
          Employment Information
        </div>

        <div className="ap-grid-2">

          <div className="ap-field">
            <label>Date Of Joining</label>

            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={changeHandler}
            />
          </div>

          <div className="ap-field">
            <label>Status</label>

            <select
              name="isActive"
              value={formData.isActive.toString()}
              onChange={changeHandler}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

        </div>

        <div className="ap-actions">

          <button
            type="button"
            className="ap-btn-ghost"
            onClick={() => navigate("/admin/users")}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>

          <button
            type="submit"
            className="ap-btn-primary"
            disabled={loading}
          >
            <i className="bi bi-person-plus-fill me-1"></i>

            {loading ? "Creating..." : "Create User"}
          </button>

        </div>

      </form>

    </div>
  </div>
);

};

export default AddUser;
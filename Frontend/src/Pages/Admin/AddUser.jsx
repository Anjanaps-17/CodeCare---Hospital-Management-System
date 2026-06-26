import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/AdminService";
import { toast } from "react-toastify";

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
  
return (

  <div className="container mt-4">
    <div className="card shadow border-0">
      <div
        className="card-header text-white"
        style={{
          background: "linear-gradient(90deg,#008b8b,#0ea5a4)",
        }}
      >
        <h3 className="mb-0">👤 Add New User</h3>
      </div>


  <div className="card-body p-4">
    <form onSubmit={submitHandler}>

      {/* Account Information */}
      <h5 className="mb-3" style={{ color: "#008b8b" }}>
         Account Information
      </h5>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={formData.username}
            onChange={changeHandler}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            value={formData.fullName}
            onChange={changeHandler}
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={changeHandler}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            value={formData.phoneNumber}
            onChange={changeHandler}
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={changeHandler}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            className="form-select"
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

      <hr />

      {/* Personal Information */}
      <h5 className="mb-3" style={{ color: "#008b8b" }}>
         Personal Information
      </h5>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            value={formData.gender}
            onChange={changeHandler}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Blood Group</label>
          <select
            name="bloodGroup"
            className={`form-select ${errors.bloodGroup ? "is-invalid" : ""}`}
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
            <div className="invalid-feedback">{errors.bloodGroup}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            className="form-control"
            value={formData.birthDate}
            onChange={changeHandler}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Qualification</label>
          <input
            type="text"
            name="qualification"
            className="form-control"
            value={formData.qualification}
            onChange={changeHandler}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          name="address"
          rows="3"
          className="form-control"
          value={formData.address}
          onChange={changeHandler}
        />
      </div>

      <hr />

      {/* Employment Information */}
      <h5 className="mb-3" style={{ color: "#008b8b" }}>
         Employment Information
      </h5>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Date Of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            className="form-control"
            value={formData.dateOfJoining}
            onChange={changeHandler}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Status</label>
          <select
            name="isActive"
            className="form-select"
            value={formData.isActive.toString()}
            onChange={changeHandler}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="text-end mt-4">
        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: "#008b8b",
            color: "white",
            padding: "10px 25px",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          ✅ Create User
        </button>
      </div>

    </form>
  </div>
</div>
  </div>
);

};

export default AddUser;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserById,
  updateUser,
} from "../../api/AdminService";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",

    gender: "",
    bloodGroup: "",
    address: "",
    qualification: "",

    birthDate: "",
    dateOfJoining: "",

    isActive: true
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);

      const user = response.data;

      setFormData({
  username: user.username,
  fullName: user.fullName || "",
  email: user.email || "",
  phoneNumber: user.phoneNumber || "",
  password: "",
  role: user.role,
  gender: user.gender || "",
  bloodGroup: user.bloodGroup || "",
  address: user.address || "",
  qualification: user.qualification || "",
  birthDate: user.birthDate
    ? user.birthDate.substring(0, 10)
    : "",
  dateOfJoining: user.dateOfJoining
    ? user.dateOfJoining.substring(0, 10)
    : "",
  isActive: user.isActive
});

    } catch (error) {
      console.log(error);
      toast.info("Failed to load user");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "isActive"
          ? value === "true"
          : value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const usernameRegex =
      /^[a-zA-Z0-9_]{3,20}$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(formData.username)) {
      return toast.error("Invalid Username");
    }

    if (!emailRegex.test(formData.email)) {
      return toast.error("Invalid Email");
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      return toast.error("Invalid Phone Number");
    }

    try {
      const updateData = {
  fullName: formData.fullName,
  username: formData.username,
  email: formData.email,
  phoneNumber: formData.phoneNumber,
  role: formData.role,
  gender: formData.gender,
  bloodGroup: formData.bloodGroup,
  address: formData.address,
  qualification: formData.qualification,
  birthDate: formData.birthDate,
  dateOfJoining: formData.dateOfJoining,
  isActive: formData.isActive
};
      if (formData.password.trim() !== "") {
        updateData.password =
          formData.password;
      }

      await updateUser(id, updateData);

      toast.success("User updated successfully");

      navigate("/admin/users");

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to update user"
      );
    }
  };

  return (
  <div className="page-wrapper">
    <div className="card shadow border-0">
      <div
        className="card-header text-white"
        style={{
          background: "linear-gradient(90deg,#008b8b,#0ea5a4)",
        }}
      >
        <h3 className="mb-0"> Edit User</h3>
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
                className="form-control"
                value={formData.username}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={changeHandler}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={changeHandler}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Password (Optional)</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={changeHandler}
              />
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
                <option value="Lab Technician">
                  Lab Technician
                </option>
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
                className="form-select"
                value={formData.gender}
                onChange={changeHandler}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Blood Group</label>
              <select
                name="bloodGroup"
                className="form-select"
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
              <label className="form-label">
                Qualification
              </label>
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
              <label className="form-label">
                Date Of Joining
              </label>
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

          <div className="d-flex justify-content-end gap-2 mt-4">
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
               Update User
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);
};

export default EditUser;
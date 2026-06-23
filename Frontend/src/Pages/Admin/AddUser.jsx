import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/AdminService";
import { toast } from "react-toastify";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!usernameRegex.test(formData.username)) {
      return toast.warning(
        "Username must contain only letters, numbers and underscore"
      );
    }

    if (!emailRegex.test(formData.email)) {
      return toast.warning("Invalid Email Address");
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      return toast.warning("Invalid Phone Number");
    }

    try {
      await createUser(formData);

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

      <div className="card shadow">
        <div className="card-body">

          <h3 className="mb-4">Add User</h3>

          <form onSubmit={submitHandler}>

            <div className="mb-3">
              <label>Username</label>

              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone Number</label>

              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>

              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>Role</label>

              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={changeHandler}
              >
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Receptionist">
                  Receptionist
                </option>
                <option value="Lab Technician">
                  Lab Technician
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label>Gender</label>

              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={changeHandler}
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label>Blood Group</label>

              <select
                name="bloodGroup"
                className="form-select"
                value={formData.bloodGroup}
                onChange={changeHandler}
              >
                <option value="">
                  Select Blood Group
                </option>

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

            <div className="mb-3">
              <label>Address</label>

              <textarea
                name="address"
                rows="3"
                className="form-control"
                value={formData.address}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Qualification</label>

              <input
                type="text"
                name="qualification"
                className="form-control"
                value={formData.qualification}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Birth Date</label>

              <input
                type="date"
                name="birthDate"
                className="form-control"
                value={formData.birthDate}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Date Of Joining</label>

              <input
                type="date"
                name="dateOfJoining"
                className="form-control"
                value={formData.dateOfJoining}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-4">
              <label>Status</label>

              <select
                name="isActive"
                className="form-select"
                value={formData.isActive.toString()}
                onChange={changeHandler}
              >
                <option value="true">
                  Active
                </option>

                <option value="false">
                  Inactive
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-theme"
            >
              Create User
            </button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default AddUser;
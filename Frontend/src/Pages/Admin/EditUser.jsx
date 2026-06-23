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
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        password: "",
        role: user.role || "",

        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
        address: user.address || "",
        qualification: user.qualification || "",

        birthDate: user.birthDate
          ? user.birthDate.split("T")[0]
          : "",

        dateOfJoining: user.dateOfJoining
          ? user.dateOfJoining.split("T")[0]
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
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">

          <h3 className="mb-4">
            Edit User
          </h3>

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
              <label>New Password (Optional)</label>

              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={changeHandler}
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
                <option value="Admin">
                  Admin
                </option>

                <option value="Doctor">
                  Doctor
                </option>

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
                className="form-select"
                name="gender"
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
                className="form-select"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={changeHandler}
              >
                <option value="">
                  Select Blood Group
                </option>

                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Address</label>

              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={formData.address}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Qualification</label>

              <input
                type="text"
                className="form-control"
                name="qualification"
                value={formData.qualification}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Birth Date</label>

              <input
                type="date"
                className="form-control"
                name="birthDate"
                value={formData.birthDate}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Date Of Joining</label>

              <input
                type="date"
                className="form-control"
                name="dateOfJoining"
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

            <div className="d-flex gap-2">

              <button
                type="submit"
                className="btn-theme"
              >
                Update User
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/admin/users")
                }
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
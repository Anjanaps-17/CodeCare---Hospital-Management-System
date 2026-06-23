import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserById,
  updateUser,
} from "../../api/AdminService";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    isActive: true,
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
        password: "",
        role: user.role,
        isActive: user.isActive,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load user");
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]:
        name === "isActive"
          ? value === "true"
          : value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const updateData = {
        username: formData.username,
        role: formData.role,
        isActive: formData.isActive,
      };

      if (formData.password.trim() !== "") {
        updateData.password = formData.password;
      }

      await updateUser(id, updateData);

      alert("User updated successfully");

      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      alert("Failed to update user");
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
              <label className="form-label">
                Username
              </label>

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
              <label className="form-label">
                New Password (Optional)
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Role
              </label>

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

            <div className="mb-4">
              <label className="form-label">
                Status
              </label>

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
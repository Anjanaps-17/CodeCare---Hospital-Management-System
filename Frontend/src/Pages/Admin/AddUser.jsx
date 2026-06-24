import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/AdminService";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Receptionist",
    isActive: true,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "isActive"
          ? value === "true"
          : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);

      alert("User created successfully");

      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      alert("Failed to create user");
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
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>Role</label>

              <select
                name="role"
                className="form-select"
                onChange={changeHandler}
              >
                <option>Admin</option>
                <option>Doctor</option>
                <option>Receptionist</option>
                <option>Lab Technician</option>
              </select>
            </div>

            <button
              className="btn-theme"
              type="submit"
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
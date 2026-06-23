import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  getDepartments,
  createDoctor
} from "../../api/AdminService";

const AddDoctor = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    department: "",
    schedule: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await getUsers();
      const departmentsResponse = await getDepartments();

      const doctorUsers = usersResponse.data.filter(
        (user) => user.role === "Doctor"
      );

      setUsers(doctorUsers);
      setDepartments(departmentsResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createDoctor(formData);

      alert("Doctor added successfully");

      navigate("/admin/doctors");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to create doctor"
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h3>Add Doctor</h3>
        </div>

        <div className="card-body">
          <form onSubmit={submitHandler}>

            <div className="mb-3">
              <label className="form-label">
                Doctor User
              </label>

              <select
                className="form-select"
                name="userId"
                value={formData.userId}
                onChange={changeHandler}
                required
              >
                <option value="">
                  Select Doctor User
                </option>

                {users.map((user) => (
                  <option
                    key={user._id}
                    value={user._id}
                  >
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Doctor Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Department
              </label>

              <select
                className="form-select"
                name="department"
                value={formData.department}
                onChange={changeHandler}
                required
              >
                <option value="">
                  Select Department
                </option>

                {departments.map((dept) => (
                  <option
                    key={dept._id}
                    value={dept._id}
                  >
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Schedule
              </label>

              <input
                type="text"
                className="form-control"
                name="schedule"
                value={formData.schedule}
                onChange={changeHandler}
                placeholder="Mon-Fri 9AM - 5PM"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Save Doctor
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/doctors")}
            >
              Cancel
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
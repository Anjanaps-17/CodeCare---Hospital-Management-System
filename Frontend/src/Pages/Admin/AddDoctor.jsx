import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUsers,
  getDepartments,
  createDoctor
} from "../../api/AdminService";

import PageHeader from "../../components/common/PageHeader";

const AddDoctor = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

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

      const doctorUsers =
        usersResponse?.data?.filter(
          (user) => user.role === "Doctor"
        ) || [];

      setUsers(doctorUsers);
      setDepartments(departmentsResponse?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "userId") {
      const selectedUser = users.find(
        (user) => user._id === value
      );

      setFormData({
        ...formData,
        userId: value,
        name: selectedUser?.fullName || ""
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createDoctor(formData);

      toast.success("Doctor registered successfully");

      setTimeout(() => {
        navigate("/admin/doctors");
      }, 1000);
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to create doctor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container py-4">
        <div
          className="mx-auto bg-white shadow rounded-4 p-4"
          style={{ maxWidth: "900px" }}
        > 

        <PageHeader
    title="Add Doctor"
    icon="bi bi-person-plus-fill"
    // backPath="/admin/doctor"
/>
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-success text-white me-3"
              style={{
                width: "60px",
                height: "60px",
                fontSize: "24px",
              }}
            >
              <i className="bi bi-person-vcard-fill"></i>
            </div>

            <div>
              <h2 className="fw-bold mb-1">
                Register Doctor
              </h2>
              <p className="text-muted mb-0">
                CodeCare Hospital Management System
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <h5 className="border-bottom pb-2 text-success">
                Doctor Information
              </h5>
            </div>

            <div className="row">
              {/* Doctor User */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Doctor User *
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

                  {(users || []).map((user) => (
                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.username} - {user.fullName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Doctor Name *
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  readOnly
                />
              </div>

              {/* Department */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Department *
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

                  {(departments || []).map((dept) => (
                    <option
                      key={dept._id}
                      value={dept._id}
                    >
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Schedule */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
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
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  navigate("/admin/doctors")
                }
              >
                Back
              </button>

              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Doctor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getDoctorById,
  updateDoctor,
  getDepartments
} from "../../api/AdminService";
import PageHeader from "../../components/common/PageHeader";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    schedule: ""
  });

  useEffect(() => {
    fetchDoctor();
    fetchDepartments();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await getDoctorById(id);

      setFormData({
        name: response.data.name,
        department: response.data.department?._id || "",
        schedule: response.data.schedule || ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
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
      await updateDoctor(id, formData);

      toast.success("Doctor updated successfully");

      navigate("/admin/doctors");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to update doctor"
      );
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card shadow">
        <div className="card-header">
          <h3>Edit Doctor</h3>
        </div>

        <div className="card-body">
          <form onSubmit={submitHandler}>
 <PageHeader
    title="Doctor"
    icon="bi bi-person-plus-fill"
    backPath="/admin/doctor"
/>
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
                placeholder="Mon-Fri 9AM-5PM"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              Update Doctor
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                navigate("/admin/doctors")
              }
            >
              Cancel
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDepartmentById,
  updateDepartment,
} from "../../api/AdminService";

const EditDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await getDepartmentById(id);

      setFormData({
        name: response.data.name,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateDepartment(id, formData);

      alert("Department Updated Successfully");

      navigate("/admin/departments");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Failed to update department"
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h3>Edit Department</h3>
        </div>

        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">
                Department Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={changeHandler}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning me-2"
            >
              Update
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                navigate("/admin/departments")
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

export default EditDepartment;
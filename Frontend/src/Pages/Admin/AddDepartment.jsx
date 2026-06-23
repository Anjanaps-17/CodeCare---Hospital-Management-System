import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDepartment } from "../../api/AdminService";

const AddDepartment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createDepartment(formData);

      alert("Department Added Successfully");

      navigate("/admin/departments");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
        "Failed to add department"
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h3>Add Department</h3>
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
              className="btn btn-success me-2"
            >
              Save
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

export default AddDepartment;
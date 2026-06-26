import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDepartments,
  deleteDepartment
} from "../../api/AdminService";
import PageHeader from "../../components/common/PageHeader";

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Department?")) return;

    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch (err) {
      console.log(err);
    }
  };

return (
  <div className="ap-wrapper">
    <div className="ap-container">

      <PageHeader
        title="Departments"
        icon="bi bi-building-fill"
        backPath="/admin/dashboard"
      />

      {/* <div className="text-center mb-4">
        <button
          className="ap-btn-primary"
          onClick={() => navigate("/admin/departments/add")}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Department
        </button>
      </div> */}
<div className="d-flex justify-content-end align-items-center mb-3">
  <button
    className="ap-btn-primary"
    onClick={() => navigate("/admin/departments/add")}
  >
    <i className="bi bi-plus-circle me-2"></i>
    Add Department
  </button>
</div>
      <div className="ap-card">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>Department Name</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td>{department.name}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      navigate(`/admin/departments/edit/${department._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(department._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);
 
};

export default Departments;


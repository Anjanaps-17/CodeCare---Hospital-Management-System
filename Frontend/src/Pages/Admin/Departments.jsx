import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDepartments,
  deleteDepartment
} from "../../api/AdminService";

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
    <div className="page-wrapper">
      <div className="d-flex justify-content-between mb-3">
        <h2>Department Management</h2>

        <button
          className="btn btn-success"
          onClick={() =>
            navigate("/admin/departments/add")
          }
        >
          Add Department
        </button>
      </div>

      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Actions</th>
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
                    navigate(
                      `/admin/departments/edit/${department._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(department._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departments;
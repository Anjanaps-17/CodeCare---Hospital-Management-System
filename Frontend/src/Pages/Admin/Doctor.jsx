import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoctors,
  deleteDoctor
} from "../../api/AdminService";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete doctor?")) return;

    await deleteDoctor(id);
    fetchDoctors();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Doctor Management</h2>

        <button
          className="btn btn-success"
          onClick={() =>
            navigate("/admin/doctors/add")
          }
        >
          Add Doctor
        </button>
      </div>

      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Department</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>

              <td>
                {doctor.userId?.username}
              </td>

              <td>
                {doctor.department?.name}
              </td>

              <td>{doctor.schedule}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate(
                      `/admin/doctors/edit/${doctor._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(doctor._id)
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

export default Doctors;
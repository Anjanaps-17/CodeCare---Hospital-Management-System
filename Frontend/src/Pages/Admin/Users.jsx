import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../api/AdminService";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">
        <h2>User Management</h2>

        <button
          className="btn-theme"
          style={{ width: "200px" }}
          onClick={() => navigate("/admin/users/add")}
        >
          Add User
        </button>
      </div>

      <div className="card shadow">
        <div className="card-body">

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th width="220">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>

                  <td>{user.role}</td>

                  <td>
                    {user.isActive ? "Active" : "Inactive"}
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        navigate(
                          `/admin/users/edit/${user._id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(user._id)
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
      </div>
    </div>
  );
};

export default Users;
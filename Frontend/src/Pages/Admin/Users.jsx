import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../api/AdminService";
import { toast } from "react-toastify";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          style={{
            color: "#008b8b",
            fontWeight: "700",
          }}
        >
          👥 User Management
        </h2>

        <button
          className="btn"
          style={{
            backgroundColor: "#008b8b",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px",
            padding: "8px 18px",
          }}
          onClick={() => navigate("/admin/users/add")}
        >
          ➕ Add User
        </button>
      </div>

      {/* Table Card */}
      <div
        className="card shadow-sm border-0"
        style={{
          borderRadius: "12px",
        }}
      >
        <div className="card-body p-0">
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover mb-0"
              style={{
                verticalAlign: "middle",
              }}
            >
              <thead
                style={{
                  background:
                    "linear-gradient(90deg,#008b8b,#0ea5a4)",
                  color: "white",
                }}
              >
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Gender</th>
                  <th>🩸</th>
                  <th>Status</th>
                  <th width="120">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-4"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>

                      <td>
                        {user.fullName || (
                          <span className="text-muted">-</span>
                        )}
                      </td>

                      <td>
                        {user.email || (
                          <span className="text-muted">-</span>
                        )}
                      </td>

                      <td>
                        {user.phoneNumber || (
                          <span className="text-muted">-</span>
                        )}
                      </td>

                      <td>
                        <span className="badge bg-info text-dark">
                          {user.role}
                        </span>
                      </td>

                      <td>
                        {user.gender || (
                          <span className="text-muted">-</span>
                        )}
                      </td>

                      <td>
                        {user.bloodGroup || (
                          <span className="text-muted">-</span>
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            user.isActive
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {user.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm me-2"
                          style={{
                            backgroundColor: "#fff3cd",
                            border: "1px solid #ffc107",
                            borderRadius: "6px",
                          }}
                          title="Edit User"
                          onClick={() =>
                            navigate(
                              `/admin/users/edit/${user._id}`
                            )
                          }
                        >
                          ✏️
                        </button>

                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#ffe5e5",
                            border: "1px solid #dc3545",
                            borderRadius: "6px",
                          }}
                          title="Delete User"
                          onClick={() =>
                            handleDelete(user._id)
                          }
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LabTechDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    pendingTests: 0,
    completedTests: 0,
    totalReports: 0,
  });

  const [tests, setTests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Dashboard stats
    fetch("http://localhost:5000/api/lab/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data.data || stats);
      })
      .catch((err) => console.log(err));

    // Pending tests
    fetch("http://localhost:5000/api/lab/tests/pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTests(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

 return (
    <div className="page-wrapper">
      <div className="container-fluid p-0">
        <div className="row g-0">

          {/* SIDEBAR */}
          <div className="col-md-2 sidebar vh-100 p-3">
            <h5 className="text-center fw-bold mb-4">Lab Panel</h5>

            <ul className="list-group list-group-flush">

              <li className="list-group-item fw-bold">
                Dashboard
              </li>

              <li className="list-group-item" style={{ cursor: "pointer" }}
                onClick={() => navigate("/lab/tests")}>
                Pending Tests
              </li>

              <li className="list-group-item" style={{ cursor: "pointer" }}
                onClick={() => navigate("/lab/reports")}>
                📄 Reports
              </li>

              <li className="list-group-item" style={{ cursor: "pointer" }}
                onClick={() => navigate("/lab/upload")}>
                Upload Report
              </li>

              <li className="list-group-item text-danger fw-bold"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}>
                Logout
              </li>

            </ul>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-md-10 p-4">

            <h2 className="text-center mb-4 fw-bold">
              LAB TECH DASHBOARD
            </h2>

            {/* STATS */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="stats-card" style={{ backgroundColor: "#0ea5a4" }}>
                  <h6>Pending Tests</h6>
                  <h1>{stats?.pendingTests}</h1>
                </div>
              </div>

              <div className="col-md-4">
                <div className="stats-card" style={{ backgroundColor: "#f59e0b" }}>
                  <h6>Completed Tests</h6>
                  <h1>{stats?.completedTests}</h1>
                </div>
              </div>

              <div className="col-md-4">
                <div className="stats-card" style={{ backgroundColor: "#3b82f6" }}>
                  <h6>Total Reports</h6>
                  <h1>{stats?.totalReports}</h1>
                </div>
              </div>
            </div>

            {/* PENDING TESTS TABLE */}
            <div className="card dashboard-card shadow mb-4">
              <div className="card-body">

                <h4 className="mb-3">Pending Lab Tests</h4>

                {tests?.length === 0 ? (
                  <p className="text-muted">No pending tests</p>
                ) : (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Patient ID</th>
                        <th>Test Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tests?.map((t, index) => (
                        <tr key={index}>
                          <td>{t.patientId}</td>
                          <td>{t.testName}</td>
                          <td>{t.status}</td>
                          <td>
                            <button className="btn btn-success btn-sm">
                              Upload Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTechDashboard;
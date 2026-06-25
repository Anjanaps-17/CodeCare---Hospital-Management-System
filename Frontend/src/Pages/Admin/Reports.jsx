import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAdminReports,
  exportAdminReportsCSV,
} from "../../api/AdminService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminReports = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [summary, setSummary] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, fromDate, toDate, users]);

  const fetchReports = async () => {
    const res = await getAdminReports();
console.log("ADMIN REPORT RESPONSE:", res);
    try {
      setLoading(true);
      const res = await getAdminReports();

     const raw = res;

const data = Array.isArray(raw)
  ? raw
  : Array.isArray(raw?.data)
  ? raw.data
  : Array.isArray(raw?.content)
  ? raw.content
  : [];
      setUsers(data);

      calculateSummary(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin reports");
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (data) => {
    const total = data.length;
    const active = data.filter((u) => u.isActive).length;
    const inactive = total - active;

    setSummary({ total, active, inactive });
  };

  const applyFilters = () => {
    let temp = [...users];

    // 🔍 search
    if (search) {
      temp = temp.filter(
        (u) =>
          u.username?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()) ||
          u.fullName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📅 date filter (dateOfJoining expected from backend)
   if (fromDate) {
  temp = temp.filter((u) =>
    u.dateOfJoining && new Date(u.dateOfJoining) >= new Date(fromDate)
  );
}

if (toDate) {
  temp = temp.filter((u) =>
    u.dateOfJoining && new Date(u.dateOfJoining) <= new Date(toDate)
  );
}

    setFiltered(temp);
  };

  const handleExport = async () => {
    try {
      await exportAdminReportsCSV();
      toast.success("Report exported successfully");
    } catch (err) {
      toast.error("Export failed");
    }
  };

  // 📊 Role distribution for chart
  const roleData = Object.values(
    (Array.isArray(users) ? users : []).reduce((acc, user) => { 
      acc[user.role] = acc[user.role] || { name: user.role, value: 0 };
      acc[user.role].value += 1;
      return acc;
    }, {})
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ padding: "20px" }}>
      <h2> Admin Reports</h2>

      {/* 📌 SUMMARY CARDS */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>👥 Total Users<br /><b>{summary.total}</b></div>
        <div style={styles.card}>✅ Active<br /><b>{summary.active}</b></div>
        <div style={styles.card}>❌ Inactive<br /><b>{summary.inactive}</b></div>
      </div>

      {/* 🔍 FILTERS */}
      <div style={styles.filterBox}>
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleExport} style={styles.button}>
          📥 Export CSV
        </button>
      </div>

      {/* 📊 CHART */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={roleData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {roleData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 TABLE */}
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead style={{ background: "#f2f2f2" }}>
            <tr>
              <th> </th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.dateOfJoining}</td>
                  <td>
                    {u.isActive ? "Active ✅" : "Inactive ❌"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  card: {
    flex: 1,
    padding: "15px",
    background: "#f4f4f4",
    borderRadius: "10px",
    textAlign: "center",
  },
  filterBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
  },
  button: {
    padding: "8px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default AdminReports;
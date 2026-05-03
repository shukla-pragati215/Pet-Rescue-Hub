import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Users.css";
import {
  FaUserCircle,
  FaSearch,
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaTrash,
  FaBan,
  FaUndo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) setUser(JSON.parse(admin));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const toggleBlock = async (id, currentStatus) => {
    try {
      if (!token) {
        alert("Admin token missing. Please login again.");
        return;
      }

      let reason = "";

      if (currentStatus !== "Blocked") {
        reason = prompt("Enter block reason (required):") || "";
        if (!reason.trim()) {
          alert("Block reason is required!");
          return;
        }
      }

      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/status`,
        {
          status: currentStatus === "Blocked" ? "Active" : "Blocked",
          reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUsers();
    } catch (err) {
      console.error("Block error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      if (!token) {
        alert("Admin token missing. Please login again.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        (u.name || "").toLowerCase().includes(keyword) ||
        (u.email || "").toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" || (u.status || "Active") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const totalUsers = users.length;
  const activeUsers = users.filter(
    (u) => (u.status || "Active") === "Active"
  ).length;
  const blockedUsers = users.filter((u) => u.status === "Blocked").length;

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="users-page">
      <nav className="dashboard-navbar">
        <div className="logo-section">
          <div className="logo-badge">🐾</div>
          <div>
            <h2 className="logo-text">Pet Rescue Admin</h2>
            <p className="logo-subtext">Users Management</p>
          </div>
        </div>

        <div className="nav-right">
          <div className="profile-wrapper">
            <FaUserCircle
              size={32}
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            />

            {showProfile && user && (
              <div className="profile-dropdown">
                <p>
                  <strong>{user.name}</strong>
                </p>
                <p className="email">{user.email}</p>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="users-container">
        <div className="hero-banner">
          <div>
            <p className="hero-tag">Admin Dashboard</p>
            <h1>Users Management</h1>
            <p className="hero-text">
              Monitor registered users, manage their account status, and keep
              the platform safe and organized.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card highlight">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div>
              <h4>Total Users</h4>
              <h2>{totalUsers}</h2>
            </div>
          </div>

          <div className="stat-card active-card">
            <div className="stat-icon">
              <FaUserCheck />
            </div>
            <div>
              <h4>Active Users</h4>
              <h2>{activeUsers}</h2>
            </div>
          </div>

          <div className="stat-card blocked-card">
            <div className="stat-icon">
              <FaUserSlash />
            </div>
            <div>
              <h4>Blocked Users</h4>
              <h2>{blockedUsers}</h2>
            </div>
          </div>
        </div>

        <div className="toolbar-card">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div className="table-card">
          <div className="table-header">
            <div>
              <h3>Registered Users</h3>
              <p>{filteredUsers.length} records found</p>
            </div>
          </div>

          {loading ? (
            <div className="state-box">Loading users...</div>
          ) : filteredUsers.length > 0 ? (
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{getInitials(u.name)}</div>
                        <div>
                          <p className="user-name">{u.name || "Unknown User"}</p>
                          <span className="mini-text">Registered User</span>
                        </div>
                      </div>
                    </td>

                    <td className="email-cell">{u.email}</td>

                    <td>
                      <span
                        className={`status ${(
                          u.status || "Active"
                        ).toLowerCase()}`}
                      >
                        {u.status || "Active"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className={`block-btn ${
                            u.status === "Blocked" ? "unblock" : ""
                          }`}
                          onClick={() => toggleBlock(u._id, u.status)}
                        >
                          {u.status === "Blocked" ? (
                            <>
                              <FaUndo /> Unblock
                            </>
                          ) : (
                            <>
                              <FaBan /> Block
                            </>
                          )}
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(u._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="state-box no-data">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
}
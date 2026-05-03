import { useState, useEffect, useMemo } from "react";
import "./Adoptions.css";
import {
  FaUserCircle,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaw,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Adoptions() {
  const [adoptions, setAdoptions] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAdoptions = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/adopt-requests");
      const data = await res.json();

      if (data.success) {
        setAdoptions(data.data || []);
      } else {
        setAdoptions([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch adoption requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);
 const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  const updateStatus = async (id, newStatus) => {
  const confirmAction = window.confirm(
    `Are you sure you want to ${newStatus} this adoption request?`
  );
  if (!confirmAction) return;

  try {
    const res = await fetch(
      `http://localhost:5000/api/adopt-requests/${id}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update status");
      return;
    }

    if (data.success) {
      setAdoptions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
      alert(`Adoption request ${newStatus} successfully`);
    } else {
      alert(data.message || "Failed to update status");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to update status");
  }
};
  const filteredAdoptions = useMemo(() => {
    return adoptions.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        (item.petPreference || "").toLowerCase().includes(keyword) ||
        (item.fullName || "").toLowerCase().includes(keyword) ||
        (item.email || "").toLowerCase().includes(keyword) ||
        (item.address || "").toLowerCase().includes(keyword);

      const matchesStatus =
        filterStatus === "All" || item.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [adoptions, search, filterStatus]);

  const totalRequests = adoptions.length;
  const pendingCount = adoptions.filter((a) => a.status === "Pending").length;
  const approvedCount = adoptions.filter((a) => a.status === "Approved").length;
  const rejectedCount = adoptions.filter((a) => a.status === "Rejected").length;

  const formatDate = (dateValue) => {
    if (!dateValue) return "—";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="adoptions-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="logo-section">
          <div className="logo-badge">🐾</div>
          <div>
            <h2 className="logo-text">Pet Rescue Admin</h2>
            <p className="logo-subtext">Adoption Management</p>
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

      <div className="adoptions-container">
        {/* Hero */}
        <div className="hero-banner">
          <div>
            <p className="hero-tag">Application Dashboard</p>
            <h1>Adoption Requests</h1>
            <p className="hero-text">
              Review applicant details, verify contact information, and manage
              each adoption request professionally.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="stats-grid">
          <div className="stat-card highlight">
            <h4>Total Requests</h4>
            <h2>{totalRequests}</h2>
          </div>

          <div className="stat-card pending-card">
            <h4>Pending</h4>
            <h2>{pendingCount}</h2>
          </div>

          <div className="stat-card approved-card">
            <h4>Approved</h4>
            <h2>{approvedCount}</h2>
          </div>

          <div className="stat-card rejected-card">
            <h4>Rejected</h4>
            <h2>{rejectedCount}</h2>
          </div>
        </div>

        {/* Filters */}
        <div className="toolbar-card">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by pet, adopter, email, address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-header">
            <div>
              <h3>Applications List</h3>
              <p>{filteredAdoptions.length} records found</p>
            </div>
          </div>

          {loading ? (
            <div className="state-box">Loading adoption requests...</div>
          ) : (
            <table className="adoptions-table">
              <thead>
                <tr>
                  <th>Pet</th>
                  <th>Applicant</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredAdoptions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No Adoption Requests Found
                    </td>
                  </tr>
                ) : (
                  filteredAdoptions.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="pet-cell">
                          <div className="pet-icon-wrap">
                            <FaPaw />
                          </div>
                          <div>
                            <p className="pet-name">{item.petPreference || "N/A"}</p>
                            <span className="mini-text">Requested Pet</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="applicant-cell">
                          <p className="applicant-name">{item.fullName}</p>
                          <span className="mini-text">Applicant</span>
                        </div>
                      </td>

                      <td>
                        <div className="contact-info">
                          <p>
                            <FaEnvelope className="inline-icon" />{" "}
                            {item.email || "N/A"}
                          </p>
                          <p>
                            <FaPhoneAlt className="inline-icon" />{" "}
                            {item.phone || item.contactNo || "N/A"}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="address-cell">
                          <FaMapMarkerAlt className="address-icon" />
                          <span>{item.address || "N/A"}</span>
                        </div>
                      </td>

                      <td>{formatDate(item.createdAt)}</td>

                      <td>
                        <span className={`status ${item.status?.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        {item.status === "Pending" ? (
                          <div className="action-buttons">
                            <button
                              className="approve"
                              onClick={() => updateStatus(item._id, "Approved")}
                            >
                              <FaCheckCircle /> Approve
                            </button>
                            <button
                              className="reject"
                              onClick={() => updateStatus(item._id, "Rejected")}
                            >
                              <FaTimesCircle /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="done-text">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
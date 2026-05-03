import { useState, useEffect } from "react";
import "./Volunteers.css";
import {
  FaUserCircle,
  FaEnvelope,
  FaCopy,
  FaCheckCircle,
  FaTimesCircle,
  FaUndo,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Volunteers() {
    const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchVolunteers();
  }, []);
 const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  const fetchVolunteers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/volunteers");
      const data = await res.json();
      setVolunteers(data.data || data || []);
    } catch (err) {
      console.log("Failed to fetch volunteers", err);
    }
  };

const updateStatus = async (id, newStatus) => {
  try {
    const res = await fetch(`http://localhost:5000/api/admin/volunteers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Status update failed");
      return;
    }

    setVolunteers((prev) =>
      prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
    );

    alert(`Volunteer marked as ${newStatus} and email sent successfully`);
  } catch (err) {
    console.log("Status update failed", err);
    alert("Status update failed");
  }
};
  const deleteVolunteer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this volunteer request?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/volunteers/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVolunteers((prev) => prev.filter((v) => v._id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.log("Delete failed", err);
      alert("Delete failed");
    }
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      alert("Email copied successfully");
    } catch (err) {
      console.log("Copy failed", err);
      alert("Copy failed");
    }
  };

  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      (v.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.email || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || (v.status || "New") === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalVolunteers = volunteers.length;
  const newCount = volunteers.filter((v) => (v.status || "New") === "New").length;
  const contactedCount = volunteers.filter((v) => v.status === "Contacted").length;
  const closedCount = volunteers.filter((v) => v.status === "Closed").length;

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

      <div className="volunteers-container">
        {/* Page Title */}
        <div className="page-top">
          <div>
            <h2>🤝 Volunteer Requests</h2>
            <p className="sub-text">
              Manage volunteer queries and contact requests professionally
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>{totalVolunteers}</h3>
            <p>Total Requests</p>
          </div>

          <div className="summary-card new-card">
            <h3>{newCount}</h3>
            <p>New</p>
          </div>

          <div className="summary-card contacted-card">
            <h3>{contactedCount}</h3>
            <p>Contacted</p>
          </div>

          <div className="summary-card closed-card">
            <h3>{closedCount}</h3>
            <p>Closed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="volunteers-header">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="volunteers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Quick Contact</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map((vol) => (
                  <tr key={vol._id}>
                    <td className="name-cell">{vol.name || "N/A"}</td>
                    <td className="email-cell">{vol.email || "N/A"}</td>

                    <td>
                      <span className={`status ${(vol.status || "New").toLowerCase()}`}>
                        {vol.status || "New"}
                      </span>
                    </td>

                    <td>
                      <div className="action-group">
                       <button
  type="button"
  className="icon-btn email-btn"
  title="Send Email"
  onClick={() => {
    const subject = encodeURIComponent("Pet Rescue Hub Volunteer Response");
    const body = encodeURIComponent(
      `Hello ${vol.name || ""},\n\nThank you for your interest in volunteering with Pet Rescue Hub.\n\nRegards,\nPet Rescue Hub Team`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        vol.email || ""
      )}&su=${subject}&body=${body}`,
      "_blank"
    );
  }}
>
  <FaEnvelope />
</button>
                        <button
                          className="icon-btn copy-btn"
                          title="Copy Email"
                          onClick={() => copyEmail(vol.email)}
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </td>

                    <td>
                      <div className="action-group">
                        {(vol.status === "New" || !vol.status) && (
                          <button
                            className="text-btn contacted-btn"
                            onClick={() => updateStatus(vol._id, "Contacted")}
                          >
                            <FaCheckCircle /> Contacted
                          </button>
                        )}

                        {vol.status === "Contacted" && (
                          <>
                            <button
                              className="text-btn close-btn"
                              onClick={() => updateStatus(vol._id, "Closed")}
                            >
                              <FaTimesCircle /> Close
                            </button>

                            <button
                              className="text-btn reopen-btn"
                              onClick={() => updateStatus(vol._id, "New")}
                            >
                              <FaUndo /> Reopen
                            </button>
                          </>
                        )}

                        {vol.status === "Closed" && (
                          <button
                            className="text-btn reopen-btn"
                            onClick={() => updateStatus(vol._id, "New")}
                          >
                            <FaUndo /> Reopen
                          </button>
                        )}

                        <button
                          className="text-btn delete-btn"
                          onClick={() => deleteVolunteer(vol._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No volunteer requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
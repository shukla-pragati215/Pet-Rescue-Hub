import { useEffect, useState } from "react";
import "./AdoptionForms.css";
import {
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaPaw,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdoptionForms() {
      const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchForms();
  }, []);
const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  const fetchForms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/adoption-form");
      const data = await res.json();
      setForms(data.data || []);
    } catch (err) {
      console.log("Fetch failed", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/adoption-form/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Status update failed");
        return;
      }

      setForms((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );

      alert(`Request ${status} successfully`);
    } catch (err) {
      console.log(err);
      alert("Status update failed");
    }
  };

  const deleteForm = async (id) => {
    const confirmDelete = window.confirm("Delete this adoption form?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/adoption-form/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      setForms((prev) => prev.filter((item) => item._id !== id));
      alert("Deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

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
    <div className="adoption-forms-page">
      <nav className="dashboard-navbar">
        <div className="logo-section">
          <div className="logo-badge">🐾</div>
          <div>
            <h2 className="logo-text">Pet Rescue Admin</h2>
            <p className="logo-subtext">Adoption Forms</p>
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

      <div className="adoption-forms-container">
        <div className="page-top">
          <div>
            <h2>📋 Adoption Form Requests</h2>
            <p className="sub-text">
              View and manage all adoption form submissions
            </p>
          </div>
        </div>

        <div className="table-card">
          <table className="adoption-forms-table">
            <thead>
              <tr>
                <th>Pet</th>
                <th>Applicant</th>
                <th>Email</th>
                <th>Address</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              {forms.length > 0 ? (
                forms.map((form) => (
                  <tr key={form._id}>
                    <td>
                      <div className="pet-cell">
                        <div className="pet-thumb">
                          {form.petImage ? (
                            <img
                              src={form.petImage}
                              alt={form.petName || "Pet"}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const fallback =
                                  e.currentTarget.parentElement.querySelector(
                                    ".pet-fallback-icon"
                                  );
                                if (fallback) fallback.style.display = "flex";
                              }}
                            />
                          ) : null}

                          <div
                            className="pet-fallback-icon"
                            style={{
                              display: form.petImage ? "none" : "flex",
                            }}
                          >
                            <FaPaw />
                          </div>
                        </div>

                        <div>
                          <p className="pet-title">{form.petName || "N/A"}</p>
                          <span className="muted-text">
                            {[form.petType, form.petBreed, form.petAge]
                              .filter(Boolean)
                              .join(" • ") || "Requested Pet"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="applicant-cell">
                        <p className="applicant-name">{form.name || "N/A"}</p>
                        <span className="muted-text">Applicant</span>
                      </div>
                    </td>

                    <td className="email-text">{form.email || "N/A"}</td>
                    <td className="address-text">{form.address || "N/A"}</td>
                    <td className="message-text">{form.message || "N/A"}</td>
                    <td>{formatDate(form.createdAt)}</td>

                    <td>
                      <span
                        className={`status-badge ${(
                          form.status || "Pending"
                        ).toLowerCase()}`}
                      >
                        {form.status || "Pending"}
                      </span>
                    </td>

                    <td>
                      <div className="action-group">
                        {form.status !== "Approved" && (
                          <button
                            className="text-btn approve-btn"
                            onClick={() => updateStatus(form._id, "Approved")}
                          >
                            <FaCheckCircle /> Approve
                          </button>
                        )}

                        {form.status !== "Rejected" && (
                          <button
                            className="text-btn reject-btn"
                            onClick={() => updateStatus(form._id, "Rejected")}
                          >
                            <FaTimesCircle /> Reject
                          </button>
                        )}

                        <button
                          className="text-btn delete-btn"
                          onClick={() => deleteForm(form._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No adoption forms found
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
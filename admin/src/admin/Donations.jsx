import { useState, useEffect, useMemo } from "react";
import "./Donations.css";
import axios from "axios";
import {
  FaUserCircle,
  FaSearch,
  FaHandHoldingHeart,
  FaRupeeSign,
  FaChartLine,
  FaGift,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Donations() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [donations, setDonations] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      setUser(JSON.parse(admin));
    }
  }, []);

  useEffect(() => {
    fetchDonations();
  }, []);
const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/api/donations");
      setDonations(res.data || []);
    } catch (error) {
      console.log("Error fetching donations:", error);
      setError("Failed to load donations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      const donorName = (d.name || "").toLowerCase();
      const matchesSearch = donorName.includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "high" && d.amount >= 5000) ||
        (filter === "medium" && d.amount >= 1000 && d.amount < 5000) ||
        (filter === "small" && d.amount < 1000);

      return matchesSearch && matchesFilter;
    });
  }, [donations, search, filter]);

  const totalAmount = filteredDonations.reduce(
    (sum, d) => sum + (Number(d.amount) || 0),
    0
  );

  const totalDonors = filteredDonations.length;

  const highestDonation =
    filteredDonations.length > 0
      ? Math.max(...filteredDonations.map((d) => Number(d.amount) || 0))
      : 0;

  const averageDonation =
    totalDonors > 0 ? Math.round(totalAmount / totalDonors) : 0;

  const getDonationBadge = (amount) => {
    if (amount >= 5000) return "high";
    if (amount >= 1000) return "medium";
    return "small";
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

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="donations-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="logo-section">
          <div className="logo-badge">🐾</div>
          <div>
            <h2 className="logo-text">Pet Rescue Admin</h2>
            <p className="logo-subtext">Donation Management</p>
          </div>
        </div>

        <div className="nav-right">
          <div className="profile-wrapper">
            <FaUserCircle
              size={34}
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            />

            {showProfile && user && (
              <div className="profile-dropdown">
                <p><strong>{user.name}</strong></p>
                <p className="email">{user.email}</p>
                 <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="donations-container">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card highlight">
            <div className="stat-icon">
              <FaRupeeSign />
            </div>
            <div>
              <h4>Total Collected</h4>
              <h2>₹{totalAmount.toLocaleString("en-IN")}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaHandHoldingHeart />
            </div>
            <div>
              <h4>Total Donations</h4>
              <h2>{totalDonors}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div>
              <h4>Average Donation</h4>
              <h2>₹{averageDonation.toLocaleString("en-IN")}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaGift />
            </div>
            <div>
              <h4>Highest Donation</h4>
              <h2>₹{highestDonation.toLocaleString("en-IN")}</h2>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar-card">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search donor by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Donations</option>
            <option value="high">High Value (₹5000+)</option>
            <option value="medium">Medium Value (₹1000 - ₹4999)</option>
            <option value="small">Small Value (Below ₹1000)</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="state-box">Loading donations...</div>
        ) : error ? (
          <div className="state-box error-box">{error}</div>
        ) : (
          <div className="table-card">
            <div className="table-header">
              <div>
                <h3>Donation Records</h3>
                <p>{filteredDonations.length} entries found</p>
              </div>
            </div>

            <table className="donations-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((d) => (
                    <tr key={d._id}>
                      <td>
                        <div className="donor-cell">
                          <div className="donor-avatar">
                            {getInitials(d.name)}
                          </div>
                          <div>
                            <p className="donor-name">{d.name || "Unknown Donor"}</p>
                            <span className="donor-subtext">Animal Supporter</span>
                          </div>
                        </div>
                      </td>

                      <td className="amount">
                        ₹{Number(d.amount || 0).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <span
                          className={`donation-badge ${getDonationBadge(
                            Number(d.amount || 0)
                          )}`}
                        >
                          {Number(d.amount || 0) >= 5000
                            ? "High"
                            : Number(d.amount || 0) >= 1000
                            ? "Medium"
                            : "Small"}
                        </span>
                      </td>

                      <td>{formatDate(d.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No donations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
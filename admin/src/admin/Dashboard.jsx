import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUsers,
  FaPaw,
  FaDonate,
  FaHeart,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [adoptionCount, setAdoptionCount] = useState(0);
  const [totalPets, setTotalPets] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  useEffect(() => {
    const adminData = localStorage.getItem("admin");

    if (!token || !adminData) {
      navigate("/admin/login");
    } else {
      setUser(JSON.parse(adminData));
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [usersRes, petsRes, adoptionsRes, donationsRes] =
          await Promise.all([
            fetch("http://localhost:5000/api/admin/users", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:5000/api/admin/pets", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:5000/api/admin/adoptions/count", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:5000/api/admin/donations/count", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setTotalUsers(usersData.length || 0);
        }

        if (petsRes.ok) {
          const petsData = await petsRes.json();
          setTotalPets(petsData.length || 0);
        }

        if (adoptionsRes.ok) {
          const adoptionsData = await adoptionsRes.json();
          setAdoptionCount(adoptionsData.count || 0);
        }

        if (donationsRes.ok) {
          const donationsData = await donationsRes.json();
          setTotalDonations(donationsData.count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-panel">
        {/* Top Navbar */}
        <nav className="dashboard-navbar">
          <div className="navbar-title-area">
            <h2 className="page-title">Dashboard</h2>
            <p className="page-subtitle">Dashboard Overview</p>
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

        {/* Main Content */}
        <div className="dashboard-container">
          <div className="hero-banner">
            <div className="hero-left">
              <p className="hero-tag">Admin Control Center</p>
              <h1>Welcome {user ? user.name : "Admin"} 👋</h1>
              <p className="hero-text">
                Manage users, pets, adoptions, and donations from one centralized
                dashboard built for Pet Rescue Hub.
              </p>
            </div>

            <div className="hero-right">
              <div className="hero-badge">
                <FaShieldAlt />
                <span>Secure Admin Panel</span>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <button onClick={() => navigate("/admin/users")}>Manage Users</button>
            <button onClick={() => navigate("/admin/pets")}>Manage Pets</button>
            <button onClick={() => navigate("/admin/donations")}>
              View Donations
            </button>
            <button onClick={() => navigate("/admin/adoptions")}>
              View Adoptions
            </button>
          </div>

          {loading ? (
            <div className="state-box">Loading dashboard data...</div>
          ) : (
            <div className="dashboard-cards">
              <Card
                title="Total Users"
                value={totalUsers}
                icon={<FaUsers />}
                onClick={() => navigate("/admin/users")}
              />

              <Card
                title="Total Pets"
                value={totalPets}
                icon={<FaPaw />}
                onClick={() => navigate("/admin/pets")}
              />

              <Card
                title="Donations"
                value={totalDonations}
                icon={<FaDonate />}
                isCurrency={true}
                onClick={() => navigate("/admin/donations")}
              />

              <Card
                title="Adoptions"
                value={adoptionCount}
                icon={<FaHeart />}
                onClick={() => navigate("/admin/adoptions")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon, onClick, isCurrency = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16 || 1);

    const counter = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="dashboard-card" onClick={onClick}>
      <div className="card-top">
        <div className="card-icon">{icon}</div>
      </div>

      <h4 className="card-title">{title}</h4>

      <h2 className="card-value">
        {isCurrency ? `₹${count.toLocaleString("en-IN")}` : count}
      </h2>

      <p className="click-text">
        View details <FaArrowRight />
      </p>
    </div>
  );
}
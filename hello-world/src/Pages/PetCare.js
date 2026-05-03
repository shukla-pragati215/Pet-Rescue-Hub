import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PetCare.css";
import { FaUserCircle } from "react-icons/fa";

function PetCare() {
  const navigate = useNavigate();

  // ✅ safe user parse
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <div className="adopt-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/adopt">Adopt a Pet</Link>
          <Link to="/lost-found">Lost & Found</Link>
          <Link to="/pet-doctors">Pet Doctors</Link>
          <Link to="/pet-care">Pet Care</Link>
          <Link to="/donate">Donate</Link>
        </div>

        <div className="nav-right">
          {user ? (
            <div className="profile-wrapper">
              <FaUserCircle
                size={28}
                className="profile-icon"
                onClick={() => setShowProfile((s) => !s)}
              />

              {showProfile && (
                <div className="profile-dropdown">
                  <p>
                    <strong>{user.name}</strong>
                  </p>
                  <p className="email">{user.email}</p>
                  <hr />
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="petcare-container">
        {/* Header */}
        <h1 className="title">Pet Care</h1>
        <p className="subtitle">helping every pet live a happy and healthy life</p>

        {/* Image */}
        <div className="image-container">
          <img src="petcare.jpeg" alt="Pet with owner" />
        </div>

        {/* Info Cards */}
        <div className="info-cards">
          <Link to="/nutrition" className="card">
            <span className="icon">🍲</span>
            <h3>Nutrition</h3>
            <p>Tips for a healthy diet</p>
          </Link>

          <Link to="/hygiene" className="card">
            <span className="icon">🧼</span>
            <h3>Hygiene</h3>
            <p>Grooming and cleanliness</p>
          </Link>

          <Link to="/exercise" className="card">
            <span className="icon">🏃</span>
            <h3>Exercise</h3>
            <p>Daily physical activities</p>
          </Link>

          <Link to="/health" className="card">
            <span className="icon">💙</span>
            <h3>Health</h3>
            <p>Preventive care and check-ups</p>
          </Link>
        </div>

        {/* Footer */}
        <footer className="lostfound-footer">
          <a href="/">Home</a>
          <a href="/contact">Contact</a>
          <a href="/policy">Privacy Policy</a>
        </footer>
      </div>
    </div>
  );
}

export default PetCare;
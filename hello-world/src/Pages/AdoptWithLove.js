import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdoptWithLove.css";
import { FaUserCircle } from "react-icons/fa";

function AdoptWithLove() {
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
    navigate("/login"); // or "/home" if you want
  };

  // ✅ If you don't need backend data, remove fetch completely
  // (No unused state, no warnings)
  useEffect(() => {
    // Optional: keep only if you plan to use content later
    // fetch("http://localhost:5000/api/adopt-with-love").catch(() => {});
  }, []);

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

      <div className="adoptlove-container">
        {/* Top Image */}
        <img
          src="love.png" // make sure love.png is in public/
          alt="Adopt with Love"
          className="adoptlove-image"
        />

        {/* Title */}
        <h2 className="adoptlove-title">Adopt with Love</h2>

        {/* Description */}
        <p className="adoptlove-desc">
          Every adoption is an act of love. When you adopt, you give a pet a second
          chance at life and gain a lifelong friend.
        </p>

        {/* Cards */}
        <div className="adoptlove-cards">
          <div className="adoptlove-card">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/home.png"
              alt="Give a Home"
            />
            <p>Give a Home</p>
          </div>

          <div className="adoptlove-card">
            <img
              src="https://img.icons8.com/ios-filled/100/fa314a/like.png"
              alt="Share Love"
            />
            <p>Share Love</p>
          </div>

          <div className="adoptlove-card">
            <img
              src="https://img.icons8.com/ios-filled/100/d35400/dog.png"
              alt="Save a Life"
            />
            <p>Save a Life</p>
          </div>
        </div>

        {/* Button */}
        <button className="adoptlove-btn" onClick={() => navigate("/adoption")}>
          Adopt Now
        </button>

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

export default AdoptWithLove;
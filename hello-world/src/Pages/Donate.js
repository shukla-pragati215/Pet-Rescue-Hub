// Donate.js
import React, { useState } from "react";
import "./Donate.css";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Donate() {
  const navigate = useNavigate(); // ✅ pehle declare
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/home");
  };

  /* -------- DONATE FUNCTION -------- */
 const handleDonate = async () => {
  try {
    const donationData = {
      name: user?.name || "Guest User",
      email: user?.email || "guest@gmail.com",
      amount: 500,
      purpose: "Shelter",
    };

    const res = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Donation successful ❤️");
      navigate("/donate-page");
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error");
  }
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
            <Link to="/donate">Donate</Link>   {/* ✅ add */}
        </div>

        <div className="nav-right">
          {user ? (
            <div className="profile-wrapper">
              <FaUserCircle
                size={28}
                className="profile-icon"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && (
                <div className="profile-dropdown">
                  <p><strong>{user.name}</strong></p>
                  <p className="email">{user.email}</p>
                  <hr />
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </nav>


      {/* Content */}
      <div className="donate-container">
        
        {/* Image & Heading */}
        <div className="donate-hero">
          <img
            src="donate.jpg"
            alt="Donate"
            className="donate-image"
          />
          <h2>Support Us By Donating</h2>
          <p>Your Love Saves Lives</p>
        </div>

        {/* Options */}
        <div className="donate-options">
          <div className="donate-card">
            <img src="https://img.icons8.com/ios-filled/100/home.png" alt="Shelter" />
            <p>SHELTER</p>
          </div>

          <div className="donate-card">
            <img src="https://img.icons8.com/ios-filled/100/meal.png" alt="Food" />
            <p>FOOD</p>
          </div>

          <div className="donate-card">
            <img src="https://img.icons8.com/ios-filled/100/hospital-room.png" alt="Healthcare" />
            <p>HEALTHCARE</p>
          </div>

          <div className="donate-card">
            <img src="https://img.icons8.com/ios-filled/100/like.png" alt="Adoption" />
            <p>ADOPTION</p>
          </div>
        </div>

        {/* Donate Button */}
        <button onClick={() => navigate("/donate-page")} className="donate-btn">
          DONATE NOW
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

export default Donate ;

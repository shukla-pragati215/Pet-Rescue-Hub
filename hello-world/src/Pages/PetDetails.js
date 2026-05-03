import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SubmitInterestForm from "./SubmitInterestForm";
import "./PetDetails.css";
import { FaUserCircle } from "react-icons/fa";

function PetDetails() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Agar direct URL open kare bina pet select kiye
  if (!state) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>No Pet Selected</h2>;
  }

  const API = "http://localhost:5000";

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

      {/* Pet Details */}
      <div className="pet-details-page">
        <div className="pet-details-card">

          {/* ✅ IMAGE FIXED */}
          <img
            src={`${API}/uploads/${state.image}`}
            alt={state.name}
            onError={(e)=>{
              e.target.src="https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/pet-adoption-logo-template-vector.jpg"
            }}
          />

          <div className="pet-info">
            <h2>{state.name}</h2>
            <p><b>Age:</b> {state.age}</p>
            <p><b>Breed:</b> {state.breed}</p>
            <p>{state.description}</p>

            <button className="apply-btn" onClick={() => setShowForm(true)}>
              Apply for Adoption
            </button>

            <button className="back-btn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>

        {/* Popup */}
        {showForm && (
          <div className="popup-overlay">
            <div className="popup-content">
              <SubmitInterestForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="lostfound-footer">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/policy">Privacy Policy</Link>
      </footer>

    </div>
  );
}

export default PetDetails;

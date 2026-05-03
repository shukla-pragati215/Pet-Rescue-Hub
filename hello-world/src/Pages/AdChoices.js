import React from "react";
import "./AdChoices.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdChoices() {
  const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem("user")); // ✅ ADD THIS
      const [showProfile, setShowProfile] = useState(false);
    
      const handleLogout = () => {
        localStorage.removeItem("user");
        setShowProfile(false);
        navigate("/home");
      };
  return (
    <div className="adchoices-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/home">Home</Link>
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
      <div className="adchoices-content">
        <h1>AdChoices</h1>
        <p>
          At <strong>Pet Rescue Hub</strong>, we respect your privacy and are 
          committed to providing transparency regarding online advertising practices.
          This page explains how personalized advertising works and how you can 
          control your ad preferences.
        </p>

        <h3>1. What Is AdChoices?</h3>
        <p>
          AdChoices is a program that gives users more control over the ads they 
          see online. It allows you to learn why a particular ad was shown and to 
          opt out of interest-based advertising from participating companies.
        </p>

        <h3>2. How We Use Advertising</h3>
        <p>
          We may display ads based on your interests, browsing history, or 
          interactions with our website. These ads help support our mission of 
          pet rescue and adoption while keeping the platform free to use.
        </p>

        <h3>3. Managing Your Ad Preferences</h3>
        <p>You can manage or opt out of personalized ads through the following links:</p>
        
        <ul>
          <li>
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
              Digital Advertising Alliance (DAA)
            </a>
          </li>
          <li>
            <a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer">
              AdChoices Canada
            </a>
          </li>
          <li>
            <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">
              YourOnlineChoices (EU)
            </a>
          </li>
        </ul>

        <h3>4. Cookies and Tracking</h3>
        <p>
          Some advertising partners use cookies or similar technologies to measure 
          ad effectiveness and show relevant content. For more details, please read 
          our <Link to="/cookies">Cookies Notice</Link>.
        </p>

        <h3>5. Changes to This Policy</h3>
        <p>
          We may update this AdChoices information from time to time. Please review 
          it periodically to stay informed about how we manage advertising preferences.
        </p>

        <p><b>Last Updated:</b> November 2025</p>
      </div>

      {/* Footer */}
      <footer className="lostfound-footer">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/policy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default AdChoices;

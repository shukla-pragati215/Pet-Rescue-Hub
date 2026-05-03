import React from "react";
import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function PrivacyPolicy() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // simple & effective
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

      {/* Header */}
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. This policy explains how we handle your data.</p>
      </div>

      {/* Content */}
      <div className="privacy-content">
        <h2>1. Information Collection</h2>
        <p>We collect information when you register, fill forms, or interact with our website. This may include your name, email, contact details, and adoption preferences.</p>

        <h2>2. Use of Information</h2>
        <p>Information is used to provide services, communicate with you, improve user experience, and for legal compliance.</p>

        <h2>3. Data Sharing</h2>
        <p>We do not sell or rent your personal data. Data may be shared with trusted partners only for providing services (e.g., adoption requests, veterinary info).</p>

        <h2>4. Cookies & Tracking</h2>
        <p>Our website uses cookies to enhance user experience, remember preferences, and analyze site traffic.</p>

        <h2>5. Security</h2>
        <p>We take reasonable measures to protect your information, but no system is completely secure. Always protect your account credentials.</p>

        <h2>6. Your Rights</h2>
        <p>You can request to view, update, or delete your personal data by contacting us at <strong>contact@petrescuehub.org</strong>.</p>

        <h2>7. Changes to this Policy</h2>
        <p>We may update this privacy policy from time to time. Any changes will be posted on this page with a revised date.</p>
      </div>

      {/* Footer */}
      <footer className="lostfound-footer">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/Privacy statement">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;

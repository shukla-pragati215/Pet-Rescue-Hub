import React from "react";
import "./Accessibility.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState, navigate } from "react";

function Accessibility() {
   const user = JSON.parse(localStorage.getItem("user")); // ✅ ADD THIS
      const [showProfile, setShowProfile] = useState(false);
    
      const handleLogout = () => {
        localStorage.removeItem("user");
        setShowProfile(false);
        navigate("/home");
      };
  return (
    <div className="accessibility-page">
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
      <div className="accessibility-content">
        <h1>Accessibility Statement</h1>
        <p>
          At <strong>Pet Rescue Hub</strong>, we are committed to making our website
          accessible to everyone, including individuals with disabilities.
          We continuously strive to improve the user experience for all visitors.
        </p>

        <h3>1. Our Commitment</h3>
        <p>
          We aim to ensure that our site follows accessibility best practices
          and complies with the Web Content Accessibility Guidelines (WCAG) 2.1,
          Level AA standards wherever possible.
        </p>

        <h3>2. Accessibility Features</h3>
        <ul>
          <li>Clear, consistent navigation across the website.</li>
          <li>Text alternatives (alt text) for all important images.</li>
          <li>Readable text contrast and scalable fonts.</li>
          <li>Keyboard navigation support for all interactive elements.</li>
          <li>Descriptive form labels and accessible buttons.</li>
        </ul>

        <h3>3. Continuous Improvement</h3>
        <p>
          We are committed to regularly reviewing and improving accessibility
          based on feedback and evolving web standards. Our team monitors
          content to identify and correct accessibility issues promptly.
        </p>

        <h3>4. Feedback</h3>
        <p>
          If you encounter any difficulty using our website or notice accessibility
          barriers, please let us know. Your feedback helps us improve.
        </p>
        <p>
          📧 <b>Email:</b> accessibility@petrescuehub.org <br />
          ☎️ <b>Phone:</b> (123) 456-7890
        </p>

        <h3>5. Third-Party Content</h3>
        <p>
          Some parts of our website may link to or embed third-party content that
          we do not control. While we cannot guarantee accessibility for such content,
          we encourage all our partners to maintain accessible web practices.
        </p>

        <p><b>Last Updated:</b> November 2025</p>
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

export default Accessibility;

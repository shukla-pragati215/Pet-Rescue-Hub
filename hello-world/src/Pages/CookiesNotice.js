import React from "react";
import "./CookiesNotice.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function CookiesNotice() {
  const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem("user"));
    const [showProfile, setShowProfile] = useState(false);
    const handleLogout = () => {
      localStorage.removeItem("user");
      setShowProfile(false);
      navigate("/home");
    };
  return (
    <div className="cookies-page">
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
      <div className="cookies-content">
        <h1>Cookies Notice</h1>

        <p>
          This Cookies Notice explains how <strong>Pet Rescue Hub</strong> uses cookies and
          similar technologies to improve your browsing experience, analyze traffic,
          and personalize content.
        </p>

        <h3>1. What Are Cookies?</h3>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help us remember your preferences and enhance functionality.
        </p>

        <h3>2. Types of Cookies We Use</h3>
        <ul>
          <li><b>Essential Cookies:</b> Required for basic site functions.</li>
          <li><b>Performance Cookies:</b> Help us analyze and improve website usage.</li>
          <li><b>Functionality Cookies:</b> Remember settings like language and theme.</li>
          <li><b>Advertising Cookies:</b> Used to deliver personalized ads (if applicable).</li>
        </ul>

        <h3>3. Managing Cookies</h3>
        <p>
          You can control, delete, or disable cookies through your browser settings.
          Disabling essential cookies may affect site functionality.
        </p>

        <p>Helpful browser guides:</p>
        <ul>
          <li>
            Chrome:{" "}
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Guide
            </a>
          </li>
          <li>
            Firefox:{" "}
            <a
              href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Guide
            </a>
          </li>
          <li>
            Edge:{" "}
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Guide
            </a>
          </li>
        </ul>

        <h3>4. Updates</h3>
        <p>
          This notice may be updated from time to time. Changes will be posted here.
        </p>

        <p><b>Last Updated:</b> November 2025</p>
      </div>
      <div className="cookies-actions">
  <button
    className="accept-btn"
    onClick={async () => {
      await fetch("http://localhost:5000/api/cookie-notice/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId:
            JSON.parse(localStorage.getItem("user"))?.email || "guest",
        }),
      });

      alert("Cookies accepted ✅");
    }}
  >
    Accept Cookies
  </button>
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

export default CookiesNotice;

import React, { useEffect, useState } from "react";
import "./Legal.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Legal() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [legalData, setLegalData] = useState({ content: "" });
  const [loading, setLoading] = useState(true);

  const user = (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/login");
  };

  useEffect(() => {
    const fetchLegalData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/legal");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        setLegalData({
          content: data?.content || "",
        });
      } catch (err) {
        console.error("Error fetching legal data:", err);
        setLegalData({ content: "" });
      } finally {
        setLoading(false);
      }
    };

    fetchLegalData();
  }, []);

  return (
    <div className="main-container">
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
                onClick={() => setShowProfile(!showProfile)}
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

      {/* Legal Content */}
      <div className="legal-content">
        <h1>📜 Legal Notice</h1>

        {loading ? (
          <p>Loading...</p>
        ) : legalData.content ? (
          <div className="legal-text" style={{ whiteSpace: "pre-wrap" }}>
            {legalData.content}
          </div>
        ) : (
          <>
            <p>
              Welcome to <strong>Pet Rescue Hub</strong>. By using this website,
              you agree to the following terms and conditions.
            </p>

            <h3>1️⃣ Ownership and Copyright</h3>
            <p>
              All content, images, and designs on this website are the property
              of Pet Rescue Hub and protected under copyright laws.
            </p>

            <h3>2️⃣ Use of Content</h3>
            <p>
              You may view and download materials for personal use only.
              Reproduction, distribution, or modification without permission is
              prohibited.
            </p>

            <h3>3️⃣ Disclaimer</h3>
            <p>
              Pet Rescue Hub provides information “as is.” We make no guarantees
              regarding accuracy or availability of pets listed.
            </p>

            <h3>4️⃣ Liability</h3>
            <p>
              We are not responsible for any direct or indirect damages arising
              from the use of this website.
            </p>

            <h3>5️⃣ Updates</h3>
            <p>
              We may modify this legal notice at any time. Please review this
              page periodically for updates.
            </p>
          </>
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

export default Legal;
import React from "react";
import { Link } from "react-router-dom";
import "./Faqs.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Faqs() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/home");
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

      {/* FAQ Section */}
      <div className="faqs-page">
        <h1>🐾 Adoption FAQs</h1>
        <p>Here are some common questions about adopting a pet:</p>

        <div className="faq-item">
          <h3>1️⃣ How can I adopt a pet?</h3>
          <p>
            Visit the “Adopt a Pet” page, choose your pet, and submit the adoption form.
            Our team will contact you soon.
          </p>
        </div>

        <div className="faq-item">
          <h3>2️⃣ Is there any adoption fee?</h3>
          <p>
            Some shelters may charge a small fee to cover vaccination and daily care costs.
          </p>
        </div>

        <div className="faq-item">
          <h3>3️⃣ What are the requirements for adoption?</h3>
          <p>
            You must be above 18, provide a safe space, and commit to the pet’s regular care.
          </p>
        </div>

        <div className="faq-item">
          <h3>4️⃣ Can I return a pet after adoption?</h3>
          <p>
            Yes, in unavoidable situations. Contact the shelter immediately if this happens.
          </p>
        </div>
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

export default Faqs;

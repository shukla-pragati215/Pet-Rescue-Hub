import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdoptNowPage.css";
import { FaUserCircle } from "react-icons/fa";

function AdoptNowPage() {
  const user = JSON.parse(localStorage.getItem("user")); // ✅ ADD THIS
    const [showProfile, setShowProfile] = useState(false);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      setShowProfile(false);
      navigate("/home");
    };
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // ✅ ADD formData state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    petPreference: "",
    reason: "",
  });

  // ✅ handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    navigate("/");
  };

 // inside handleSubmit
const phoneRegex = /^[6-9]\d{9}$/;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!phoneRegex.test(formData.phone)) {
    return alert("Please enter a valid 10 digit Indian phone number");
  }

  try {
const res = await fetch("http://localhost:5000/api/adopt-requests", {      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        userId: user ? user._id : null,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
      alert(
        `✅ Submitted! Application ID: ${data.data.applicationId} | Status: ${data.data.status}`
      );
    }
  } catch (err) {
    console.error(err);
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

      {/* Form Section */}
      <div className="form-container">
        <h2>Adoption Application Form</h2>

        {submitted ? (
          <div className="thankyou-popup">
            <div className="thankyou-content">
              <h3>🎉 Thank you for your application!</h3>
              <p>Our team will review your details and get in touch with you soon.</p>
              <button onClick={handleClose} className="close-btn">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Enter 10 digit phone number"
  pattern="[6-9]{1}[0-9]{9}"
  maxLength="10"
  required
/>

            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>Pet Preference</label>
            <select
              name="petPreference"
              value={formData.petPreference}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Pet --</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>

            <label>Why do you want to adopt?</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>
        )}

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

export default AdoptNowPage;

import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import { FaUserCircle } from "react-icons/fa";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
   const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/home");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully ✅");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
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

      {/* Header */}
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out anytime.</p>
      </header>

      {/* Contact Section */}
      <div className="contact-content">
        
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p><strong>📍 Address:</strong> 123 Pet Street, Mumbai, India</p>
          <p><strong>📞 Phone:</strong> +91 98765 43210</p>
          <p><strong>📧 Email:</strong> support@helpingpaws.com</p>
        </div>

      <div className="contact-content">
  <form className="contact-form" onSubmit={handleSubmit}>
    <h2>Send Us a Message</h2>

    <input
      type="text"
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Your Email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="subject"
      placeholder="Subject"
      value={formData.subject}
      onChange={handleChange}
      required
    />

    <textarea
      name="message"
      placeholder="Your Message"
      rows="5"
      value={formData.message}
      onChange={handleChange}
      required
    />

    <button type="submit">Send Message</button>
  </form>
</div>


      {/* Footer */}
      <footer className="lostfound-footer">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/policy">Privacy Policy</Link>
      </footer>
    </div>
    </div>
  );
}

export default Contact;

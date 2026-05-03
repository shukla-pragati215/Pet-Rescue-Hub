import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import bg from "./pet-bg.webp";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import CookieSettings from "./CookieSettings";
import axios from "axios";
import { useEffect } from "react";


export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showCookies, setShowCookies] = useState(false);
  

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
useEffect(() => {
  setIsLogin(true);
}, []);
  
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    // 🔐 Save token + user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/profile");
  } catch (err) {
    alert(err.response.data.message);
  }
};


  // ================= LOGIN =================
  


     

  // ================= SIGNUP =================
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Please enter all fields");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${bg})` }}>
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
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </nav>

      <div className="container">
        {/* Left Section */}
        <div className="left-section">
          <h1>Welcome to <br /><span>Pet Rescue Hub!</span></h1>
          <p>Join us in finding loving homes for pets in need.</p>
          <img
            src="dog.webp"
            alt="cute Dog"
            style={{ width: "300px", height: "350px", objectFit: "cover", borderRadius: "10px" }}
          />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2>Pet Rescue Hub</h2>

          {/* Toggle Buttons */}
          <div className="tab-buttons">
            <button className={isLogin ? "active" : "inactive"} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? "active" : "inactive"} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>

          {/* Conditional Form */}
          {isLogin ? (
            <>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />

              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />

              <button className="login-btn" onClick={handleLogin}>Login</button>
              <p className="signup-text">
  <span 
    onClick={() => navigate("/forgot-password")} 
    style={{ cursor: "pointer", color: "blue" }}
  >
    Forgot Password?
  </span>
</p>
            </>
          ) : (
            <>
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />

              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />

              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" />

              <button className="login-btn" onClick={handleSignup}>Sign Up</button>
            </>
          )}

          {/* Extra Text */}
          {isLogin ? (
            <p className="signup-text">
              Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </p>
          ) : (
            <p className="signup-text">
              Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h2 className="logo">
            🏠 Adopt a Pet <span><br />Powered by Pedigree</span>
          </h2>
          <p>©2023 Mars or Affiliates.</p>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/adopt">Find a Pet</Link></li>
            <li><Link to="/faqs">Adoption Faqs</Link></li>
          </ul>

          <ul>
            <li><Link to="/partners">Partner Shelters & NGOs</Link></li>
            <li><Link to="/pet-care">Caring For Pets</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>

          <ul>
            <li><Link to="/signup">Create an account</Link></li>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>

          <ul>
            <li><Link to="/mars">Visit Mars.com</Link></li>
            <li><Link to="/privacy-statement">Privacy Statement</Link></li>
            <li><Link to="/legal">Legal</Link></li>
            <li><Link to="/ca-supply">CA Supply Chain Transparency Act</Link></li>
          </ul>

          <ul>
            <li><Link to="/modern-slavery">Modern Slavery Act</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
            <li><Link to="/cookies">Cookies Notice</Link></li>
            <li><Link to="/adchoices">AdChoices</Link></li>
          </ul>
        </div>

        <div className="cookie-btn">
          <button onClick={() => setShowCookies(true)}>Cookies Settings</button>
        </div>
      </footer>

      {/* Cookie Modal */}
      {showCookies && <CookieSettings onClose={() => setShowCookies(false)} />}
    </div>
  );
}

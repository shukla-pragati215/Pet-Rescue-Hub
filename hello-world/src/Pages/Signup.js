import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import bg from "./pet-bg.webp";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import CookieSettings from "./CookieSettings";

export default function SignupPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showCookies, setShowCookies] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Strong password regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-={}[\]|;:'",.<>/?]).{8,}$/;

  // ================= SIGNUP HANDLER =================
  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return alert("Please fill all fields");
    }

    if (!passwordRegex.test(trimmedPassword)) {
      return alert(
        "Password must contain:\n\n" +
          "• Minimum 8 characters\n" +
          "• At least 1 uppercase letter\n" +
          "• At least 1 lowercase letter\n" +
          "• At least 1 number\n" +
          "• At least 1 special character"
      );
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert("Signup successful!");

        setIsSignup(false);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        if (data.message === "User already exists") {
          alert("This email is already registered. Please login with this email.");
        } else {
          alert(data.message || "Signup failed");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ================= LOGIN HANDLER =================
  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedLoginEmail = loginEmail.trim().toLowerCase();
    const trimmedLoginPassword = loginPassword.trim();

    if (!trimmedLoginEmail || !trimmedLoginPassword) {
      return alert("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedLoginEmail,
          password: trimmedLoginPassword,
        }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (res.ok) {
        alert("Login successful!");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
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
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </nav>

      <div className="container">
        <div className="left-section">
          <h1>
            Welcome to <br />
            <span>Pet Rescue Hub!</span>
          </h1>
          <p>Join us in finding loving homes for pets in need.</p>
          <img
            src="dog.webp"
            alt="cute Dog"
            style={{
              width: "300px",
              height: "350px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="right-section">
          <h2>Pet Rescue Hub</h2>

          <div className="tab-buttons">
            <button
              className={isSignup ? "active" : "inactive"}
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </button>
            <button
              className={!isSignup ? "active" : "inactive"}
              onClick={() => setIsSignup(false)}
            >
              Login
            </button>
          </div>

          {isSignup ? (
            <>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
              />

              <small className="password-rules">
                Password must contain at least 8 characters, 1 uppercase letter,
                1 lowercase letter, 1 number, and 1 special character.
              </small>

              <button className="login-btn" onClick={handleSignup}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <label>Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
              />

              <label>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
              />

              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
            </>
          )}

          {isSignup ? (
            <p className="signup-text">
              Already have an account?{" "}
              <span onClick={() => setIsSignup(false)}>Login</span>
            </p>
          ) : (
            <p className="signup-text">
              Don't have an account?{" "}
              <span onClick={() => setIsSignup(true)}>Sign Up</span>
            </p>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <h2 className="logo">
            🏠 Adopt a Pet <span><br />Powered by Pedigree</span>
          </h2>
          <p>©2023 Mars or Affiliates.</p>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
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

      {showCookies && <CookieSettings onClose={() => setShowCookies(false)} />}
    </div>
  );
}
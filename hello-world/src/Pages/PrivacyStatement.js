import React from "react";
import "./PrivacyStatement.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function PrivacyStatement() {
  const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // simple & effective
};

  return (
    <div className="app-container">
      {/* ✅ Navbar (Same as Home.js) */}
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

      {/* ✅ Page Content */}
      <div className="privacy-container">
        <h1>Privacy Statement</h1>
        <p>
          Welcome to <strong>Pet Rescue Hub</strong>. Your privacy is important to us. 
          This Privacy Statement explains how we collect, use, and protect your 
          personal information when you visit our website or use our services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address, 
          and phone number when you:
        </p>
        <ul>
          <li>Register or create an account</li>
          <li>Submit adoption requests or inquiries</li>
          <li>Contact us via forms or email</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your information may be used to:</p>
        <ul>
          <li>Process your adoption requests</li>
          <li>Respond to your questions or feedback</li>
          <li>Improve our services and website</li>
          <li>Send updates, newsletters, or promotional messages (only with your consent)</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell, rent, or trade your personal data. However, we may share 
          limited information with trusted partners, such as registered animal shelters 
          or adoption agencies, to complete your adoption process.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Our site uses cookies to enhance user experience, analyze traffic, and personalize 
          content. You can manage cookie preferences anytime through the{" "}
          <Link to="/cookies" className="cookie-link">Cookies Settings</Link>.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal data 
          from unauthorized access, alteration, or disclosure.
        </p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, update, or delete your personal data</li>
          <li>Withdraw consent for data processing</li>
          <li>Request a copy of the data we hold about you</li>
        </ul>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Statement or our data practices, 
          please contact us at:
        </p>
        <p>
          📧 <a href="mailto:privacy@petrescuehub.org">privacy@petrescuehub.org</a><br />
          📞 (123) 456-7890
        </p>

        <p className="last-updated">
          <strong>Last Updated:</strong> November 2025
        </p>

        <Link to="/home">
          <button className="back-btn">← Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default PrivacyStatement;

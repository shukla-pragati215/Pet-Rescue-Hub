import React from "react";
import "./ModernSlaveryAct.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function ModernSlaveryAct() {
  const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // simple & effective
};

  return (
    <div className="modern-slavery-page">

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

      {/* Main Content */}
      <div className="modern-slavery-content">
        <h1>Modern Slavery Act Statement</h1>
        <p>
          Pet Rescue Hub is dedicated to maintaining high ethical standards and
          ensuring that modern slavery and human trafficking have no place in our
          operations or supply chains. This statement is made in accordance with
          the UK Modern Slavery Act 2015.
        </p>

        <h3>1. Our Policy</h3>
        <p>
          We are firmly committed to preventing any form of slavery, servitude,
          forced or compulsory labor, and human trafficking within our business
          and supply chains. Our core values prioritize respect, fairness, and
          transparency.
        </p>

        <h3>2. Our Supply Chain</h3>
        <p>
          We partner only with trusted suppliers and organizations that uphold
          humane and lawful labor practices. We actively assess risks within our
          supply chain to prevent unethical labor conditions.
        </p>

        <h3>3. Risk Assessment and Due Diligence</h3>
        <p>
          Our team regularly reviews supplier operations and contracts to ensure
          compliance with local and international labor laws. Any indication of
          unethical behavior results in immediate corrective action.
        </p>

        <h3>4. Employee Awareness and Training</h3>
        <p>
          We provide training to staff to recognize and report any concerns about
          modern slavery. All employees are encouraged to uphold our zero-tolerance
          stance toward human rights violations.
        </p>

        <h3>5. Continuous Monitoring</h3>
        <p>
          We continuously monitor and evaluate our practices to strengthen our
          approach against slavery and exploitation. Feedback from our partners
          and employees is vital in achieving continuous improvement.
        </p>

        <h3>6. Reporting</h3>
        <p>
          Any concerns or suspected violations related to modern slavery can be
          reported confidentially to <b>ethics@petrescuehub.org</b>.
        </p>

        <p><b>Last Updated:</b> November 2025</p>
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

export default ModernSlaveryAct;

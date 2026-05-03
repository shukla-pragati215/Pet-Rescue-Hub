import React from "react";
import "./CASupplyChainAct.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState, navigate} from "react";

function CASupplyChainAct() {
  const user = JSON.parse(localStorage.getItem("user"));
      const [showProfile, setShowProfile] = useState(false);
      const handleLogout = () => {
        localStorage.removeItem("user");
        setShowProfile(false);
        navigate("/home");
      };
  return (
    <div className="ca-supply-page">

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
      <div className="ca-supply-content">
        <h1>CA Supply Chain Transparency Act</h1>

        <p>
          At <strong>Pet Rescue Hub</strong>, we are committed to ethical
          business practices and transparency. This statement explains
          how we work to ensure that slavery and human trafficking do 
          not exist in our supply chain, in compliance with the
          California Transparency in Supply Chains Act of 2010.
        </p>

        <h3>1. Our Commitment</h3>
        <p>
          We enforce strict policies to prevent forced labor, child labor,
          and human trafficking. All suppliers must follow ethical and
          humane working standards.
        </p>

        <h3>2. Supplier Verification</h3>
        <p>
          We evaluate suppliers to identify risks related to unethical
          labor practices. We only partner with organizations that align
          with our values.
        </p>

        <h3>3. Auditing</h3>
        <p>
          Regular audits help ensure suppliers comply with our ethical
          policies. Violations may result in removal from our supply chain.
        </p>

        <h3>4. Training & Awareness</h3>
        <p>
          We train employees and partners to recognize signs of unethical
          labor practices and report issues.
        </p>

        <h3>5. Reporting Concerns</h3>
        <p>
          If anyone suspects violations, they can contact us confidentially at:
          <br />
          <b>ethics@petrescuehub.org</b>
        </p>

        <h3>6. Continuous Improvement</h3>
        <p>
          We continuously evaluate and enhance our supply chain policies to
          maintain transparency and accountability.
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

export default CASupplyChainAct;

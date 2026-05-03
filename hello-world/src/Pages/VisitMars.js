import React from "react";
import "./VisitMars.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
 
function VisitMars() {
  const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // simple & effective
};

  return (
        <div className="visitmars">
      {/* ✅ Navbar */}
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
    <div className="mars-container">
      <header className="mars-header">
        <h1>Welcome to Mars Petcare</h1>
        <p>Building a better world for pets — because pets make our world better ❤️</p>
      </header>

      <section className="mars-content">
        <h2>About Mars Petcare</h2>
        <p>
          Mars Petcare is one of the world’s leading pet care companies, dedicated to creating 
          a better world for pets. With well-known brands like Pedigree, Whiskas, Royal Canin, 
          and Sheba, Mars Petcare works globally to improve pet health, nutrition, and welfare.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe pets make our lives better — that’s why we work every day to make their 
          lives better too. From nutritious food and advanced veterinary care to adoption 
          programs and sustainability efforts, Mars is committed to the future of pet well-being.
        </p>

        <h2>Learn More</h2>
        <p>
          To explore our full range of initiatives, visit the official Mars Petcare website:
        </p>
        <a
          href="https://www.mars.com/made-by-mars/petcare"
          target="_blank"
          rel="noopener noreferrer"
          className="mars-link"
        >
          🌐 Visit Mars Petcare Official Website
        </a>
      </section>
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

export default VisitMars;

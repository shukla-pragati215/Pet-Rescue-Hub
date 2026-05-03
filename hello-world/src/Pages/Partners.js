import React from "react";
import { Link } from "react-router-dom";
import "./Partners.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function Partners() {
  const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // simple & effective
};

  return (
    <div className="partners">
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
      <div className="partners-page">
        <h1>🤝 Partner Shelters & NGOs</h1>
        <p>
          We proudly collaborate with trusted animal shelters and NGOs across India to help
          rescue, care for, and rehome stray animals.
          These organizations play a vital role in ensuring every pet finds a loving home.
        </p>

        <div className="partners-list">
          <div className="partner-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Paw Rescue Foundation"
            />
            <h3>Paw Rescue Foundation</h3>
            <p>
              📍 Mumbai, Maharashtra <br />
              🐶 Specializes in rescuing abandoned dogs and providing vaccination drives.
            </p>
            <a href="https://pawrescuefoundation.org" target="_blank" rel="noreferrer">
              Visit Website
            </a>
          </div>

          <div className="partner-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Animal Angels NGO"
            />
            <h3>Animal Angels NGO</h3>
            <p>
              📍 Pune, Maharashtra <br />
              🐱 Focused on cat rescue, adoption camps, and awareness programs.
            </p>
            <a href="https://animalangels.org" target="_blank" rel="noreferrer">
              Visit Website
            </a>
          </div>

          <div className="partner-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Care4Paws Trust"
            />
            <h3>Care4Paws Trust</h3>
            <p>
              📍 Delhi NCR <br />
              🐾 Provides free medical treatment and emergency rescue for stray animals.
            </p>
            <a href="https://care4paws.org" target="_blank" rel="noreferrer">
              Visit Website
            </a>
          </div>

          <div className="partner-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Hope for Paws"
            />
            <h3>Hope for Paws</h3>
            <p>
              📍 Bengaluru, Karnataka <br />
              🐕 Works on large-scale sterilization programs and rehoming initiatives.
            </p>
            <a href="https://hopeforpaws.org" target="_blank" rel="noreferrer">
              Visit Website
            </a>
          </div>
        </div>

        <br /><br /><br /><br />

        <p className="join-note">
          ❤️ Want to partner with us? <Link to="/contact">Contact us</Link> to list your NGO or shelter.
        </p>
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

export default Partners;

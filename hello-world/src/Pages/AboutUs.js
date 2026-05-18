import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AboutUs() {
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));
        const [showProfile, setShowProfile] = useState(false);
      
        const handleLogout = () => {
          localStorage.removeItem("user");
          setShowProfile(false);
          navigate("/home");
        };
  return (
    <div className="about-page">
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
      <div className="about-content">
        <h1>About Us 🐾</h1>
        <p className="intro">
          Welcome to <strong>Pet Rescue Hub</strong> — where compassion meets care.
          We are dedicated to helping animals find loving homes, providing medical
          assistance to rescued pets, and spreading awareness about responsible pet care.
        </p>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            To create a world where every pet is loved, cared for, and given a second chance
            at life. We strive to bridge the gap between abandoned animals and kind-hearted adopters.
          </p>
        </section>

        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>
            We envision a society where pet adoption becomes the first choice, not an afterthought.
            Through education, technology, and collaboration, we aim to reduce pet homelessness
            and promote kindness toward all living beings.
          </p>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Team Member" />
              <h4>Pragati Shukla</h4>
              <p>Founder & Animal Welfare Advocate</p>
            </div>
            <div className="team-card">
              <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" alt="Team Member" />
              <h4>Rahul Verma</h4>
              <p>Veterinary Coordinator</p>
            </div>
            <div className="team-card">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="Team Member" />
              <h4>Anjali Mehta</h4>
              <p>Volunteer & Outreach Manager</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>
            📧 Email: <a href="mailto:info@petrescuehub.com">info@petrescuehub.com</a> <br />
            📞 Phone: +91 98765 43210
          </p>
        </section>
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

export default AboutUs;

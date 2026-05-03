import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import CookieSettings from "./CookieSettings";
import { FaUserCircle } from "react-icons/fa";

function Home() {
  const [showCookies, setShowCookies] = useState(false);

 
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  setShowProfile(false);
  navigate("/home");
};

  return (
    <div className="app-container">
      {/* Navbar */}
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


      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Pet Rescue Hub</h1>
          <p>Every Paw Deserves a Home</p>
          <Link to="/pets">
            <button className="view-btn">View Available Pets</button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="adopt" className="features">
        <Link to="/adopt" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="feature-card">
            <img src="https://img.icons8.com/ios/100/dog.png" alt="Find a Pet" />
            <h3>Find a Pet</h3>
            <p>Search for adoptable dogs & cats</p>
          </div>
        </Link>

        <Link to="/lost-found" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="feature-card">
            <img src="https://img.icons8.com/ios/100/search--v1.png" alt="Lost & Found" />
            <h3>Lost & Found</h3>
            <p>Report or search for lost/found pets</p>
          </div>
        </Link>

        <Link to="/pet-care" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="feature-card">
            <img src="pet care.jpg" alt="Pet Care Tips" />
            <h3>Pet Care Tips</h3>
            <p>Articles & tips for caring <br /> for pets</p>
          </div>
        </Link>

        <Link
          to="/nearby-shops"
          state={{ lat: 19.076, lng: 72.8777 }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="feature-card">
            <img src="https://img.icons8.com/ios/100/shop.png" alt="Pet Shops" />
            <h3>Pet Shops</h3>
            <p>Discover local stores for pet supplies</p>
          </div>
        </Link>
      </section>

      {/* Clinics */}
      <section className="clinics">
        <h2>Nearby Veterinary Clinics</h2>

        <div className="clinics-wrapper">
          {/* Left clinic cards */}
          <div className="clinics-list">

            <div className="clinic-item">
               <Link
          to="/nearby-vets"
          state={{ city: "Mumbai", lat: 19.076, lng: 72.8777 }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>Happy Paws Vet Clinic</h3>
          <p>📍 Near Shree L.R Tiwari College, Mira Road</p>
        </Link>
            </div>

            <div className="clinic-item">
              <Link
          to="/nearby-vets"
          state={{ city: "Pune", lat: 18.5204, lng: 73.8567 }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>Care & Cure Veterinary Hospital</h3>
          <p>📍Hatkesh Area, Mira Road East</p>
        </Link>
            </div>

            <div className="clinic-item">
              <Link
          to="/nearby-vets"
          state={{ city: "Delhi", lat: 28.6139, lng: 77.209 }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>Happy Paws Vet Clinic</h3>
          <p>📍 Mira Bhayandar Road, Mira Road</p>
        </Link>
            </div>

          </div>

          {/* Right Side */}
          <div className="clinics-right">
            <div className="clinics-image">
              <img src="pet shop.jpeg" alt="Pet Shops" />
            </div>

           <div className="petshops">
  <h2>Nearby Pet Shops</h2>

  <Link
    to="/nearby-shops"
    state={{ shop: "Bark & Bite", distance: "0.4 mi" }}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div className="clinic-item">
      🐾 Meowy Pet Shop - 2.7km away
    </div>
  </Link>

  <Link
    to="/nearby-shops"
    state={{ shop: "Happy Paws Store", distance: "0.6 mi" }}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div className="clinic-item">
      🐾Pet World Store - 3.4 km away
    </div>
  </Link>

  <Link
    to="/nearby-shops"
    state={{ shop: "Pets World", distance: "1.2 mi" }}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div className="clinic-item">
      🐾 Dog & Cat Pet Shop - 2.5km away
    </div>
  </Link>
</div>


            <div className="contact-info">
              <p>📧 Email: fpricusehub.org</p>
              <p>📞 (123) 456-7890</p>
              <p>📍 123 Paw St, City, State 56739</p>
            </div>

            <Link to="/volunteer" style={{ textDecoration: "none", color: "inherit" }}>
              <button className="volunteer-btn">Become a Volunteer</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div className="contact">
        <h2>Contact Us</h2>
        <div className="contact-wrapper">
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send</button>
          </form>
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

export default Home;

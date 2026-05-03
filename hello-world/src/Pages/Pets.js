import React from "react";
import { Link } from "react-router-dom";
import "./Pets.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import CookieSettings from "./CookieSettings";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const petsData = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    age: "2 years",
    breed: "Labrador",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Mittens",
    type: "Cat",
    age: "1 year",
    breed: "Siamese",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Charlie",
    type: "Dog",
    age: "3 years",
    breed: "Beagle",
    image:
      "dog4.jpeg",
  },
  {
    id: 4,
    name: "Luna",
    type: "Cat",
    age: "6 months",
    breed: "Persian",
    image:
      "a.jpeg",
  },
];

function Pets() {
  const [showCookies, setShowCookies] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // simple & effective
};
 

  return (
    <div className="app-container">
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
      <div className="pets-container">
        <h1 className="title">Available Pets for Adoption</h1>
        <p className="subtitle">Find your new furry friend today!</p>

        <div className="pets-grid">
          {petsData.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.image} alt={pet.name} />
              <h3>{pet.name}</h3>
              <p>Type: {pet.type}</p>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age}</p>

              <Link to={`/adopt/${pet.id}`}>
                <button className="adopt-btn">Adopt Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h2 className="logo">
            🏠 Adopt a Pet <span>Powered by Pedigree</span>
          </h2>
          <p>©2023 Mars or Affiliates.</p>

          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/adopt">Find a Pet</Link>
            </li>
            <li>
              <Link to="/faqs">Adoption Faqs</Link>
            </li>
            <li>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/partners">Partner Shelters & NGOs</Link>
            </li>
            <li>
              <Link to="/care">Caring For Pets</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/signup">Create an account</Link>
            </li>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/mars">Visit Mars.com</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Statement</Link>
            </li>
            <li>
              <Link to="/legal">Legal</Link>
            </li>
            <li>
              <Link to="/ca-supply">CA Supply Chain Transparency Act</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/modern-slavery">Modern Slavery Act</Link>
            </li>
            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link to="/cookies">Cookies Notice</Link>
            </li>
            <li>
              <Link to="/adchoices">AdChoices</Link>
            </li>
          </ul>
        </div>

        <div className="cookie-btn">
<button onClick={() => setShowCookies(true)}>
  Cookies Settings
</button>
        </div>
      </footer>
      {showCookies && (
  <CookieSettings onClose={() => setShowCookies(false)} />
)}

    </div>
  );
}

export default Pets;

import React, { useState, useEffect } from "react";
import "./Adopt.css";
import { Link, useNavigate } from "react-router-dom";
import SubmitInterestForm from "./SubmitInterestForm";
import CookieSettings from "./CookieSettings";
import { FaFacebookF, FaTwitter, FaInstagram, FaUserCircle } from "react-icons/fa";

function Adopt() {
  const API = "http://localhost:5000";

  const [showFindPetPopup, setShowFindPetPopup] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [pets, setPets] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");

  const navigate = useNavigate();

  // ✅ safe user parse
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/login"); // or "/home"
  };

  // ✅ FETCH PETS
  useEffect(() => {
    fetch(`${API}/api/pets`)
      .then((res) => res.json())
      .then((data) => setPets(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  // ✅ SEARCH PET
  const handleFindPet = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API}/api/pets/search?location=${encodeURIComponent(location)}&type=${encodeURIComponent(
          type
        )}&breed=${encodeURIComponent(breed)}`
      );

      const data = await res.json();
      setPets(Array.isArray(data) ? data : []);
      setShowFindPetPopup(false);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="adopt-container">
      {/* NAVBAR */}
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
          {user ? (
            <div className="profile-wrapper">
              <FaUserCircle
                size={28}
                className="profile-icon"
                onClick={() => setShowProfile((s) => !s)}
              />

              {showProfile && (
                <div className="profile-dropdown">
                  <p>
                    <strong>{user.name}</strong>
                  </p>
                  <p className="email">{user.email}</p>
                  <hr />
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="adopt-hero">
        <div className="hero-left">
          <h1>Welcome to Pet Rescue Hub</h1>
          <p>helping every paw find a home</p>

          <div className="hero-buttons">
            {/* ✅ route casing fixed */}
            <Link to="/view-pets">
              <button className="view-btn">View Pets</button>
            </Link>

            {/* ✅ route casing fixed */}
            <Link to="/adoption">
              <button className="adopt-btn">Adopt Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Rescue Pet Categories</h2>

        <div className="category-grid">
          <div className="category-card" onClick={() => setShowFindPetPopup(true)}>
            <img src="https://img.icons8.com/ios/100/dog.png" alt="Find a pet" />
            <h3>Find a pet</h3>
          </div>

          <div className="category-card" onClick={() => setShowInterestForm(true)}>
            <img src="https://img.icons8.com/ios/100/form.png" alt="Submit form" />
            <h3>Submit interest form</h3>
          </div>

          <div className="category-card">
            <Link to="/adopt-with-love" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="https://img.icons8.com/ios/100/like--v1.png" alt="Adopt with Love" />
              <h3>Adopt with Love</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* FIND PET POPUP */}
      {showFindPetPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Find a Pet</h2>
              <button className="close-btn" onClick={() => setShowFindPetPopup(false)}>
                ×
              </button>
            </div>

            <form className="find-pet-form" onSubmit={handleFindPet}>
              <div className="form-group">
                <label>Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Pet Type</label>
                <input value={type} onChange={(e) => setType(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Breed</label>
                <input value={breed} onChange={(e) => setBreed(e.target.value)} />
              </div>

              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ INTEREST FORM POPUP (fix unused import/state) */}
      {showInterestForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">              
            </div>

            <SubmitInterestForm onClose={() => setShowInterestForm(false)} />
          </div>
        </div>
      )}

      {/* PETS */}
      <section className="available-pets">
        <h2>Available Pets</h2>

        <div className="pets-grid">
          {pets.length === 0 ? (
            <p>No pets found</p>
          ) : (
            pets.map((pet) => (
              <div className="pet-card" key={pet._id}>
                <img
                  src={`${API}/uploads/${pet.image}`}
                  alt={pet.name}
                  onError={(e) => {
                    e.target.src =
                      "https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/pet-adoption-logo-template-vector.jpg";
                  }}
                />

                <h3>{pet.name}</h3>
                <p>{pet.age}</p>

                <button className="adopt-btn" onClick={() => navigate("/pet-details", { state: pet })}>
                  Adopt
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
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
            <li><Link to="/faqs">Adoption FAQs</Link></li>
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

export default Adopt;
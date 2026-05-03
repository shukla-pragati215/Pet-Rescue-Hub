// LostFound.js
import React, { useState, useEffect } from "react";
import "./LostFound.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function LostFound() {
  const navigate = useNavigate();

  // 🔹 DATA STATE (Backend se aayega)
  const [lostFoundPets, setLostFoundPets] = useState([]);

  // 🔹 UI STATES
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [animalFilter, setAnimalFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // 🔹 FETCH DATA FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/lost-found")
      .then((res) => res.json())
      .then((data) => setLostFoundPets(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🔹 FILTER LOGIC (🔥 ERROR FIX HERE)
  const filteredPets = lostFoundPets.filter((pet) => {
    return (
      (statusFilter === "All" || pet.status === statusFilter) &&
      (animalFilter === "All" || pet.animal === animalFilter) &&
      (locationFilter === "All" || pet.location === locationFilter) &&
      (
        pet.name?.toLowerCase().includes(search.toLowerCase()) ||
        pet.breed?.toLowerCase().includes(search.toLowerCase())
      )
    );
  });
const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // simple & effective
};

  return (
    <div className="adopt-container">
      
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

      <div className="lostfound-container">

        {/* Header */}
        <header className="lostfound-header">
          <h1>🐾 PET RESCUE HUB</h1>
          <h2>Lost and Found Pets</h2>
          <p>
            Report or find lost pets in your area. Help reunite furry friends with
            their families.
          </p>
        </header>

        {/* Search */}
        <div className="lostfound-controls">
          <input
            type="text"
            placeholder="Search by name or breed"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Filters */}
        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">Lost & Found</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <select value={animalFilter} onChange={(e) => setAnimalFilter(e.target.value)}>
            <option value="All">All Animals</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
          </select>

          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="All">All Locations</option>
            <option value="Green Valley">Green Valley</option>
            <option value="Downtown">Downtown</option>
          </select>
        </div>

        {/* Pets Grid */}
        <div className="pets-grid">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div className="pet-card" key={pet._id || pet.id}>
                <img src={pet.image} alt={pet.name} />
                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
                <p>{pet.location}</p>
                <p>{pet.contactName}</p>
                <p>{pet.contactPhone}</p>

              <button
  className="view-btn"
  onClick={() => navigate(`/lostfound-details/${pet._id}`)}
>
  View Details
</button>

              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>
              No pets found 😔
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="lostfound-footer-lf">
  <Link to="/">Home</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/policy">Privacy Policy</Link>
</footer>

      </div>
    </div>
  );
}

export default LostFound;

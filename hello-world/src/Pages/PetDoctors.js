import React, { useEffect, useState } from "react";
import "./PetDoctors.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function PetDoctors() {
  const [filterPet, setFilterPet] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [doctors, setDoctors] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/doctors?petType=${filterPet}&location=${filterLocation}`
    )
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, [filterPet, filterLocation]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://via.placeholder.com/300x220?text=No+Image";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `http://localhost:5000${imagePath}`;
  };

  return (
    <div className="adopt-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/adopt">Adopt a Pet</Link>
          <Link to="/lost-found">Lost &amp; Found</Link>
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
                onClick={() => setShowProfile(!showProfile)}
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

      {/* Filters */}
      <div className="filters">
        <select value={filterPet} onChange={(e) => setFilterPet(e.target.value)}>
          <option value="All">All Pets</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
        </select>

        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Gurgaon">Gurgaon</option>
        </select>
      </div>

      <br />
      <br />

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div className="doctor-card" key={doctor._id}>
              {doctor.recommended && (
                <span className="recommended-badge">🏆 Recommended</span>
              )}

              <img
                src={getImageUrl(doctor.image)}
                alt={doctor.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x220?text=Image+Not+Found";
                }}
              />

              <h3>{doctor.name}</h3>
              <p className="speciality">{doctor.speciality}</p>
              <p className="experience">{doctor.experience}</p>
              <p className="location">📍 {doctor.location}</p>
              <div className="rating">⭐ {doctor.rating} / 5</div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No doctors found.
          </p>
        )}
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

export default PetDoctors;
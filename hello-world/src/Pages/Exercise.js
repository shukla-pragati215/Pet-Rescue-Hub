import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Exercise.css";
import { FaUserCircle } from "react-icons/fa";

function Exercise() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // ✅ Define exercise object to remove errors
  const exercise = {
    title: "Daily Pet Exercise",
    description: "Keep your pets healthy and active with these exercises.",
    types: ["Walking", "Fetch", "Running", "Agility Training"],
    schedule: [
      { petType: "Dog", exercise: "Walking", duration: "30 mins" },
      { petType: "Cat", exercise: "Climbing", duration: "15 mins" },
      { petType: "Rabbit", exercise: "Hopping", duration: "20 mins" },
    ],
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

      {/* Exercise Content */}
      <div className="exercise-container">
        <h1 className="title">{exercise.title}</h1>
        <p className="subtitle">{exercise.description}</p>

        <div className="image-container">
          <img src="training.jpg" alt="Pet exercising" className="exercise-image" />
        </div>

        <div className="exercise-info">
          <h2>💡 Types of Exercises</h2>
          <ul>
            {exercise.types.map((item, i) => (
              <li key={i}>🐾 {item}</li>
            ))}
          </ul>

          <h2>📅 Exercise Schedule</h2>
          <table className="exercise-table">
            <thead>
              <tr>
                <th>Pet Type</th>
                <th>Exercise</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {exercise.schedule.map((row, i) => (
                <tr key={i}>
                  <td>{row.petType}</td>
                  <td>{row.exercise}</td>
                  <td>{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="lostfound-footer">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/policy">Privacy Policy</Link>
      </footer>
    </div>
  );
}

export default Exercise;

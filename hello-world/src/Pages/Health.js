import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Health.css";
import { FaUserCircle } from "react-icons/fa";

function Health() {
  const [health, setHealth] = useState({
    title: "Pet Health",
    subtitle: "Preventive care and medical check-ups for pets",
    whyCare:
      "Regular health check-ups, vaccinations, and preventive care ensure your pet stays healthy, happy, and lives a longer life.",
    preventiveCare: [],
    commonIssues: [],
    schedule: [],
    videos: [],
  });

  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => {
        setHealth({
          title: data?.title || "Pet Health",
          subtitle:
            data?.subtitle ||
            "Preventive care and medical check-ups for pets",
          whyCare:
            data?.whyCare ||
            "Regular health check-ups, vaccinations, and preventive care ensure your pet stays healthy, happy, and lives a longer life.",
          preventiveCare: data?.preventiveCare || [
            "💉 Timely vaccinations to prevent diseases",
            "🧪 Regular deworming to keep them parasite-free",
            "🐾 Flea and tick prevention treatments",
            "🥩 Balanced diet for strong immunity",
            "🏥 Annual vet check-ups",
          ],
          commonIssues: data?.commonIssues || [
            "🐶 Dogs – Obesity, ear infections, arthritis",
            "🐱 Cats – Dental disease, kidney problems, obesity",
            "🐇 Rabbits – Digestive issues, overgrown teeth",
            "🐦 Birds – Feather plucking, respiratory infections",
          ],
          schedule: data?.schedule || [
            {
              ageGroup: "Puppies/Kittens",
              frequency: "Every 3–4 weeks until 16 weeks old",
            },
            {
              ageGroup: "Adult Pets",
              frequency: "Once a year",
            },
            {
              ageGroup: "Senior Pets",
              frequency: "Twice a year",
            },
          ],
          videos: data?.videos || [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch health data:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="adopt-container">
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

      <div className="health-container">
        <h1 className="title">{health.title}</h1>
        <p className="subtitle">{health.subtitle}</p>

        <div className="image-container">
          <img src="vet.jpg" alt="Pet Health" className="health-image" />
        </div>

        <div className="health-info">
          <h2>💙 Why Health Care Matters?</h2>
          <p>{health.whyCare}</p>

          <h2>🩺 Preventive Care</h2>
          <ul>
            {health.preventiveCare.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>⚠️ Common Health Issues</h2>
          <ul>
            {health.commonIssues.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>📅 Health Check-up Schedule</h2>
          <table className="health-table">
            <thead>
              <tr>
                <th>Pet Age</th>
                <th>Check-up Frequency</th>
              </tr>
            </thead>
            <tbody>
              {health.schedule.map((item, index) => (
                <tr key={index}>
                  <td>{item.ageGroup}</td>
                  <td>{item.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="video-section">
        <h2>🎥 Videos & Guides</h2>
        <p>Learn pet care techniques with these helpful videos</p>

        {loading ? (
          <p className="loading-text">Loading videos...</p>
        ) : (
          <div className="video-container">
            {health?.videos?.length > 0 ? (
              health.videos.map((video, index) => (
                <div className="video-card" key={index}>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-link"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="video-thumbnail"
                    />
                  </a>

                  <h4>{video.title}</h4>

                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-btn"
                  >
                    ▶ Watch on YouTube
                  </a>
                </div>
              ))
            ) : (
              <p className="no-video">No videos available</p>
            )}
          </div>
        )}
      </div>

      <footer className="lostfound-footer">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/policy">Privacy Policy</Link>
      </footer>
    </div>
  );
}

export default Health;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./LostFoundDetails.css";
import { FaUserCircle } from "react-icons/fa";

function LostFoundDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
const [showProfile, setShowProfile] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload(); // simple & effective
};
  const { id } = useParams(); // /lostfound-details/:id
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/lost-found/${id}`)
      .then((res) => res.json())
      .then((data) => setPet(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pet) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
 
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

      <div className="lf-details-page">
        <div className="lf-details-card">
          <img src={pet.image} alt={pet.name} />

          <div className="lf-info">
            <h2>{pet.name}</h2>
            <span className={`status ${pet.status.toLowerCase()}`}>
              {pet.status}
            </span>

            <p><b>Animal:</b> {pet.animal}</p>
            <p><b>Breed:</b> {pet.breed}</p>
            {pet.color && <p><b>Color:</b> {pet.color}</p>}
            <p><b>Location:</b> {pet.location}</p>
            {pet.lastSeen && <p><b>Last Seen:</b> {pet.lastSeen}</p>}
            {pet.description && <p>{pet.description}</p>}

            <button className="contact-btn">
              📞 {pet.contactName}: {pet.contactPhone}
            </button>

            <button className="back-btn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
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

export default LostFoundDetails;

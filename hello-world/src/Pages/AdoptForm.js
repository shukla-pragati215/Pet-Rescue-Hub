import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdoptForm.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const petsData = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    age: "2 years",
    breed: "Labrador",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Mittens",
    type: "Cat",
    age: "1 year",
    breed: "Siamese",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Charlie",
    type: "Dog",
    age: "3 years",
    breed: "Beagle",
    image: "/dog4.jpeg",
  },
  {
    id: 4,
    name: "Luna",
    type: "Cat",
    age: "6 months",
    breed: "Persian",
    image: "/a.jpeg",
  },
];

function AdoptForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // ✅ ADD THIS
    const [showProfile, setShowProfile] = useState(false);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      setShowProfile(false);
      navigate("/home");
    };
  const { id } = useParams();
  const pet = petsData.find((p) => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/adoption-form", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  petId: pet.id,
  petName: pet.name,
  petType: pet.type,
  petAge: pet.age,
  petBreed: pet.breed,
  petImage: pet.image,
  name: formData.name,
  email: formData.email,
  address: formData.address,
  message: formData.message,
}),
});

     
    const data = await res.json();

    if (res.ok) {
      alert("Adoption request submitted successfully ✅");
      setFormData({ name: "", email: "", address: "", message: "" });
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
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

      {/* Main Form Content */}
      <div className="adoptform-container">
        <h1>Adopt {pet.name}</h1>

        <div className="pet-details">
          <img src={pet.image} alt={pet.name} />
          <div className="pet-info">
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age}</p>
          </div>
        </div>

        <h2>Fill Adoption Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="submit-btn">Submit Request</button>
        </form>

        <Link to="/pets" className="back-link">← Back to Pets</Link>

        {/* Footer */}
        <footer className="lostfound-footer">
          <a href="/">Home</a>
          <a href="/contact">Contact</a>
          <a href="/policy">Privacy Policy</a>
        </footer>
      </div>
    </div>
  );
}

export default AdoptForm;

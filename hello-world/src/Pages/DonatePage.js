import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DonatePage.css";
import { FaUserCircle } from "react-icons/fa";

function DonatePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [donor, setDonor] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowProfile(false);
    navigate("/home");
  };

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  const handlePurposeClick = (value) => {
    setPurpose(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
  };

  // SUBMIT DONATION (FAKE PAYMENT + BACKEND SAVE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donor.name || !donor.email || !donor.phone) {
      alert("Please fill all donor details");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please select or enter a valid donation amount");
      return;
    }

    if (!purpose) {
      alert("Please select donation purpose");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: donor.name,
          email: donor.email,
          phone: donor.phone,
          amount: Number(amount),
          purpose,
          paymentMethod: "Fake Payment",
          paymentStatus: "Success",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        alert(data.message || "Something went wrong");
        return;
      }

      // Fake payment delay
      setTimeout(() => {
        setLoading(false);
        navigate("/payment-success", {
          state: {
            donorName: donor.name,
            amount: Number(amount),
            purpose,
          },
        });
      }, 2500);
    } catch (error) {
      console.error("Donation error:", error);
      setLoading(false);
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

      {/* Main Donate Section */}
      <div className="donate-container">
        <h1>Make a Difference Today</h1>
        <p>
          Your donation helps provide food, shelter, and care for homeless
          animals.
        </p>

        {/* Amount Selector */}
        <div className="amount-section">
          {[100, 250, 500, 1000].map((value) => (
            <button
              type="button"
              key={value}
              className={`amount-btn ${amount === value ? "active" : ""}`}
              onClick={() => handleAmountClick(value)}
            >
              ₹ {value}
            </button>
          ))}

          <input
            type="number"
            placeholder="₹ Custom amount"
            value={
              amount && ![100, 250, 500, 1000].includes(Number(amount))
                ? amount
                : ""
            }
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
          />
        </div>

        {/* Purpose */}
        <h2>Donation Purpose</h2>
        <div className="purpose-section">
          {[
            { label: "FOOD", icon: "🍲" },
            { label: "SHELTER", icon: "🏠" },
            { label: "HEALTHCARE", icon: "➕" },
            { label: "ADOPTION", icon: "❤️" },
          ].map((item) => (
            <button
              type="button"
              key={item.label}
              className={`purpose-btn ${
                purpose === item.label ? "active" : ""
              }`}
              onClick={() => handlePurposeClick(item.label)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Donor Form */}
        <h2>Donor Information</h2>
        <form onSubmit={handleSubmit} className="donor-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={donor.name}
            onChange={handleInputChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={donor.email}
            onChange={handleInputChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={donor.phone}
            onChange={handleInputChange}
            required
          />

          <div className="payment-methods">
            <span>UPI (Demo)</span>
            <span>Card (Demo)</span>
            <span>Net Banking (Demo)</span>
          </div>

          <button type="submit" className="complete-btn" disabled={loading}>
            {loading ? "Processing Payment..." : "COMPLETE DONATION"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DonatePage;
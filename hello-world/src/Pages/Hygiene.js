import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hygiene.css";
import { FaUserCircle } from "react-icons/fa";

const Hygiene = () => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]); // ✅ only keep what we use

  // ✅ Safe user parse
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/login"); // ✅ better UX than reload
  };

  useEffect(() => {
    const fetchHygiene = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hygiene");
        const data = await res.json();

        // ✅ safe fallback
        setProducts(Array.isArray(data?.products) ? data.products : []);
      } catch (err) {
        console.log(err);
        setProducts([]);
      }
    };

    fetchHygiene();
  }, []);

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

      {/* Main Content */}
      <div className="hygiene-container">
        <h1 className="title">Pet Hygiene</h1>
        <p className="subtitle">Keep your pet clean, healthy and happy</p>

        <div className="image-container">
          <img src="/hygiene.png" alt="Pet Hygiene" className="hygiene-image" />
        </div>

        {/* Hygiene Tips */}
        <div className="hygiene-tips">
          <h2>Why Hygiene is Important</h2>
          <p>
            Good hygiene helps prevent diseases, parasites, and discomfort in pets.
            Regular grooming also helps build trust between you and your pet.
          </p>

          <h2>Basic Hygiene Tips</h2>
          <ul>
            <li>🛁 Bathe your pet regularly using pet-friendly shampoo</li>
            <li>🧼 Clean ears to prevent infections</li>
            <li>🪥 Brush their teeth to avoid dental issues</li>
            <li>✂️ Trim nails to prevent overgrowth and pain</li>
            <li>🧴 Use flea and tick treatments as needed</li>
          </ul>

          <h2>Grooming Schedule</h2>
          <table className="hygiene-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bathing</td>
                <td>Once every 2–4 weeks</td>
              </tr>
              <tr>
                <td>Brushing</td>
                <td>2–3 times a week</td>
              </tr>
              <tr>
                <td>Nail Trimming</td>
                <td>Every 3–4 weeks</td>
              </tr>
              <tr>
                <td>Ear Cleaning</td>
                <td>Once a month</td>
              </tr>
              <tr>
                <td>Teeth Brushing</td>
                <td>2–3 times a week</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Prices & Products */}
        <div className="price-section">
          <h2>💲 Grooming & Hygiene Services Price List</h2>

          <table className="price-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Full Grooming (Bath + Haircut + Nail Trim)</td>
                <td>1500</td>
              </tr>
              <tr>
                <td>Bath & Blow Dry</td>
                <td>800</td>
              </tr>
              <tr>
                <td>Nail Trimming</td>
                <td>300</td>
              </tr>
              <tr>
                <td>Ear Cleaning</td>
                <td>400</td>
              </tr>
              <tr>
                <td>Teeth Cleaning</td>
                <td>600</td>
              </tr>
              <tr>
                <td>Anti-Tick/Flea Treatment</td>
                <td>1000</td>
              </tr>
            </tbody>
          </table>

          <h3>🛒 Pet Hygiene Products</h3>

          <div className="product-list">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id || p.id || p.name}
                  className="product-card"
                  onClick={() => setSelectedProduct(p)}
                >
                  <h3>{p.name}</h3>
                  <p>{p.price}</p>
                </div>
              ))
            ) : (
              <p style={{ marginTop: 10 }}>No products available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name}</h2>
            <p>
              <strong>Price:</strong> {selectedProduct.price}
            </p>
            <p>{selectedProduct.desc}</p>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="lostfound-footer">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/policy">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default Hygiene;
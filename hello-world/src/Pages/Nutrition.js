import React, { useState, useMemo } from "react";
import "./Nutrition.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const PetNutrition = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dogs");
  const [query, setQuery] = useState("");
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [quickRefType, setQuickRefType] = useState(null);

  // ✅ safe user parse
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
    navigate("/login");
  };

  const data = useMemo(
    () => ({
      dogs: {
        image: "🐶",
        generic: {
          foods: [
            "Chicken, Rice, Vegetables",
            "Avoid chocolate, onions",
            "Portion: 1 cup per meal (avg adult medium dog)",
          ],
          chart: [
            { meal: "Breakfast", food: "Chicken & Rice", qty: "1 cup" },
            { meal: "Lunch", food: "Vegetables", qty: "0.5 cup" },
            { meal: "Dinner", food: "Dog food", qty: "1 cup" },
          ],
          tips: ["Provide fresh water", "Avoid human junk food", "Include proteins & vitamins"],
        },
        breeds: {
          labrador: {
            name: "Labrador Retriever",
            diet: ["High protein", "Healthy fats", "Complex carbs"],
            portion: "1.5 - 2 cups per day",
            notes: "Prone to obesity — limit treats.",
            chart: [
              { meal: "Breakfast", food: "Kibble + chicken", qty: "0.75 cup" },
              { meal: "Dinner", food: "Kibble", qty: "0.75 - 1 cup" },
            ],
          },
          "german shepherd": {
            name: "German Shepherd",
            diet: ["High protein", "Moderate fat", "Omega-3"],
            portion: "1.5 - 2.5 cups per day",
            notes: "Prone to joint issues.",
            chart: [
              { meal: "Breakfast", food: "Kibble + fish oil", qty: "1 cup" },
              { meal: "Dinner", food: "Kibble + veggies", qty: "1 cup" },
            ],
          },
        },
      },

      cats: {
        image: "🐱",
        generic: {
          foods: ["Fish, Chicken, Rice", "Avoid chocolate, onions, milk", "Portion: 0.5–1 cup per meal"],
          chart: [
            { meal: "Breakfast", food: "Fish & Rice", qty: "0.5 cup" },
            { meal: "Lunch", food: "Chicken", qty: "0.5 cup" },
            { meal: "Dinner", food: "Cat food", qty: "1 cup" },
          ],
          tips: ["Provide water", "Include taurine", "Avoid dog food"],
        },
        breeds: {
          persian: {
            name: "Persian",
            diet: ["High protein", "Moisture-rich food"],
            portion: "0.5 - 1 cup per day",
            notes: "Hairball issues — add fiber.",
            chart: [
              { meal: "Breakfast", food: "Wet food", qty: "0.25 cup" },
              { meal: "Dinner", food: "Dry food", qty: "0.25 - 0.5 cup" },
            ],
          },
          siamese: {
            name: "Siamese",
            diet: ["High protein", "Low carbs"],
            portion: "0.5 - 0.9 cup per day",
            notes: "Active breed — higher energy needs.",
            chart: [
              { meal: "Breakfast", food: "Wet + kibble", qty: "0.3 cup" },
              { meal: "Dinner", food: "Kibble", qty: "0.3 - 0.6 cup" },
            ],
          },
        },
      },

      birds: {
        image: "🦜",
        generic: {
          foods: ["Seeds, Fruits, Veggies", "Avoid avocado, chocolate"],
          chart: [
            { meal: "Breakfast", food: "Seeds", qty: "1 tbsp" },
            { meal: "Lunch", food: "Fruits", qty: "0.5 cup" },
            { meal: "Dinner", food: "Pellets", qty: "0.5 cup" },
          ],
          tips: ["Fresh water", "Balanced pellets", "Avoid junk food"],
        },
        breeds: {
          "african grey": {
            name: "African Grey Parrot",
            diet: ["Pellets + veggies + seeds"],
            portion: "2–4 tbsp pellets + produce",
            notes: "Needs calcium & mental stimulation.",
            chart: [
              { meal: "Breakfast", food: "Pellets + veggies", qty: "1 tbsp" },
              { meal: "Dinner", food: "Pellets + fruit", qty: "1 tbsp" },
            ],
          },
          cockatiel: {
            name: "Cockatiel",
            diet: ["Seeds + pellets + greens"],
            portion: "1–2 tbsp daily",
            notes: "Avoid avocado.",
            chart: [
              { meal: "Breakfast", food: "Seed mix", qty: "1 tbsp" },
              { meal: "Dinner", food: "Pellets + greens", qty: "1 tbsp" },
            ],
          },
        },
      },
    }),
    []
  );

  const current = data[activeTab];

  const breedList = useMemo(() => {
    return Object.keys(current.breeds || {}).map((k) => ({
      key: k,
      name: current.breeds[k].name,
    }));
  }, [current]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return breedList;
    return breedList.filter((b) => b.key.includes(q) || b.name.toLowerCase().includes(q));
  }, [query, breedList]);

  const handleSelectBreed = (key) => {
    const breed = current.breeds[key];
    setSelectedBreed(breed);
    setQuery(breed.name);
  };

  // ✅ Safe display data
  const display = selectedBreed || current.generic;
  const foodsOrDiet = Array.isArray(display.diet) ? display.diet : display.foods || [];
  const chartData = display.chart || current.generic.chart || [];
  const tipsData = display.tips || current.generic.tips || [];

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

      {/* Main Section */}
      <section className="pet-container">
        <h1 className="title">Pet Nutrition</h1>
        <p className="subtitle">Search by species or breed to get tailored nutrition</p>

        {/* Tabs */}
        <div className="tabs">
          {["dogs", "cats", "birds"].map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setQuery("");
                setSelectedBreed(null);
                setQuickRefType(null);
              }}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="search-row">
          <div className="search-input">
            <input
              type="text"
              placeholder={`Search ${activeTab} breeds...`}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedBreed(null);
              }}
            />
          </div>

          <div className="suggestions">
            {suggestions.length === 0 ? (
              <div className="no-sug">No breeds found</div>
            ) : (
              suggestions.map((s) => (
                <div
                  key={s.key}
                  className="suggestion"
                  onClick={() => handleSelectBreed(s.key)}
                >
                  {s.name}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="pet-image">{current.image}</div>

          <div className="food-section">
            <h3>
              {selectedBreed ? selectedBreed.name : `${activeTab.toUpperCase()} (General)`} — Recommended Food
            </h3>

            <ul>
              {foodsOrDiet.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className="portion">
              <strong>Portion:</strong> {display.portion || "Follow vet advice"}
            </div>

            {display.notes && (
              <div className="notes">
                <strong>Notes:</strong> {display.notes}
              </div>
            )}
          </div>
        </div>

        {/* Diet Chart */}
        <h3 className="chart-title">DAILY DIET CHART</h3>
        <table className="diet-table">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Food</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((row, i) => (
              <tr key={i}>
                <td>{row.meal}</td>
                <td>{row.food}</td>
                <td>{row.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tips */}
        <h3 className="tips-title">TIPS & GUIDELINES</h3>
        <ul className="tips-list">
          {tipsData.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        {/* Quick Reference */}
        <div className="quick-ref">
          <div className="quick-item" onClick={() => setQuickRefType("reference")}>Quick Reference</div>
          <div className="quick-item" onClick={() => setQuickRefType("snacks")}>Snacks</div>
          <div className="quick-item" onClick={() => setQuickRefType("seasonal")}>Seasonal Tips</div>
        </div>

        {quickRefType === "snacks" && (
          <div className="quick-section">
            <h3>Healthy Snacks for {activeTab.toUpperCase()}</h3>
            <ul>
              {activeTab === "dogs" && (
                <>
                  <li>Carrot sticks</li>
                  <li>Boiled chicken bits</li>
                  <li>Peanut butter (xylitol-free)</li>
                </>
              )}
              {activeTab === "cats" && (
                <>
                  <li>Fish flakes</li>
                  <li>Boiled chicken</li>
                  <li>Catnip treats</li>
                </>
              )}
              {activeTab === "birds" && (
                <>
                  <li>Apple slices (no seeds)</li>
                  <li>Chopped spinach</li>
                  <li>Millet spray</li>
                </>
              )}
            </ul>
          </div>
        )}

        {quickRefType === "seasonal" && (
          <div className="quick-section">
            <h3>Seasonal Tips</h3>
            <ul>
              <li>Summer: Keep hydrated</li>
              <li>Winter: Warm bedding</li>
              <li>Monsoon: Keep paws dry</li>
            </ul>
          </div>
        )}

        {quickRefType === "reference" && (
          <div className="quick-section">
            <h3>General Quick Reference</h3>
            <ul>
              <li>Always provide clean water</li>
              <li>Never give chocolate or onions</li>
              <li>Consult a vet before big diet changes</li>
            </ul>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="lostfound-footer">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/policy">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default PetNutrition;
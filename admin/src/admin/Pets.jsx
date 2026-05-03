import { useState, useEffect, useMemo } from "react";
import "./Pets.css";
import axios from "axios";
import {
  FaPaw,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaDog,
  FaCat,
  FaCheckCircle,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Pets() {
  const API = "http://localhost:5000";
  const navigate = useNavigate();

  const initialForm = {
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "Not Specified",
    image: null,
    preview: "",
    description: "",
    status: "Available",
  };

  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  const fetchPets = async () => {
    try {
      setPageLoading(true);
      const res = await axios.get(`${API}/api/admin/pets`);
      setPets(res.data || []);
    } catch (error) {
      console.log("Error fetching pets", error);
      setPets([]);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setUser(JSON.parse(adminData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (!file) return;

      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const savePet = async () => {
    if (!formData.name || !formData.type) {
      alert("Pet name and type are required");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("breed", formData.breed);
      data.append("age", formData.age);
      data.append("gender", formData.gender);
      data.append("description", formData.description);
      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingPet) {
        await axios.put(`${API}/api/admin/pets/${editingPet}`, data);
      } else {
        await axios.post(`${API}/api/admin/pets`, data);
      }

      await fetchPets();
      setFormData(initialForm);
      setEditingPet(null);
      setShowForm(false);
    } catch (error) {
      console.log("Error saving pet", error);
      alert("Failed to save pet");
    } finally {
      setLoading(false);
    }
  };

  const editPet = (pet) => {
    setFormData({
      name: pet.name || "",
      type: pet.type || "",
      breed: pet.breed || "",
      age: pet.age || "",
      gender: pet.gender || "Not Specified",
      image: null,
      preview: pet.image ? `${API}/uploads/${pet.image}` : "",
      description: pet.description || "",
      status: pet.status || "Available",
    });

    setEditingPet(pet._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deletePet = async (id) => {
    if (!window.confirm("Delete this pet?")) return;

    try {
      await axios.delete(`${API}/api/admin/pets/${id}`);
      fetchPets();
    } catch (error) {
      console.log("Delete error", error);
      alert("Failed to delete pet");
    }
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const keyword = search.toLowerCase();
      return (
        (pet.name || "").toLowerCase().includes(keyword) ||
        (pet.type || "").toLowerCase().includes(keyword) ||
        (pet.breed || "").toLowerCase().includes(keyword) ||
        (pet.status || "").toLowerCase().includes(keyword)
      );
    });
  }, [pets, search]);

  const totalPets = pets.length;
  const availablePets = pets.filter((pet) => pet.status === "Available").length;
  const adoptedPets = pets.filter((pet) => pet.status === "Adopted").length;
  const dogsCount = pets.filter(
    (pet) => (pet.type || "").toLowerCase() === "dog"
  ).length;

  return (
    <div className="pets-page">
      <nav className="dashboard-navbar">
        <div className="logo-section">
          <div className="logo-badge">🐾</div>
          <div>
            <h2 className="logo-text">Pet Rescue Admin</h2>
            <p className="logo-subtext">Pets Management</p>
          </div>
        </div>

        <div className="nav-right">
          <div className="profile-wrapper">
            <FaUserCircle
              size={34}
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            />

            {showProfile && user && (
              <div className="profile-dropdown">
                <p>
                  <strong>{user.name}</strong>
                </p>
                <p className="email">{user.email}</p>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pets-container">
        <div className="hero-banner">
          <div>
            <p className="hero-tag">Rescue Dashboard</p>
            <h1>Manage Pets</h1>
            <p className="hero-text">
              Add new pets, update information, upload photos, and manage their
              availability status professionally.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setShowForm(true);
              setEditingPet(null);
              setFormData(initialForm);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaPlus /> Add New Pet
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card highlight">
            <div className="stat-icon">
              <FaPaw />
            </div>
            <div>
              <h4>Total Pets</h4>
              <h2>{totalPets}</h2>
            </div>
          </div>

          <div className="stat-card available-card">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div>
              <h4>Available</h4>
              <h2>{availablePets}</h2>
            </div>
          </div>

          <div className="stat-card adopted-card">
            <div className="stat-icon">
              <FaCat />
            </div>
            <div>
              <h4>Adopted</h4>
              <h2>{adoptedPets}</h2>
            </div>
          </div>

          <div className="stat-card dogs-card">
            <div className="stat-icon">
              <FaDog />
            </div>
            <div>
              <h4>Dogs</h4>
              <h2>{dogsCount}</h2>
            </div>
          </div>
        </div>

        <div className="toolbar-card">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, type, breed, status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {showForm && (
          <div className="pet-form-card">
            <div className="form-header">
              <h3>{editingPet ? "Edit Pet Details" : "Add New Pet"}</h3>
              <p>Fill in the details below to save the pet record.</p>
            </div>

            <div className="pet-form-grid">
              <input
                name="name"
                placeholder="Pet Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                name="type"
                placeholder="Type (Dog / Cat)"
                value={formData.type}
                onChange={handleChange}
              />

              <input
                name="breed"
                placeholder="Breed"
                value={formData.breed}
                onChange={handleChange}
              />

              <input
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Not Specified">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
              </select>
            </div>

            <div className="file-upload-section">
              <label className="upload-label">Upload Pet Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            {formData.preview && (
              <div className="preview-card">
                <img
                  src={formData.preview}
                  className="image-preview"
                  alt="preview"
                />
              </div>
            )}

            <textarea
              name="description"
              placeholder="Write pet description..."
              value={formData.description}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button className="save-btn" onClick={savePet} disabled={loading}>
                {loading ? "Saving..." : editingPet ? "Update Pet" : "Save Pet"}
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingPet(null);
                  setFormData(initialForm);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="table-card">
          <div className="table-header">
            <div>
              <h3>Pets List</h3>
              <p>{filteredPets.length} records found</p>
            </div>
          </div>

          {pageLoading ? (
            <div className="state-box">Loading pets...</div>
          ) : filteredPets.length === 0 ? (
            <div className="state-box">No pets found</div>
          ) : (
            <table className="pets-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Pet Details</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPets.map((pet) => (
                  <tr key={pet._id}>
                    <td>
                      {pet.image ? (
                        <img
                          src={`${API}/uploads/${pet.image}`}
                          alt={pet.name}
                          className="pet-table-img"
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>

                    <td>
                      <div className="pet-details">
                        <p className="pet-name">
                          {pet.name} <span>({pet.type})</span>
                        </p>
                        <p className="detail-line">Breed: {pet.breed || "N/A"}</p>
                        <p className="detail-line">
                          Age: {pet.age || "N/A"} | Gender: {pet.gender || "N/A"}
                        </p>
                        <p className="pet-description">
                          {pet.description || "No description available"}
                        </p>
                      </div>
                    </td>

                    <td>
                      <span className={`status ${pet.status.toLowerCase()}`}>
                        {pet.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => editPet(pet)}
                        >
                          <FaEdit /> Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deletePet(pet._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
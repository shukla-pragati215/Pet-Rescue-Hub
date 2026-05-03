import React, { useEffect, useState } from "react";
import "./AdminDoctors.css";
import {
  FaUserMd,
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaMapMarkerAlt,
  FaPaw,
    FaUserCircle,
} from "react-icons/fa";

function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
const [showProfile, setShowProfile] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    experience: "",
    location: "",
    petType: "Dog",
    rating: "",
    image: "",
    recommended: false,
  });
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/doctors");
      const data = await res.json();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

 const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  if (type === "file") {
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
};
  const resetForm = () => {
    setFormData({
      name: "",
      speciality: "",
      experience: "",
      location: "",
      petType: "Dog",
      rating: "",
      image: "",
      recommended: false,
    });
    setEditingId(null);
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("speciality", formData.speciality);
    data.append("experience", formData.experience);
    data.append("location", formData.location);
    data.append("petType", formData.petType);
    data.append("rating", formData.rating);
    data.append("recommended", formData.recommended);

    if (formData.image) {
      data.append("image", formData.image);
    }

    const url = editingId
      ? `http://localhost:5000/api/doctors/${editingId}`
      : "http://localhost:5000/api/doctors";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: data,
    });

    const result = await res.json();

    if (result.success) {
      alert(editingId ? "Doctor updated successfully!" : "Doctor added successfully!");
      fetchDoctors();
      resetForm();
    } else {
      alert(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name || "",
      speciality: doctor.speciality || "",
      experience: doctor.experience || "",
      location: doctor.location || "",
      petType: doctor.petType || "Dog",
      rating: doctor.rating || "",
      image: doctor.image || "",
      recommended: doctor.recommended || false,
    });
    setEditingId(doctor._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Doctor deleted successfully!");
        fetchDoctors();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="admin-doctors-page">
      <nav className="admin-doctors-header">
        <div>
          <h1><FaUserMd /> Pet Doctors Admin Panel</h1>
          <p>Manage veterinary doctors, clinics, ratings and recommendations.</p>
        </div>
         <div className="nav-right">
                  <div className="profile-wrapper">
                    <FaUserCircle
                      size={32}
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

      {/* Form Section */}
      <div className="doctor-form-card">
        <div className="card-title">
          <FaPlus />
          <h2>{editingId ? "Edit Doctor" : "Add New Doctor"}</h2>
        </div>

        <form className="doctor-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter doctor name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Speciality</label>
              <input
                type="text"
                name="speciality"
                placeholder="e.g. Veterinary Surgeon"
                value={formData.speciality}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="e.g. 8 Years Experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Mumbai"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Pet Type</label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="All">All</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                placeholder="e.g. 4.8"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Image URL</label>
              <input
  type="file"
  name="image"
  accept="image/*"
  onChange={handleChange}
/>
            </div>

            <div className="form-group checkbox-group full-width">
              <label>
                <input
                  type="checkbox"
                  name="recommended"
                  checked={formData.recommended}
                  onChange={handleChange}
                />
                Mark as Recommended
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editingId ? "Update Doctor" : "Add Doctor"}
            </button>

            {editingId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="doctor-list-card">
        <div className="card-title">
          <FaUserMd />
          <h2>All Doctors</h2>
        </div>

        {loading ? (
          <p className="loading-text">Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p className="empty-text">No doctors found.</p>
        ) : (
          <div className="doctor-table-wrapper">
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Speciality</th>
                  <th>Pet Type</th>
                  <th>Experience</th>
                  <th>Location</th>
                  <th>Rating</th>
                  <th>Recommended</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>
                      <div className="doctor-info">
<img
  src={`http://localhost:5000${doctor.image}`}
  alt={doctor.name}
/>                        <span>{doctor.name}</span>
                      </div>
                    </td>
                    <td>{doctor.speciality}</td>
                    <td>
                      <span className="pet-badge">
                        <FaPaw /> {doctor.petType}
                      </span>
                    </td>
                    <td>{doctor.experience}</td>
                    <td>
                      <span className="location-text">
                        <FaMapMarkerAlt /> {doctor.location}
                      </span>
                    </td>
                    <td>
                      <span className="rating-badge">
                        <FaStar /> {doctor.rating}
                      </span>
                    </td>
                    <td>
                      {doctor.recommended ? (
                        <span className="yes-badge">Yes</span>
                      ) : (
                        <span className="no-badge">No</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(doctor)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(doctor._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDoctors;
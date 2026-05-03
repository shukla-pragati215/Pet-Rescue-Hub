import React, { useState } from "react";
import "./SubmitInterestForm.css";

const SubmitInterestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const phoneRegex = /^[6-9]\d{9}$/;

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Phone validation
  if (!phoneRegex.test(formData.phone)) {
    setLoading(false);
    return alert("Please enter a valid 10 digit Indian phone number");
  }

  try {
    const res = await fetch("http://localhost:5000/api/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert(
        "Your interest form has been submitted successfully! A confirmation email has been sent."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        petType: "",
        reason: "",
      });

      onClose();
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="interest-form">
      <div className="form-header">
        <h2>Submit Interest Form</h2>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Interested Pet Type</label>
          <select
            name="petType"
            value={formData.petType}
            onChange={handleChange}
            required
          >
            <option value="">Select pet type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
            <option value="bird">Bird</option>
          </select>
        </div>

        <div className="form-group">
          <label>Why do you want to adopt?</label>
          <textarea
            name="reason"
            rows="4"
            placeholder="Write a few lines about why you want to adopt a pet"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Interest"}
        </button>
      </form>
    </div>
  );
};

export default SubmitInterestForm;
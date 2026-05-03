import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./BookAppointment.css";

function BookAppointment() {
  const { state: doctor } = useLocation();

  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    date: "",
    time: "",
    problem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Booked Successfully 🐾");
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>

      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p>{doctor.speciality}</p>
        <p>📍 {doctor.clinic}</p>
      </div>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="petName"
          placeholder="Pet Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="petType"
          placeholder="Pet Type (Dog / Cat)"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          onChange={handleChange}
          required
        />

        <textarea
          name="problem"
          placeholder="Describe the problem"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Confirm Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointment;

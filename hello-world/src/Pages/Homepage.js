import React from "react";
import "./HomePage.css";  // styling ke liye

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Pet Rescue Hub</h1>

      {/* Features */}
      <div className="features">
        <div className="feature-card">🐾 Adopt a Pet</div>
        <div className="feature-card">🔄 Rehome a Pet</div>
        <div className="feature-card">📌 Lost & Found</div>
        <div className="feature-card">ℹ️ About Us</div>
      </div>

      {/* Clinics + Volunteer */}
      <div className="clinics-section">
        <h2>Nearby Veterinary Clinics</h2>
        <p>Greenwood Animal Hospital</p>
        <p>Healthy Paws Vet Clinic</p>
        <p>City Veterinary Center</p>
        <button className="volunteer-btn">Become a Volunteer</button>
      </div>

      {/* Contact + Pet Shops */}
      <div className="bottom-section">
        <div className="contact-form">
          <h3>Contact Us</h3>
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit" className="send-btn">Send</button>
          </form>
        </div>

        <div className="right-side">
          <h3>Nearby Pet Shops</h3>
          <p>🐶 Bark & Bite — 0.4 mi away</p>
          <p>🐱 Happy Paws Store — 0.6 mi away</p>
          <p>🐾 Pets World — 1.2 mi away</p>

          <div className="contact-info">
            <p>📧 Email: fpricusehub.org</p>
            <p>📞 (123) 456-7890</p>
            <p>📍 123 Paw St, City, State 56739</p>
          </div>
        </div>
      </div>
    </div>
  );
}

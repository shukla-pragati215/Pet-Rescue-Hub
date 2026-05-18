import React, { useState } from "react";
import "./AdoptionFaqs.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdoptionFaqs() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // ✅ ADD THIS
    const [showProfile, setShowProfile] = useState(false);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      setShowProfile(false);
      navigate("/home");
    };
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the adoption process?",
      answer:
        "Our adoption process includes submitting an application, home visit (if required), and meeting the pet. Once approved, you can take your pet home."
    },
    {
      question: "Are there adoption fees?",
      answer:
        "Yes, adoption fees help cover veterinary care, vaccinations, and food. Fees vary depending on the type of pet."
    },
    {
      question: "Do I need to prepare my home for a new pet?",
      answer:
        "Yes, we recommend pet-proofing your home, ensuring safe spaces, and having necessary supplies like bedding, food, and toys."
    },
    {
      question: "Can I adopt if I live in an apartment?",
      answer:
        "Absolutely! We consider all living spaces but may recommend pets that suit your home size and lifestyle."
    },
    {
      question: "What support is available after adoption?",
      answer:
        "We provide guidance on pet care, training tips, and follow-up support to ensure a smooth transition."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-main">

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

      <div className="faqs-container">
        <h1>Adoption FAQs</h1>
        <p>Here are some common questions about adopting a pet through our platform.</p>

        <div className="faqs-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span>{openIndex === index ? "-" : "+"}</span>
              </div>

              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="lostfound-footer">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/policy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default AdoptionFaqs;

import React, { useRef, useState, useEffect } from "react";
import "./Volunteer.css";
import { useNavigate } from "react-router-dom";

function Volunteer() {
  const applyRef = useRef(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Login required to become a volunteer ❤️");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user?.name) setName(user.name);
    if (user?.email) setEmail(user.email);
  }, [navigate]);

  const scrollToForm = () => {
    applyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/volunteer/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(
          data.message ||
            "Thank you for volunteering! Your request has been submitted successfully. Our team will contact you soon."
        );

        setName("");
        setEmail("");
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="volunteer-container">
      {/* Header Section */}
      <div className="volunteer-header">
        <div className="header-left">
          <h1>BECOME A VOLUNTEER</h1>
          <p>
            Join our team of passionate animal lovers and help make a difference
            in the lives of homeless pets.
          </p>

          <div className="tags">
            <span>Trusted</span>
            <span>Professional</span>
            <span>Award-winning</span>
          </div>

          <button className="btn-black" onClick={scrollToForm}>
            GET INVOLVED
          </button>
        </div>

        <div className="header-right">
          <img src="vol.jpg" alt="Volunteer with pet" />
        </div>
      </div>

      {/* Impact Section */}
      <div className="impact-section">
        <div>
          <h2>1,500+</h2>
          <p>Sheltered pets</p>
        </div>
        <div>
          <h2>2,300+</h2>
          <p>Volunteer hours</p>
        </div>
        <div>
          <h2>1,000+</h2>
          <p>Pets adopted</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-section">
        <h2>HOW IT WORKS</h2>
        <div className="steps">
          <div>
            <h3>1 Apply</h3>
            <p>Fill out the volunteer application form.</p>
          </div>
          <div>
            <h3>2 Orientation</h3>
            <p>Attend a training session and learn more about our work.</p>
          </div>
        </div>
      </div>

      {/* Apply Section */}
      <div ref={applyRef} className="bottom-section">
        <div className="apply-now">
          <h2>APPLY NOW</h2>

          {successMessage && (
            <div className="form-message success-message">
              <strong>Application Submitted!</strong>
              <p>{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="form-message error-message">
              <strong>Submission Failed</strong>
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>

        <div className="faq">
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
          <p>➕ What qualifications do I need to become a volunteer?</p>
        </div>
      </div>
    </div>
  );
}

export default Volunteer;
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();

  const donorName = location.state?.donorName || "Donor";
  const amount = location.state?.amount || 0;
  const purpose = location.state?.purpose || "Animal Welfare";

  return (
    <div className="payment-success-page">
      <div className="success-card">
        <h1>✅ Payment Successful</h1>
        <p>
          Thank you, <strong>{donorName}</strong>, for your generous donation.
        </p>
        <p>
          <strong>Amount:</strong> ₹ {amount}
        </p>
        <p>
          <strong>Purpose:</strong> {purpose}
        </p>
        <p>Your support helps homeless animals get food, shelter, and care ❤️</p>

        <Link to="/">
          <button className="home-btn">Go Home</button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
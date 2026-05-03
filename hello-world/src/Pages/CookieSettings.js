import React, { useState } from "react";
import "./CookieSettings.css";

function CookieSettings({ onClose }) {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  if (!onClose) {
    console.error("❗ CookieSettings requires onClose prop.");
  }

  return (
    <div className="cookie-overlay">
      <div className="cookie-modal">
        <h2>Cookies Settings</h2>
        <p>Manage your cookie preferences:</p>

        <div className="cookie-option">
          <label>
            <input type="checkbox" checked disabled />
            Essential Cookies (Always Enabled)
          </label>
        </div>

        <div className="cookie-option">
          <label>
            <input
              type="checkbox"
              checked={analytics}
              onChange={() => setAnalytics(!analytics)}
            />
            Analytics Cookies
          </label>
        </div>

        <div className="cookie-option">
          <label>
            <input
              type="checkbox"
              checked={marketing}
              onChange={() => setMarketing(!marketing)}
            />
            Marketing Cookies
          </label>
        </div>

        <div className="cookie-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

         <button
  className="btn-save"
  onClick={async () => {
    await fetch("http://localhost:5000/api/cookies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem("user"))?.email,
        analytics,
        marketing,
      }),
    });

    alert("Cookie preferences saved ✅");
    onClose();
  }}
>
  Save Preferences
</button>
        </div>
      </div>
    </div>
  );
}

export default CookieSettings;

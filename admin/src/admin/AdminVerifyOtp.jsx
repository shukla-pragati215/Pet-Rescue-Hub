import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminVerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state.email;

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/admin/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/admin/reset-password", { state: { email } });
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
}
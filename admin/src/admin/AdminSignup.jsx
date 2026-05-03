import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSignup.css";

export default function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-={}[\]|;:'",.<>/?]).{8,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return alert("Please fill all fields");
    }

    if (!passwordRegex.test(trimmedPassword)) {
      return alert(
        "Password must contain:\n\n" +
          "• Minimum 8 characters\n" +
          "• One uppercase letter\n" +
          "• One lowercase letter\n" +
          "• One number\n" +
          "• One special character"
      );
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/admin/login");
      } else {
        if (data.message === "Admin already exists") {
          alert("This email is already registered. Please use another email or login.");
        } else {
          alert(data.message || "Signup failed");
        }
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Admin Signup</h2>

        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

     

          <button type="submit">Signup</button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/admin/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
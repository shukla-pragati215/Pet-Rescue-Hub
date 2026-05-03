import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // CSS file import

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin/dashboard");
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error");
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
</form>
<p className="forgot-password">
  <span onClick={() => navigate("/admin/forgot-password")}>
    <>
    Forgot Password?</>
  </span>
</p>

<p className="login-footer">
  No account? <span onClick={() => navigate("/admin/signup")}>Signup</span>
</p>
      </div>
    </div>
  );
}

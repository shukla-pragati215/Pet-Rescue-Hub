import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <Outlet />
      </div>
    </div>
  );
}

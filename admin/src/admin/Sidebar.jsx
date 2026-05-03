// src/admin/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaPaw,
  FaHeart,
  FaDonate,
  FaHandsHelping,
  FaClipboardList,
  FaUserMd   // ✅ add this
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <h2>🐾 Pet Rescue</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaUsers />
          Users
        </NavLink>

        <NavLink
          to="/admin/pets"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaPaw />
          Pets
        </NavLink>

        <NavLink
          to="/admin/adoptions"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaHeart />
          Adoptions
        </NavLink>

        <NavLink
          to="/admin/donations"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaDonate />
          Donations
        </NavLink>

        <NavLink
          to="/admin/volunteers"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          
          <FaHandsHelping />
          Volunteers
        </NavLink>
<NavLink
  to="/admin/adoption-forms"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
  <FaClipboardList />
  Adoption Forms
</NavLink>
<NavLink
  to="/admin/doctors"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
  <FaUserMd />
  Doctors
</NavLink>
      </nav>

    </div>
  );
}
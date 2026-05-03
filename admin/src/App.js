import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Pets from "./admin/Pets";
import Donations from "./admin/Donations";
import Volunteers from "./admin/Volunteers";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import ProtectedRoute from "./admin/ProtectedRoute";
import Adoptions from "./admin/Adoptions";
import AdminForgotPassword from "./admin/AdminForgotPassword";
import AdminVerifyOtp from "./admin/AdminVerifyOtp";
import AdminResetPassword from "./admin/AdminResetPassword";
import AdoptionForms from "./admin/AdoptionForms";
import AdminDoctors from "./admin/AdminDoctors";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
<Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
<Route path="/admin/verify-otp" element={<AdminVerifyOtp />} />
<Route path="/admin/reset-password" element={<AdminResetPassword />} />
        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="pets" element={<Pets />} />
          <Route path="donations" element={<Donations />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="adoptions" element={<Adoptions />} />
          <Route path="/admin/adoption-forms" element={<AdoptionForms />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
        </Route>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/*fallback route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

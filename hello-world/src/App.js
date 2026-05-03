import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Pages */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Volunteer from "./Pages/Volunteer";
import Adopt from "./Pages/Adopt";
import AdoptNowPage from "./Pages/AdoptNowPage";
import ViewPets from "./Pages/ViewPets";
import LostFound from "./Pages/LostFound";
import SubmitInterestForm from "./Pages/SubmitInterestForm";
import AdoptWithLove from "./Pages/AdoptWithLove";
import PetDoctors from "./Pages/PetDoctors";
import PetCare from "./Pages/PetCare";
import Nutrition from "./Pages/Nutrition";
import Hygiene from "./Pages/Hygiene";
import Exercise from "./Pages/Exercise";
import Health from "./Pages/Health";
import Donate from "./Pages/Donate";
import DonatePage from "./Pages/DonatePage";
import Pets from "./Pages/Pets";
import AdoptForm from "./Pages/AdoptForm";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Contact from "./Pages/Contact";
import CookieSettings from "./Pages/CookieSettings";
import AdoptionFaqs from "./Pages/AdoptionFaqs";
import Faqs from "./Pages/Faqs";
import Partners from "./Pages/Partners";
import VisitMars from "./Pages/VisitMars";
import Legal from "./Pages/Legal";
import CASupplyChainAct from "./Pages/CASupplyChainAct";
import ModernSlaveryAct from "./Pages/ModernSlaveryAct";
import Accessibility from "./Pages/Accessibility";
import CookiesNotice from "./Pages/CookiesNotice";
import AdChoices from "./Pages/AdChoices";
import AboutUs from "./Pages/AboutUs";
import PrivacyStatement from "./Pages/PrivacyStatement";
import NearbyPetShops from "./Pages/NearbyPetShops";
import Clinics from "./Pages/Clinics";
import PetDetails from "./Pages/PetDetails";
import LostFoundDetails from "./Pages/LostFoundDetails";
import BookAppointment from "./Pages/BookAppointment";
import NearbyVets from "./Pages/NearbyVets";
import PaymentSuccess from "./Pages/PaymentSuccess";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

/* 🔐 Auth Helpers */
const isLoggedIn = () => {
  return localStorage.getItem("user");
};

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    alert("Please login first 🔐");
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected */}
        

        {/* Adoption */}
        <Route
          path="/adopt"
          element={
            <ProtectedRoute>
              <Adopt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adopt/:id"
          element={
            <ProtectedRoute>
              <AdoptForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adoption"
          element={
            <ProtectedRoute>
              <AdoptNowPage />
            </ProtectedRoute>
          }
        />

        <Route path="/view-pets" element={<ViewPets />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adopt-with-love" element={<AdoptWithLove />} />
        <Route path="/submit-interest-form" element={<SubmitInterestForm />} />
        <Route path="/pet-details" element={<PetDetails />} />

        {/* Lost & Found */}
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/lostfound-details/:id" element={<LostFoundDetails />} />

        {/* Doctors & Care */}
        <Route path="/pet-doctors" element={<PetDoctors />} />
        <Route path="/pet-care" element={<PetCare />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/hygiene" element={<Hygiene />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/health" element={<Health />} />
        <Route path="/book-appointment" element={<BookAppointment />} />

        {/* Nearby */}
        <Route
          path="/nearby-shops"
          element={
            <ProtectedRoute>
              <NearbyPetShops />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nearby-vets"
          element={
            <ProtectedRoute>
              <NearbyVets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clinics"
          element={
            <ProtectedRoute>
              <Clinics />
            </ProtectedRoute>
          }
        />

        {/* Volunteer & Donate */}
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute>
              <Volunteer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate-page"
          element={
            <ProtectedRoute>
              <DonatePage />
            </ProtectedRoute>
          }
        />
<Route path="/payment-success" element={<PaymentSuccess />} />

        {/* Info Pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/privacy-statement" element={<PrivacyStatement />} />
        <Route path="/cookies-settings" element={<CookieSettings />} />
        <Route path="/adoption-faqs" element={<AdoptionFaqs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/mars" element={<VisitMars />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/ca-supply" element={<CASupplyChainAct />} />
        <Route path="/modern-slavery" element={<ModernSlaveryAct />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/cookies" element={<CookiesNotice />} />
        <Route path="/adchoices" element={<AdChoices />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

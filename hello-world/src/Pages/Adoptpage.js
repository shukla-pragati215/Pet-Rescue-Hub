import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../utils/auth";

function AdoptPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      alert("Please login to adopt a pet 🐶");
      navigate("/login");
    }
  }, []);

  return <h1>Adopt Your Favourite Pet 🐾</h1>;
}

export default AdoptPage;

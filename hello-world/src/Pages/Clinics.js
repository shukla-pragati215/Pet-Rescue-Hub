import React from "react";
import { useNavigate } from "react-router-dom";

const Clinics = () => {
  const navigate = useNavigate();

  const clinicItems = [
    { id: 1, name: "Pet Clinics" },
    { id: 2, name: "Pet Grooming" },
    { id: 3, name: "Pet Training" },
  ];

  return (
    <div className="clinic-container">
      <h2>Nearby Pet Services</h2>

      <div className="clinic-grid">
        {clinicItems.map((item) => (
          <div
            key={item.id}
            className="clinic-card"
            onClick={() => navigate("/nearby-shops")}
          >
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clinics;

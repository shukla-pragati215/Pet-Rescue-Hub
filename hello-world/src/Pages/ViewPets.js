import React from "react";
import "./ViewPets.css";

function ViewPets() {
  return (
    <section className="available-pets">
      <h2>View Pets</h2>
      <div className="pets-grid">
        <div className="pet-card">
          <img src="dog3.jpeg" alt="Luna" />
          <h3>Luna</h3>
          <p>Labrador Retriever Puppy<br />3 months old</p>
        </div>

        <div className="pet-card">
          <img src="rabbit.jpg" alt="Oliver" />
          <h3>Olive</h3>
          <p>Rabbit<br />6 months old</p>
        </div>

        <div className="pet-card">
          <img src="rabbit2.jpg" alt="Oliver" />
          <h3>Oliver</h3>
          <p>Rabbit<br />1 year old</p>
        </div>

        <div className="pet-card">
          <img src="dog4.jpeg" alt="Gizmo" />
          <h3>Gizmo</h3>
          <p>Beagle Puppy<br />5 months old</p>
        </div>

        <div className="pet-card">
          <img src="cat.webp" alt="Bella" />
          <h3>Bella</h3>
          <p>Domestic Shorthair<br />2 years old</p>
        </div>

        <div className="pet-card">
          <img src="dog2.jpg" alt="Max" />
          <h3>Max</h3>
          <p>Golden Retriever<br />3 years old</p>
        </div>

        <div className="pet-card">
          <img src="parrot.jpg" alt="Parrot" />
          <h3>Parrot</h3>
          <p> Macaw<br />2 years old</p>
        </div>

        <div className="pet-card">
          <img src="parrot.jpeg" alt="Cockatiel" />
          <h3>Cockatiel</h3>
          <p>Cockatiel (Nymphicus hollandicus)
<br />2 years old</p>
        </div>
      </div>
    </section>
  );
}

export default ViewPets;

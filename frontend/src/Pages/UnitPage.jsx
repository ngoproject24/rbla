import React from "react";
import { useParams } from "react-router-dom";

const UnitPage = ({ units }) => {
  const { unitSlug } = useParams(); // Get URL parameter
  const unit = units.find((u) => u.unitSlug === unitSlug);

  if (!unit) {
    return <h2>Unit not found</h2>;
  }

  return (
    <div className="unit-page">
      <header className="unit-header" style={{ backgroundImage: `url(${unit.image})` }}>
        <div className="header-overlay">
          <h1>{unit.unitName}</h1>
          <p>Empowering Survivors of Bonded Labour</p>
        </div>
      </header>

      <section className="unit-about">
        <h2>About {unit.unitName}</h2>
        <p>{unit.description}</p>
      </section>

      <footer className="unit-footer">
        <p>&copy; 2025 {unit.unitName}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UnitPage;

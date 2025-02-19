import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ addUnit }) => {
  const [unitName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!unitName || !description || !image) {
      alert("All fields are required!");
      return;
    }

    const unitSlug = unitName.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL-friendly format
    addUnit({ unitSlug, unitName, description, image });

    navigate(`/unit/${unitSlug}`); // Redirect to the new unit page
  };

  return (
    <div className="admin-panel">
      <h2>Add New Unit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Create Unit</button>
      </form>
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [marqueeMessage, setMarqueeMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch existing marquee message from the server
  useEffect(() => {
    fetch("http://localhost:4000/marquee")
      .then((res) => res.json())
      .then((data) => setMarqueeMessage(data.message || ""))
      .catch(() => setError("Failed to fetch the current marquee message"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (marqueeMessage.length > 100) {
      alert("Message should be under 100 characters!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:4000/marquee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: marqueeMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to update marquee message");
      }

      setSuccess("Marquee message updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Update Marquee Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={marqueeMessage}
          onChange={(e) => setMarqueeMessage(e.target.value)}
          placeholder="Enter new marquee message..."
          maxLength="100"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Live Preview of Marquee Message */}
      <div className="marquee-preview">
        <p>Preview:</p>
        <div className="preview-box">{marqueeMessage || "Enter a message..."}</div>
      </div>
    </div>
  );
};

export default AdminPanel;

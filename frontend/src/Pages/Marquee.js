import React, { useEffect, useState } from "react";
import "./Marquee.css";

const Marquee = () => {
  const [message, setMessage] = useState("Welcome to Survivor Products!");

  useEffect(() => {
    fetch("http://localhost:4000/marquee")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching marquee:", err));
  }, []);

  return (
    <div className="marquee-container">
      <marquee behavior="scroll" direction="left">🎉 {message} 🎉</marquee>
    </div>
  );
};

export default Marquee;

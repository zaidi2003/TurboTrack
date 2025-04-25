import React from "react";
import "./Statbox.css";

const Statbox = ({ label }) => {
  return (
    <div className="stat-box">
      <span className="stat-arrow">›</span>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default Statbox;


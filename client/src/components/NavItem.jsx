import React from "react";
import { Link } from "react-router-dom";
import "./NavItem.css"; 

const NavItem = ({ label, path, isActive }) => {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <div className={`nav-item ${isActive ? "active" : ""}`}>
        <div className="nav-item-text">{label}</div>
        <div className="nav-item-border"></div>
      </div>
    </Link>
  );
};

export default NavItem;
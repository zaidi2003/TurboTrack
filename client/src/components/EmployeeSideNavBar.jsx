// src/components/SideNavBar.jsx
import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import NavItem from "./NavItem";
import "./SideNavBar.css";

const SideNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { userData, logout } = useUser();

  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/logout"); // Navigate to logout page which can handle redirection
  };

  const navSections = [
    {
      title: "MAIN",
      items: [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Add Track", path: "/add-track" },
        { label: "Chats", path: "/chat" }
      ]
    },
    {
      title: "RACING",
      items: [
        { label: "Track View", path: "/current-session" },
        { label: "Just for Fun ;)", path: "/game" }
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { label: "Account", path: "/account" },
        { 
          label: "Log Out", 
          path: "/logout",
          onClick: handleLogout
        }
      ]
    }
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <Link to="/" className="logo-link">
        <div className="logo">turbotrack</div>
      </Link>

      {/* Divider */}
      <div className="divider"></div>

      {/* Navigation Sections */}
      {navSections.map((section, sectionIndex) => (
        <div key={section.title} className="nav-section">
          <div 
            className="section-title" 
            style={{ top: `${156 + (sectionIndex * 260)}px` }}
          >
            {section.title}
          </div>
          
          <div className="section-items">
            {section.items.map((item, itemIndex) => {
              const isActive = currentPath === item.path || 
                              (item.path !== '/' && currentPath.startsWith(item.path));
              const topPosition = 195 + (sectionIndex * 260) + (itemIndex * 56);
              
              return (
                <div 
                  key={item.label} 
                  style={{ 
                    position: "absolute", 
                    top: `${topPosition}px` 
                  }}
                >
                  <NavItem 
                    label={item.label}
                    path={item.path}
                    isActive={isActive}
                    onClick={item.onClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

    </div>
  );
};

export default SideNavBar;
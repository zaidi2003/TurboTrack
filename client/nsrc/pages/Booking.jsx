import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Booking.css";


const Booking = () => {
  // Local state for active tab
  const [activeTab, setActiveTab] = useState("discover")

  // Dummy user data
  const userData = {
    username: "username",
  }

  // Dummy tracks data
  const tracks = [
    { id: 1, name: "Kool Karterz" },
    { id: 2, name: "Kartz 4 Karterz" },
    { id: 3, name: "Karting Karterz" },
  ]

  return (
    <div className="container">
      {/* Left Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo">turbotrack</div> 
        </Link>

        {/* Divider */}
        <div className="divider" />

        {/* MAIN Section */}
        <div className="section-title main-section">MAIN</div>

        {/* Dashboard */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-dashboard">Dashboard</div>
        </Link>

        {/* Bookings (Active) */}
        <div className="active-nav-container">
          <div className="active-nav-item">Bookings</div>
          <div className="active-nav-border" />
        </div>

        <Link to="/payments" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-payments">Payments</div>
        </Link>

        {/* RACING Section */}
        <div className="section-title racing-section">RACING</div>

        <Link to="/analytics" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-analytics">Analytics</div>
        </Link>

        <Link to="/current-session" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-current-session">Current Session</div>
        </Link>

        <Link to="/achievements" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-achievements">Achievements</div>
        </Link>

        <div className="section-title settings-section">SETTINGS</div>

        <Link to="/account" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-account">Account</div>
        </Link>

        <Link to="/help" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-help">Help Center</div>
        </Link>

        <div className="nav-item nav-item-logout">Log Out</div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for tracks" className="search-input" />
        <div className="search-icon">
          <span style={{ fontSize: 18, color: "#F7F4F1" }}>🔍</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="user-avatar">
          <span style={{ color: "#333", fontSize: 18 }}>👤</span>
        </div>
        <div className="username">{userData.username}</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Tabs */}
        <div className="tabs">
          <div
            onClick={() => setActiveTab("discover")}
            className={`tab ${activeTab === "discover" ? "tab-active" : "tab-inactive"}`}
          >
            Discover
            {activeTab === "discover" && <div className="tab-indicator" />}
          </div>
          <div
            onClick={() => setActiveTab("current")}
            className={`tab ${activeTab === "current" ? "tab-active" : "tab-inactive"}`}
          >
            Current Bookings
            {activeTab === "current" && <div className="tab-indicator" />}
          </div>
          <div
            onClick={() => setActiveTab("history")}
            className={`tab ${activeTab === "history" ? "tab-active" : "tab-inactive"}`}
          >
            History
            {activeTab === "history" && <div className="tab-indicator" />}
          </div>
        </div>

        {/* Filter */}
        <div className="filter-container">
          <div className="filter">ALL TRACKS</div>
        </div>

        {/* Track Listings */}
        <div className="track-list">
          {tracks.map((track) => (
            <div key={track.id} className="track-item">
              <div className="track-name">{track.name}</div>
              <button className="book-button">Book</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Booking

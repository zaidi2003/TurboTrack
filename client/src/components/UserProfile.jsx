
import React from "react";
import { useUser } from "../context/UserContext";
import "./UserProfile.css";

const UserProfile = ({ style, className }) => {
  const { userData, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className={`user-profile ${className || ''}`} style={style}>
        <div className="user-avatar">
          <span style={{ color: "#333", fontSize: 18 }}>👤</span>
        </div>
        <div className="username">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`user-profile ${className || ''}`} style={style}>
      <div className="user-avatar">
        <span style={{ color: "#333", fontSize: 18 }}>👤</span>
      </div>
      <div className="username">{userData.username || "Guest"}</div>
    </div>
  );
};

export default UserProfile;
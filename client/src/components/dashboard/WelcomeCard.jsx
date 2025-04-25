import React from "react";
import { useUser } from "../../context/UserContext"; // Adjust path as needed

const WelcomeCard = ({ username = null, style }) => {
  // Use username from props if provided, otherwise get from context
  const { userData } = useUser();
  const displayName = username || userData.username || "Guest";

  return (
    <div
      style={{
        ...style,
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1B1F 74%, #242424 83%, #272727 93%)",
        borderRadius: "14.57px",
        border: "0.73px rgba(115,115,115,0.50) solid",
        padding: "30px",
      }}
    >
      <div
        style={{
          position: "relative",
          color: "#C2A1A1",
          fontSize: "28px",
          fontFamily: "Readex Pro",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Welcome back, {displayName}!
      </div>
      <div
        style={{
          position: "relative",
          opacity: 0.6,
          color: "#F7F4F1",
          fontSize: "14px",
          fontFamily: "Readex Pro",
          fontWeight: "700",
        }}
      >
        Your racing stats, wins, and rankings — all in one place. Track your progress, chase the podium, and stay ahead of the pack.
      </div>
    </div>
  );
};

export default WelcomeCard;
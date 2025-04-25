import React, { useState } from "react";
import { LeaderboardRow } from ".";
import { useUser } from "../../context/UserContext"; // Adjust path as needed
import "./LeaderboardSection.css";

const LeaderboardSection = ({ leaderboardData = [], currentUserEmail = null, style }) => {
  const [timeFilter, setTimeFilter] = useState("month");
  const { userData } = useUser();
  
  // Use email from props if provided, otherwise get from context
  const userEmail = currentUserEmail || userData.email;
  
  const filters = [
    { id: "today", label: "TODAY" },
    { id: "week", label: "WEEK" },
    { id: "month", label: "MONTH" },
    { id: "year", label: "YEAR" }
  ];
  
  return (
    <div style={style}>
      {/* Time filter tabs */}
      <div style={{ display: "flex", gap: "80px", marginBottom: "20px" }}>
        {filters.map(filter => (
          <button
            key={filter.id}
            style={{
              background: "none",
              border: "none",
              color: timeFilter === filter.id ? "white" : "#808080",
              fontFamily: "Readex Pro, sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              padding: "5px 0",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setTimeFilter(filter.id)}
          >
            {filter.label}
            {timeFilter === filter.id && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#7B0303",
                  borderRadius: "1px",
                }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Leaderboard entries */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative", 
          minHeight: "100px",   
        }}
      >
        {leaderboardData && leaderboardData.length > 0 ? (
          leaderboardData.map((user) => (
            <LeaderboardRow
              key={user.id}
              id={user.id}
              name={user.name}
              wins={user.wins}
              isCurrentUser={user.email === userEmail}
            />
          ))
        ) : (
          <div
            style={{
              position: "absolute",
              left: "60%",
              transform: "translateX(-50%)",
              color: "#C9C0C0",
              opacity: 0.7,
              paddingTop: "50px",
              whiteSpace: "nowrap" 
            }}
          >
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardSection;
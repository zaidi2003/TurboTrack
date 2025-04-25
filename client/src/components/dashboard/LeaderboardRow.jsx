import React from "react";
import "./LeaderboardRow.css";

const LeaderboardRow = ({ id, name, wins, isCurrentUser }) => {
  return (
    <div className="leaderboard-row-container">
      <div className="leaderboard-rank">{id}</div>
      <div
        className="leaderboard-entry"
        style={{
          background: isCurrentUser
            ? "linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)"
            : "#252728",
        }}
      >
        <div className="leaderboard-avatar">
          <span style={{ color: "#333", fontSize: 14 }}>👤</span>
        </div>
        <div className="leaderboard-name">{name}</div>
        <div
          className="leaderboard-points"
          style={{ fontWeight: isCurrentUser ? "700" : "400" }}
        >
          {wins} pts
        </div>
      </div>
    </div>
  );
};

export default LeaderboardRow;

import React, { useEffect, useRef } from "react";
import { PieChart, Statbox } from ".";
import { useUser } from "../../context/UserContext"; // Adjust path as needed
import "./JourneyCard.css";

const JourneyCard = ({ stats = null, style }) => {
  // Use stats from props if provided, otherwise get from context
  const { userStats: contextStats } = useUser();
  const userStats = stats || contextStats;
  
  // Ref for the pie chart canvas
  const canvasRef = useRef(null);

  // Draw the pie chart
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      const innerRadius = radius * 0.5; // For the donut hole

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Data for the pie chart
      const data = [
        { value: userStats.wins, color: "#7B0303" }, 
        { value: userStats.podiums, color: "#ADADAD" },
        { value: userStats.other, color: "#787878" }, 
      ];

      // Calculate total
      const total = data.reduce((sum, item) => sum + item.value, 0);

      // Draw the pie chart
      if (total > 0) {
        let startAngle = 0;

        data.forEach((item) => {
          // Calculate the angle for this segment
          const segmentAngle = (item.value / total) * 2 * Math.PI;

          // Draw the segment
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle);
          ctx.closePath();

          // Fill with the segment color
          ctx.fillStyle = item.color;
          ctx.fill();

          // Update the starting angle for the next segment
          startAngle += segmentAngle;
        });

        // Draw the inner circle (donut hole)
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#1B1B1B";
        ctx.fill();

        // Add text in the center
        ctx.fillStyle = "white";
        ctx.font = "bold 24px Montserrat";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(userStats.sessions.toString(), centerX, centerY - 10);
        ctx.font = "bold 18px Montserrat";
        ctx.fillText("Sessions", centerX, centerY + 15);
      } else {
        // If no data, show a message
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Montserrat";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("No sessions yet", centerX, centerY);
      }
    }
  }, [userStats]);

  return (
    <div
      style={{
        ...style,
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1B1F 74%, #242424 83%, #272727 93%)",
        borderRadius: 20.1,
        border: "0.5px rgba(115,115,115,0.50) solid",
        padding: "30px",
      }}
    >
      <div
        style={{
          color: "#C9C0C0",
          fontSize: 26.13,
          fontFamily: "Readex Pro",
          fontWeight: "600",
          marginBottom: "40px",
        }}
      >
        Your Journey So Far
      </div>

      {/* Chart Container */}
      <div
        style={{ position: "relative", width: "100%", height: "350px", display: "flex", justifyContent: "center" }}
      >
        {/* Canvas for the pie chart */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Legend */}
      <div style={{ display: "flex", marginTop: "20px", marginLeft: "50px" }}>
        {/* Wins Legend */}
        <div style={{ display: "flex", alignItems: "center", marginRight: "30px" }}>
          <div
            style={{
              width: 13,
              height: 13,
              background: "#7B0303",
              marginRight: 10,
            }}
          />
          <div
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "700",
            }}
          >
            Wins
          </div>
        </div>

        {/* Podiums Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "30px",
          }}
        >
          <div
            style={{
              width: 13,
              height: 13,
              background: "#ADADAD",
              marginRight: 10,
            }}
          />
          <div
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "700",
            }}
          >
            Podiums
          </div>
        </div>
        
        {/* Non-Podiums Legend */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 13,
              height: 13,
              background: "#787878",
              marginRight: 11,
            }}
          />
          <div
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "700",
            }}
          >
            Non-Podiums
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <Statbox label="Total Hours" />
        <Statbox label="Tracks Raced" />
        <Statbox label="Fastest Laps" />
        <Statbox label="Previous Session" />
      </div>
    </div>
  );
};

export default JourneyCard;
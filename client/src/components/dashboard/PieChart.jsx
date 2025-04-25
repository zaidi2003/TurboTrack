import React, { useEffect, useRef } from "react";
import "./PieChart.css";

const PieChart = ({ stats }) => {
  const canvasRef = useRef(null);
  
  // Draw the pie chart
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Make sure the canvas is responsive
    function resizeCanvas() {
      const containerWidth = canvas.parentElement.clientWidth;
      const containerHeight = canvas.parentElement.clientHeight;
      const size = Math.min(containerWidth, containerHeight, 300); // Maximum size of 300px
      
      canvas.width = size;
      canvas.height = size;
      
      drawChart();
    }
    
    function drawChart() {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      const innerRadius = radius * 0.5; // For the donut hole
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Data for the pie chart
      const data = [
        { value: stats.wins, color: "#7B0303" }, // Wins - dark red
        { value: stats.podiums, color: "#ADADAD" }, // Podiums - light gray
        { value: stats.other, color: "#787878" }, // Other sessions - dark gray
      ];
      
      // Calculate total
      const total = data.reduce((sum, item) => sum + item.value, 0);
      
      // Only draw if we have data
      if (total > 0) {
        // Draw the pie chart
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
        ctx.fillText(stats.sessions.toString(), centerX, centerY - 10);
        ctx.font = "bold 18px Montserrat";
        ctx.fillText("Sessions", centerX, centerY + 15);
      } else {
        // Draw a message if there's no data
        ctx.fillStyle = "white";
        ctx.font = "bold 18px Montserrat";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("No sessions yet", centerX, centerY);
      }
    }
    
    // Initial draw
    resizeCanvas();
    
    // Set up resize listener
    window.addEventListener('resize', resizeCanvas);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [stats]);
  
  // Calculate percentages for displaying beside chart
  const total = stats.sessions || 0;
  const winsPercent = total > 0 ? Math.round((stats.wins / total) * 100) : 0;
  const podiumsPercent = total > 0 ? Math.round((stats.podiums / total) * 100) : 0;
  const otherPercent = total > 0 ? Math.round((stats.other / total) * 100) : 0;
  
  return (
    <div className="pie-chart-container">
      <div className="chart-container">
        <canvas ref={canvasRef} className="pie-chart-canvas" />
        
        {/* Percentage labels */}
        <div className="percentage-label wins-percentage">{winsPercent}%</div>
        <div className="percentage-label podiums-percentage">{podiumsPercent}%</div>
        <div className="percentage-label others-percentage">{otherPercent}%</div>
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color legend-color-wins"></div>
          <div className="legend-label">Wins</div>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-podiums"></div>
          <div className="legend-label">Podiums</div>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-others"></div>
          <div className="legend-label">Non-Podiums</div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
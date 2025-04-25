"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
// import "../styles/Employee.css";

const Employee = () => {
  // Local state for time filter
  const navigate = useNavigate()
  const [timeFilter, setTimeFilter] = useState("month")

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "")
 
  const [data, setData] = useState({
    msg: "",
    secret: "",
    trackSummary: {},
  });
  
  const fetchUserInfo = async () => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee-dashboard`, axiosConfig);
      
      const { msg, secret, trackSummary,user } = response.data;
      if(user.role !== "Employee") {
        toast.error("You are not authorized to view this page");
        navigate("/");
        return;
      }
      // Set the updated state
      setData({ msg, secret, trackSummary, user });
  
      console.log("Employee dashboard data:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };
  
  const userData = {
    username: data.user?.name || "Guest",
    stats: {
      sessions: data.trackSummary['2f2f'] + data.trackSummary['SportsZilla'] + data.trackSummary['track 3'],
      track1: data.trackSummary['SportsZilla'],
      track2: data.trackSummary['2f2f'],
      track3: data.trackSummary['track 3'],
    },
  }

  // Ref for the pie chart canvas
  const canvasRef = useRef(null)

  useEffect(() => {
      fetchUserInfo();
    }, []); 


    useEffect(() => {
      if (canvasRef.current && userData.stats.sessions !== undefined) {
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
          { value: userData.stats.track1, color: "#787878" }, // Dark gray (41%)
          { value: userData.stats.track2, color: "#ADADAD" }, // Light gray (31%)
          { value: userData.stats.track3, color: "#7B0303" }, // Red (28%)
        ];
    
        // Calculate total
        const total = data.reduce((sum, item) => sum + item.value, 0);
    
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
        ctx.fillText(userData.stats.sessions?.toString() || "0", centerX, centerY - 10);
        ctx.font = "bold 18px Montserrat";
        ctx.fillText("Sessions", centerX, centerY + 15);
      }
    }, [userData.stats]);

  return (
    <div
      style={{
        width: "100%",
        height: 982,
        position: "relative",
        opacity: 0.9,
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        overflow: "hidden",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: 285,
          height: 982,
          position: "absolute",
          left: 0,
          top: 0,
          opacity: 0.6,
          background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
          border: "2px rgba(242,242,242,0.20) solid",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 45,
              top: 43,
              opacity: 0.8,
              color: "#D5D4D4",
              fontSize: 25,
              fontFamily: "Zen Dots",
              fontWeight: "400",
              letterSpacing: 2.5,
              cursor: "pointer",
            }}
          >
            turbotrack
          </div>
        </Link>

        {/* MAIN Section */}
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 156,
            opacity: 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: "700",
          }}
        >
          MAIN
        </div>

        {/* Dashboard (Active) */}
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 195,
            width: 241,
            height: 44,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 41,
              top: 12,
              opacity: 0.8,
              color: "#A81129",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
            }}
          >
            Dashboard
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 241,
              height: 44,
              borderRadius: 10,
              border: "2px #300101 solid",
            }}
          />
        </div>

        {/* Additional Sidebar Links */}
        <Link to="/booking" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 263,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Bookings
          </div>
        </Link>

        <Link to="/change-password" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 319,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Change Password
          </div>
        </Link>

        {/* RACING Section */}
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 416,
            opacity: 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: "700",
          }}
        >
          RACING
        </div>

        <Link to="/analytics" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 467,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Analytics
          </div>
        </Link>

        <Link to="/current-session" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 523,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Current Session
          </div>
        </Link>

        <Link to="/achievements" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 579,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Achievements
          </div>
        </Link>

        <div
          style={{
            position: "absolute",
            left: 45,
            top: 676,
            opacity: 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: "700",
          }}
        >
          SETTINGS
        </div>

        <Link to="/account" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 727,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Account
          </div>
        </Link>

        <Link to="/help" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 783,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Help Center
          </div>
        </Link>

        {/* Log Out Link */}
        <Link to="/logout" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 839,
              opacity: 0.8,
              color: "var(--cream, #F7F4F1)",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            Log Out
          </div>
        </Link>
      </div>

      {/* Kool Karterz Dashboard Header */}
      <div
        style={{
          position: "absolute",
          left: 363,
          top: 30,
          width: 581,
          height: 100,
          background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1B1F 74%, #242424 83%, #272727 93%)",
          borderRadius: 14.57,
          border: "0.73px rgba(115,115,115,0.50) solid",
          padding: "30px",
        }}
      >
        <div
          style={{
            position: "relative",
            color: "#C2A1A1",
            fontSize: 28,
            fontFamily: "Readex Pro",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Employee Dashboard
        </div>
      </div>

      {/* User Profile */}
      <div style={{ position: "absolute", right: 60, top: 40, display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 45.62,
            height: 42,
            borderRadius: "50%",
            background: "#C9C0C0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <span style={{ color: "#333", fontSize: 18 }}>👤</span>
        </div>
        <div
          style={{
            color: "#F7F4F1",
            fontSize: 14.4,
            fontFamily: "Readex Pro",
            fontWeight: "600",
          }}
        >
          {userData.username}
        </div>
      </div>

      {/* Quick Insights Card */}
      <div
        style={{
          position: "absolute",
          left: 363,
          top: 180,
          width: 581,
          height: 700,
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
          Quick Insights
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

          {/* Stats Boxes */}
          
        </div>

        {/* Legend */}
        <div style={{ display: "flex", marginTop: "20px", marginLeft: "50px" }}>
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
              2f2f
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginRight: "30px" }}>
            <div
              style={{
                width: 13,
                height: 13,
                background: "#787878",
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
              SportsZilla
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
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
              Track 3
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 24,
                marginRight: "15px",
                color: "white",
              }}
            >
              ›
            </span>
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
            >
              Total Hours
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 24,
                marginRight: "15px",
                color: "white",
              }}
            >
              ›
            </span>
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
            >
              Tracks Raced
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 24,
                marginRight: "15px",
                color: "white",
              }}
            >
              ›
            </span>
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
            >
              Fastest Laps
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 24,
                marginRight: "15px",
                color: "white",
              }}
            >
              ›
            </span>
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
            >
              Previous Session
            </div>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div
        style={{
          position: "absolute",
          left: 1057,
          top: 100,
          color: "#C9C0C0",
          fontSize: 30,
          fontFamily: "Readex Pro",
          fontWeight: "600",
        }}
      >
        User Statistics
      </div>

      {/* Time Filters */}
      <div style={{ position: "absolute", left: 1057, top: 150, display: "flex", gap: 40 }}>
        <div
          onClick={() => setTimeFilter("today")}
          style={{
            opacity: timeFilter === "today" ? 1 : 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          TODAY
        </div>
        <div
          onClick={() => setTimeFilter("week")}
          style={{
            opacity: timeFilter === "week" ? 1 : 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          WEEK
        </div>
        <div
          onClick={() => setTimeFilter("month")}
          style={{
            padding: "4px 12px",
            background: timeFilter === "month" ? "#414141" : "transparent",
            borderRadius: "4px",
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          MONTH
        </div>
        <div
          onClick={() => setTimeFilter("year")}
          style={{
            opacity: timeFilter === "year" ? 1 : 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          YEAR
        </div>
      </div>

      {/* Statistics Graph */}
      <div
        style={{
          position: "absolute",
          left: 1057,
          top: 200,
          width: 343,
          height: 400,
          background: "#1B1B1B",
          borderRadius: 12,
          padding: 20,
        }}
      >
        {/* Graph Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
          <div style={{ color: "#F3F4F6", fontSize: 14, fontFamily: "Readex Pro", fontWeight: "600" }}>
            Average User Statistics
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button
              style={{
                background: "#414141",
                border: "none",
                borderRadius: 4,
                color: "#F3F4F6",
                fontSize: 12,
                padding: "2px 8px",
                cursor: "pointer",
              }}
            >
              1D
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#6D7280",
                fontSize: 12,
                padding: "2px 8px",
                cursor: "pointer",
              }}
            >
              1M
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#6D7280",
                fontSize: 12,
                padding: "2px 8px",
                cursor: "pointer",
              }}
            >
              1Y
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#6D7280",
                fontSize: 12,
                padding: "2px 8px",
                cursor: "pointer",
              }}
            >
              Max
            </button>
          </div>
        </div>

        {/* Graph Visualization */}
        <div style={{ height: 250, marginBottom: 20 }}>
          <svg width="100%" height="100%" viewBox="0 0 300 250" style={{ overflow: "visible" }}>
            {/* Horizontal grid lines */}
            <line x1="0" y1="50" x2="300" y2="50" stroke="#3F3F3F" strokeDasharray="2,2" />
            <line x1="0" y1="100" x2="300" y2="100" stroke="#3F3F3F" strokeDasharray="2,2" />
            <line x1="0" y1="150" x2="300" y2="150" stroke="#3F3F3F" strokeDasharray="2,2" />
            <line x1="0" y1="200" x2="300" y2="200" stroke="#3F3F3F" strokeDasharray="2,2" />

            {/* Line for Registered Users */}
            <path
              d="M0,150 C30,140 60,130 90,120 S150,100 180,110 S240,130 300,90"
              fill="none"
              stroke="#6D7280"
              strokeWidth="2"
            />

            {/* Line for Track 1 Bookings */}
            <path
              d="M0,180 C30,170 60,150 90,130 S150,90 180,120 S240,150 300,130"
              fill="none"
              stroke="#FB923C"
              strokeWidth="2"
            />

            {/* Line for Track 2 Bookings */}
            <path
              d="M0,120 C30,100 60,80 90,70 S150,50 180,30 S240,60 300,40"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
            />

            {/* Line for Track 3 Bookings */}
            <path
              d="M0,100 C30,80 60,60 90,80 S150,120 180,100 S240,80 300,60"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Graph Legend */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6D7280" }}></div>
            <div style={{ color: "#F3F4F6", fontSize: 12, fontFamily: "Readex Pro" }}>Registered Users</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FB923C" }}></div>
            <div style={{ color: "#F3F4F6", fontSize: 12, fontFamily: "Readex Pro" }}>Track 1 Bookings</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB" }}></div>
            <div style={{ color: "#F3F4F6", fontSize: 12, fontFamily: "Readex Pro" }}>Track 2 Bookings</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }}></div>
            <div style={{ color: "#F3F4F6", fontSize: 12, fontFamily: "Readex Pro" }}>Track 3 Bookings</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employee
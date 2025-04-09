import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const CustDash = () => {
  // Local state for time filter
  const [timeFilter, setTimeFilter] = useState("month")

  // Dummy user data
  const userData = {
    username: "username",
    stats: {
      sessions: 34,
      wins: 41,
      podiums: 31,
      other: 28,
    },
  }

  // Ref for the pie chart canvas
  const canvasRef = useRef(null)

  // Draw the pie chart
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 10
      const innerRadius = radius * 0.5 // For the donut hole

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Data for the pie chart
      const data = [
        { value: userData.stats.wins, color: "#787878" }, // Dark gray (41%)
        { value: userData.stats.podiums, color: "#ADADAD" }, // Light gray (31%)
        { value: userData.stats.other, color: "#7B0303" }, // Red (28%)
      ]

      // Calculate total
      const total = data.reduce((sum, item) => sum + item.value, 0)

      // Draw the pie chart
      let startAngle = 0

      data.forEach((item) => {
        // Calculate the angle for this segment
        const segmentAngle = (item.value / total) * 2 * Math.PI

        // Draw the segment
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle)
        ctx.closePath()

        // Fill with the segment color
        ctx.fillStyle = item.color
        ctx.fill()

        // Update the starting angle for the next segment
        startAngle += segmentAngle
      })

      // Draw the inner circle (donut hole)
      ctx.beginPath()
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
      ctx.fillStyle = "#1B1B1B"
      ctx.fill()

      // Add text in the center
      ctx.fillStyle = "white"
      ctx.font = "bold 24px Montserrat"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(userData.stats.sessions.toString(), centerX, centerY - 10)
      ctx.font = "bold 18px Montserrat"
      ctx.fillText("Sessions", centerX, centerY + 15)
    }
  }, [userData.stats])

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
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 43,
            opacity: 0.80,
            color: '#D5D4D4',
            fontSize: 25,
            fontFamily: "Zen Dots",
            fontWeight: "400",
            letterSpacing: 2.5,
            cursor: "pointer",
          }}
        >
          turbotrack
        </div>

        {/* Divider */}
        <div
          style={{
            position: "absolute",
            left: 1020,
            top: 0,
            width: 0,
            height: 1000,
            opacity: 0.3,
            outline: "0.81px #F7F4F1 solid",
            outlineOffset: "-0.41px",
          }}
        />

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
        <Link to="/bookings" style={{ textDecoration: "none" }}>
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

        <Link to="/payments" style={{ textDecoration: "none" }}>
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
            Payments
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
      <Link to="/logout" style={{ textDecoration: 'none' }}>
        <div
          style={{
            position: 'absolute',
            left: 63,
            top: 839,
            opacity: 0.8,
            color: 'var(--cream, #F7F4F1)',
            fontSize: 16,
            fontFamily: 'Readex Pro',
            fontWeight: '600',
            wordWrap: 'break-word',
          }}
        >
          Log Out
        </div>
      </Link>
      </div>

      {/* Welcome Card */}
      <div
        style={{
          position: "absolute",
          left: 363,
          top: 30,
          width: 581,
          height: 179.94,
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
            marginBottom: "20px",
          }}
        >
          Welcome back, {userData.username}!
        </div>
        <div
          style={{
            position: "relative",
            opacity: 0.8,
            color: "#F7F4F1",
            fontSize: 16,
            fontFamily: "Readex Pro",
            fontWeight: "600",
          }}
        >
          some yapping etcetcetc
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

      {/* Journey Card */}
      <div
        style={{
          position: "absolute",
          left: 363,
          top: 268,
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

          {/* Stats Boxes */}
          <div
            style={{
              position: "absolute",
              left: "15%",
              top: "50%",
              transform: "translateY(-50%)",
              width: 80,
              height: 50,
              background: "#D9D9D9",
              opacity: 0.4,
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <div style={{ color: "white", fontSize: 24, fontFamily: "Montserrat", fontWeight: "700" }}>
              {userData.stats.wins}%
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: "15%",
              top: "30%",
              width: 80,
              height: 50,
              background: "#D9D9D9",
              opacity: 0.4,
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <div style={{ color: "white", fontSize: 24, fontFamily: "Montserrat", fontWeight: "700" }}>
              {userData.stats.podiums}%
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: "30%",
              bottom: "10%",
              width: 80,
              height: 50,
              background: "#D9D9D9",
              opacity: 0.4,
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <div style={{ color: "white", fontSize: 24, fontFamily: "Montserrat", fontWeight: "700" }}>
              {userData.stats.other}%
            </div>
          </div>
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
              Wins
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
              Podiums
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
            {/* <span
              style={{
                fontSize: 24,
                marginLeft: "auto",
                color: "white",
              }}
            >
              ›
            </span> */}
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
            {/* <span
              style={{
                fontSize: 24,
                marginLeft: "auto",
                color: "white",
              }}
            >
              ›
            </span> */}
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
            {/* <span
              style={{
                fontSize: 24,
                marginLeft: "auto",
                color: "white",
              }}
            >
              ›
            </span> */}
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
            {/* <span
              style={{
                fontSize: 24,
                marginLeft: "auto",
                color: "white",
              }}
            >
              ›
            </span> */}
          </div>
        </div>
      </div>

      {/* Community Statistics */}
      <div
        style={{
          position: "absolute",
          left: 1057,
          top: 133,
          color: "#C9C0C0",
          fontSize: 30,
          fontFamily: "Readex Pro",
          fontWeight: "600",
        }}
      >
        Community Statistics
      </div>

      {/* Time Filters */}
      <div style={{ position: "absolute", left: 1100, top: 198, display: "flex", gap: 20 }}>
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
            // width: 75,
            // height: 25,
            background: timeFilter === "month" ? "#414141" : "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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

      {/* Graph Placeholder */}
      <div
        style={{
          position: "absolute",
          left: 1106,
          top: 486,
          textAlign: "center",
          color: "white",
          fontSize: 50,
          fontFamily: "Lexend",
          fontWeight: "700",
          lineHeight: 50,
        }}
      >
        ADD GRAPH
      </div>
    </div>
  )
}

export default CustDash

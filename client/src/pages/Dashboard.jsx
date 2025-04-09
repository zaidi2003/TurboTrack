import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import "../styles/Dashboard.css";

const Dashboard = () => {
  // Local state for time filter
  const [timeFilter, setTimeFilter] = useState("month")

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "")
  const [data, setData] = useState({})

  const fetchUserInfo = async () => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig)
      const { msg, secret, email } = response.data
      setData({ msg, secret, email })
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message)
    }
  }

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

  // Leaderboard data
  const leaderboardData = [
    { id: 4, name: "Yusuf Khan", points: 36, isYou: false },
    { id: 5, name: "Mushtaq Ahmed", points: 35, isYou: false },
    { id: 6, name: "You", points: 34, isYou: true },
  ]

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

    fetchUserInfo()
  }, [userData.stats])

  return (
    <div className="container">
      {/* Left Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">turbotrack</div>
        </Link>

        {/* Divider */}
        <div className="divider" />

        {/* MAIN Section */}
        <div className="section-title main-section">MAIN</div>

        {/* Dashboard (Active) */}
        <div className="active-nav-container">
          <div className="active-nav-item">Dashboard</div>
          <div className="active-nav-border" />
        </div>

        {/* Additional Sidebar Links */}
        <Link to="/booking" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-bookings">Bookings</div>
        </Link>

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

        {/* Log Out Link */}
        <Link to="/logout" style={{ textDecoration: "none" }}>
          <div className="nav-item nav-item-logout">Log Out</div>
        </Link>
      </div>

      {/* Welcome Card */}
      <div className="card welcome-card">
        <div className="welcome-title">Welcome back, {userData.username}!</div>
        <div className="welcome-text">some yapping etcetcetc</div>
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="user-avatar">
          <span style={{ color: "#333", fontSize: 18 }}>👤</span>
        </div>
        <div className="username">{userData.username}</div>
      </div>

      {/* Journey Card */}
      <div className="card journey-card">
        <div className="journey-title">Your Journey So Far</div>

        {/* Chart Container */}
        <div className="chart-container">
          {/* Canvas for the pie chart */}
          <canvas ref={canvasRef} width={300} height={300} className="chart-canvas" />

          {/* Stats Boxes */}
          <div className="stat-box stat-box-left">
            <div className="stat-value">{userData.stats.wins}%</div>
          </div>

          <div className="stat-box stat-box-right">
            <div className="stat-value">{userData.stats.podiums}%</div>
          </div>

          <div className="stat-box stat-box-bottom">
            <div className="stat-value">{userData.stats.other}%</div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color legend-color-red" />
            <div className="legend-label">Wins</div>
          </div>

          <div className="legend-item">
            <div className="legend-color legend-color-gray" />
            <div className="legend-label">Podiums</div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="stats-grid">
          <div className="stat-item">
            <span className="chevron">›</span>
            <div className="stat-text">Total Hours</div>
          </div>

          <div className="stat-item">
            <span className="chevron">›</span>
            <div className="stat-text">Tracks Raced</div>
          </div>

          <div className="stat-item">
            <span className="chevron">›</span>
            <div className="stat-text">Fastest Laps</div>
          </div>

          <div className="stat-item">
            <span className="chevron">›</span>
            <div className="stat-text">Previous Session</div>
          </div>
        </div>
      </div>

      {/* Community Leaderboard */}
      <div className="community-title">Community Leaderboard</div>

      {/* Time Filters */}
      <div className="time-filters">
        <div
          onClick={() => setTimeFilter("today")}
          className={`time-filter ${timeFilter === "today" ? "time-filter-active" : ""}`}
        >
          TODAY
        </div>
        <div
          onClick={() => setTimeFilter("week")}
          className={`time-filter ${timeFilter === "week" ? "time-filter-active" : ""}`}
        >
          WEEK
        </div>
        <div
          onClick={() => setTimeFilter("month")}
          className={`time-filter ${timeFilter === "month" ? "time-filter-active" : ""}`}
        >
          MONTH
        </div>
        <div
          onClick={() => setTimeFilter("year")}
          className={`time-filter ${timeFilter === "year" ? "time-filter-active" : ""}`}
        >
          YEAR
        </div>
      </div>

      {/* Leaderboard */}
      <div className="leaderboard">
        {leaderboardData.map((user) => (
          <div key={user.id} className="leaderboard-entry">
            <div className={`leaderboard-bar ${user.isYou ? "leaderboard-bar-you" : ""}`} />
            <div className="leaderboard-points">{user.points} pts</div>
            <div className="leaderboard-spacer" />
            <div className="leaderboard-rank">{user.id}</div>
            <div className="leaderboard-user">
              <img className="leaderboard-avatar" src="https://placehold.co/32x32" alt={user.name} />
              <div className="leaderboard-name">{user.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

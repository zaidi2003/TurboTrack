
const User = require("../models/User");
const Booking = require("../models/booking");


const dashboard = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    
    res.status(200).json({
      msg: `Hello, ${user.name}`,
      email: user.email,
      username : user.name,
      wins: user.wins,
      podiums: user.podiums,
      sessions: user.sessions,
      role: user.role,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const employeeDashboard = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    const user = await User.findById(req.user.id).select("name email role");

    // Fetch all bookings
    const bookings = await Booking.find({});

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found" });
    }

    // Count bookings per track
    const trackCounts = bookings.reduce((acc, booking) => {
      acc[booking.track] = (acc[booking.track] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      msg: `Hello, Employee!`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
      trackSummary: trackCounts,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select("email name wins")  // Select only the fields you need
      .sort({ wins: -1 })  // Sort by wins in descending order
      .limit(10);  // Limit to top 10 users

    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const testDashboard = async (req, res) => {
  res.status(200).json({ msg: "Hello, this is test dashboard" });
};

module.exports = {
  dashboard,
  employeeDashboard,
  getLeaderboard,
  testDashboard,
};

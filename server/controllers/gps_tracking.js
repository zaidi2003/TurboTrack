
const User = require("../models/User");
const GPS_coordinates = require("../models/gps_tracking"); 

const getLatestSession = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const lastEntry = await GPS_coordinates.findOne({ email: user.email }).sort({ createdAt: -1 });

    if (!lastEntry) {
        return res.status(404).json({ msg: "No GPS data found for this user" });
    }

    const coordinates = lastEntry.coordinates;
    
    res.status(200).json({
      coordinates: coordinates,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const createGPSData = async (req, res) => {
  const { coordinates, email, trackName } = req.body;

  if (!coordinates || !email || !trackName) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    const newCoordinates = new GPS_coordinates({
      coordinates,
      email,
      trackName,
    });

    await newCoordinates.save();

    res.status(201).json({ msg: "GPS data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
    getLatestSession,
    createGPSData,
};
  
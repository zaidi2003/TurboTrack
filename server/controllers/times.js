
const User = require("../models/User");
const Times = require("../models/times");

const times = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const userTimes = await Times.find({ email: user.email });

    if (!userTimes || userTimes.length === 0) {
      return res.status(404).json({ msg: "No time entries found for this user" });
    }

    const groupedTimes = userTimes.reduce((acc, timeEntry) => {
      const { trackName, subtrackName, times } = timeEntry;
      if (!acc[trackName]) {
        acc[trackName] = {};
      }
      if (!acc[trackName][subtrackName]) {
        acc[trackName][subtrackName] = [];
      }
      acc[trackName][subtrackName].push(...times);
      return acc;
    }, {});

    const aggregatedTimes = Object.entries(groupedTimes).reduce((result, [trackName, subtracks]) => {
      result[trackName] = Object.entries(subtracks).reduce((subResult, [subtrackName, times]) => {
        const average = times.reduce((sum, time) => sum + time, 0) / times.length;
        const best = Math.min(...times);
        const worst = Math.max(...times);
        subResult[subtrackName] = { average, best, worst };
        return subResult;
      }, {});
      return result;
    }, {});

    res.json({
      msg: "User times aggregated by track and subtrack",
      aggregatedTimes,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


const createDummyTimeEntry = async (req, res) => {
    try {
        // Create a new time entry using the correct field names in the schema
        const newTimeEntry = new Times({
            email: "yapping@gmail.com", // Hardcoded email (should ideally come from req.user in a real app)
            trackName: "2F2F",           // Correct field name according to the schema
            subtrackName: "Subtrack 1",  // Correct field name according to the schema
            date: new Date(),
            times: [67, 68, 69],       // Correct field name according to the schema
        });

        // Save the time entry to the database
        await newTimeEntry.save();

        // Return a success response with the new time entry
        res.status(201).json({
            msg: "Dummy time entry created successfully",
            newTimeEntry,
        });
    } catch (err) {
        // Handle errors properly
        res.status(500).json({
            msg: "Server error",
            error: err.message, // Optionally include the error message in the response for debugging
        });
    }
};

const createTimeEntryFromRequest = async (req, res) => {
  try {
    // Extract data from the request body
    const { email, trackName, subtrackName, date, times } = req.body;

    // Validate required fields
    if (!email || !trackName || !subtrackName || !date || !times) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Create a new time entry using the provided data
    const newTimeEntry = new Times({
      email,
      trackName,
      subtrackName,
      date: new Date(date),
      times,
    });

    // Save the time entry to the database
    await newTimeEntry.save();

    // Return a success response with the new time entry
    res.status(201).json({
      msg: "Time entry created successfully",
      newTimeEntry,
    });
  } catch (err) {
    // Handle errors properly
    res.status(500).json({
      msg: "Server error",
      error: err.message, // Optionally include the error message in the response for debugging
    });
  }
};

const getFirstTimeEntry = async (req, res) => {
    try {
        const timeEntry = await Times.findOne();

        if (!timeEntry) {
            return res.status(404).json({ msg: "No time entries found" });
        }

        res.json(timeEntry);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    times,
    createDummyTimeEntry,
    getFirstTimeEntry,
    createTimeEntryFromRequest,
};
  

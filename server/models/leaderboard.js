const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
    leaderboardID: {
        type: String,
        required: [true, "Please provide the leaderboard ID"]
    },

    userID: {
        type: String,
        required: [true, "Please provide the user ID"]
    },

    trackID: {
        type: String,
        required: [true, "Please provide the track ID"]
    },

    fastestLapTime: {
        type: Number,
        required: [true, "Please provide the fastest lap time"]
    },

    dateRecorded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
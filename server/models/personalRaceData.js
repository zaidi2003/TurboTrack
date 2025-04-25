const mongoose = require("mongoose");

const PersonalRaceDataSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, "Please provide the user ID"]
    },

    currentLap: {
        type: Number,
        required: [true, "Please provide the current lap time"],
        default: 0,
        min: 0,
    },

    fastestLap: {
        type: Number,
        required: [true, "Please provide the fastest lap time"],
        default: 0,
        min: 0,
    },

    currentPosition: {
        type: Number,
        required: [true, "Please provide the current position"],
        default: 0,
        min: 0,
    }
});

module.exports = mongoose.model("PersonalRaceData", PersonalRaceDataSchema);
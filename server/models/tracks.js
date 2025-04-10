const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
    trackID: {
        type: String,
        required: [true, "Please provide the track ID"]
    },

    trackName: {
        type: String,
        required: [true, "Please provide the track name"]
    },

    location: {
        type: String,
        required: [true, "Please provide the track location"]
    },

    capacity: {
        type: Number,
        required: [true, "Please provide the track capacity"]
    },

   GPSAccess: {
        type: Boolean,
        required: [true, "Please specify if GPS access is available"]
    },
});

module.exports = mongoose.model("Track", TrackSchema);
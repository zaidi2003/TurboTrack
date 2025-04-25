const mongoose = require("mongoose");

const TimesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide the user email"]
    },
    trackName: {
        type: String,
        required: [true, "Please provide the track ID"]
    },
    subtrackName: {
        type: String,
        required: [true, "Please provide the subtrack ID"]
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide the date"]
    },
    times: {
        type: [Number],
        required: [true, "Please provide an array of times"]
    }

})

module.exports = mongoose.model("Times", TimesSchema);
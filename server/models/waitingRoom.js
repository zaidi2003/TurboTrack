const mongoose = require("mongoose");

const WaitingRoomSchema = new mongoose.Schema({
    messageID: {
        type: String,
        required: [true, "Please provide the message ID"]
    },

    userID: {
        type: String,
        required: [true, "Please provide the user ID"]
    },

    sessionID: {
        type: String,
        required: [true, "Please provide the session ID"]
    },

    messageText: {
        type: String,
        required: [true, "Please provide the message text"]
    },

    timestamp: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("WaitingRoom", WaitingRoomSchema);
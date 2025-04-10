const mongoose = require("mongoose");

const LoyaltyPointsSchema = new mongoose.Schema({
    loyaltyID: {
        type: String,
        required: [true, "Please provide the loyalty ID"]
    },

    userID: {
        type: String,
        required: [true, "Please provide the user ID"]
    },

    milesEarned: {
        type: Number,
        required: [true, "Please provide the miles earned"]
    },

    milesRedeemed: {
        type: Number,
        required: [true, "Please provide the miles redeemed"]
    },

    lastUpdated: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("LoyaltyPoints", LoyaltyPointsSchema);
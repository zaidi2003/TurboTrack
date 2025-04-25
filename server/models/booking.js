const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
        required: [true, "Please provide the track ID"],
    },
    subtrackId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide the subtrack ID"],
    },

    timeSlot: {
        type: String, 
        required: [true, "Please provide a time slot"],
        match: [
            /^([01]\d|2[0-3]):([0-5]\d)$/, // Matches HH:mm format (24-hour time)
            "Please provide a valid timeslot!",
          ],
    },

    date: {
        type: Date,
        required: [true, "Please provide a date"],
    },

    email: {
        type: String,
        required: [true, "Please provide a valid email"],
    },

    bookingCreationDate: {
        type: Date,
        default: Date.now,
    },

    status:{
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
        required: true,
    }
});

module.exports = mongoose.model("Booking", BookingSchema);
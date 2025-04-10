const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    paymentID: {
        type: String,
        required: [true, "Please provide the payment ID"]
    },

    bookingID: {
        type: String,
        required: [true, "Please provide the booking ID"]
    },

    userID: {
        type: String,
        required: [true, "Please provide the user ID"]
    },

    amount: {
        type: Number,
        required: [true, "Please provide the payment amount"]
    },

    paymentMethod: {
        type: String,
        required: [true, "Please provide the payment method"],
        enum: ["Credit Card", "Debit Card", "Digital Wallet", "Bank Transfer"],
    },

    transactionID: {
        type: String,
        required: [true, "Please provide the transaction ID"]
    },

    paymentStatus: {
        type: String,
        required: [true, "Please provide the payment status"],
        enum: ["Pending", "Completed", "Failed"],
    },
});

module.exports = mongoose.model("Payment", PaymentSchema);
const User = require("../models/User");
const Booking = require("../models/booking");

const axios = require("axios");


const makeBooking = async (req, res) => {
  try {
    const { track, timeSlot, date, email } = req.body;

    // Check if the email exists in the User model
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
      });
    }

    // Create a new booking document
    const newBooking = new Booking({
      track,
      timeSlot,
      date,
      email,
    });

    // Save to DB
    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};



const makePayment = async (req, res) => {
  const { transactionId, amount, userId, cardNumber, cvc, expirationDate } = req.body;

  if (!transactionId || !amount || !userId || !cardNumber || !cvc || !expirationDate) 
  {
    return res.status(400).json({
      msg: "Bad request. Please provide transactionId, amount, and userId!",
    });
  }

  try {
    // sending req to payment server
    const response = await axios.post("http://localhost:8000/api/v1/payment/authenticate", {
      transactionId,
      amount,
      userId,
      cardNumber,
      cvc,
      expirationDate,
    });

    return res.status(200).json({
      msg: "Payment processed successfully",
      paymentResponse: response.data,
    });
  } 
  
  catch (error) 
  {
    return res.status(400).json({
      msg: "Payment processing failed",
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {
  makeBooking,
  makePayment,
};

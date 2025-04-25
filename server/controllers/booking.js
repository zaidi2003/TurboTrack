const User = require("../models/User");
const Booking = require("../models/booking");

const axios = require("axios");


const makeBooking = async (req, res) => {
  try {
    const { track, timeSlot, date, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
      });
    }

    const newBooking = new Booking({
      track,
      timeSlot,
      date,
      email,
    });

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


const getUserBookings = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const bookings = await Booking.find({ email: user.email, status: "pending" });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found for this user" });
    }
    const bookingsWithLuckyNumber = bookings.map((booking) => ({
      ...booking.toObject(),
      luckyNumber,
    }));
    res.status(200).json({
      msg: "Bookings retrieved successfully",
      bookings: bookingsWithLuckyNumber,
      user: {
        name: user.name,
        email: user.email,
        wins: user.wins,
        podiums: user.podiums,
        sessions: user.sessions,
        role: user.role,
      },
    });
  }
  catch (error) {
    res.status(500).json({
      msg: "Error retrieving bookings",
      error: error.message,
    });
  }
};


const getUserBookingsHistory = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const bookings = await Booking.find({ email: user.email });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found for this user" });
    }
    const bookingsWithLuckyNumber = bookings.map((booking) => ({
      ...booking.toObject(),
      luckyNumber,
    }));
    res.status(200).json({
      msg: "Bookings retrieved successfully",
      bookings: bookingsWithLuckyNumber,
      user: {
        name: user.name,
        email: user.email,
        wins: user.wins,
        podiums: user.podiums,
        sessions: user.sessions,
        role: user.role,
      },
    });
  }
  catch (error) {
    res.status(500).json({
      msg: "Error retrieving bookings",
      error: error.message,
    });
  }
};


const cancelBooking = async (req, res) => {
  try {
    //const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    userEmail = "yapping@gmail.com"
    const booking = await Booking.findOne({ _id: req.body.bookingId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // if (booking.email !== userEmail) {
    //   return res.status(403).json({ message: "You are not authorized to cancel this booking" });
    // }

    // if (booking.status !== "pending") {
    //   return res.status(400).json({ message: "Only pending bookings can be cancelled" });
    // }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking successfully cancelled", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getCancelledBookings = async (req, res) => {
  try {
    const cancelledBookings = await Booking.find({ status: "cancelled" });

    if (!cancelledBookings || cancelledBookings.length === 0) {
      return res.status(404).json({ message: "No cancelled bookings found" });
    }

    res.status(200).json({
      message: "Cancelled bookings retrieved successfully",
      bookings: cancelledBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving cancelled bookings",
      error: error.message,
    });
  }
};



module.exports = {
  makeBooking,
  makePayment,
  getUserBookings,
  getUserBookingsHistory,
  cancelBooking,  
  getCancelledBookings,
};

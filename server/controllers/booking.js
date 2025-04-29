const User = require("../models/User");
const Booking = require("../models/booking");
const Track = require("../models/tracks");

const axios = require("axios");

const makeBooking = async (req, res) => {
  try {
    const { track, subtrackId, timeSlot, date, email, cost } = req.body;


    const foundTrack = await Track.findById(track);
    if (!foundTrack) {
      return res.status(404).json({
        message: "Track not found",
      });
    }

    const foundSubtrack = foundTrack.subtracks.id(subtrackId);
    if (!foundSubtrack) {
      return res.status(400).json({
        message: "Invalid subtrack for the selected track",
      });
    }

    const newBooking = new Booking({
      track,
      subtrackId,
      timeSlot,
      date,
      email,
      cost,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      booking: savedBooking,
      subtrackCost: foundSubtrack.cost, // Optional: include cost in response
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
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const bookings = await Booking.find({ email: user.email });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found for this user" });
    }

    // Add track and subtrack details to each booking
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const trackDoc = await Track.findById(booking.track);
        const subtrack = trackDoc?.subtracks.id(booking.subtrackId);

        return {
          ...booking.toObject(),
          trackName: trackDoc?.trackName || null,
          subtrack: subtrack ? {
            name: subtrack.name,
            cost: subtrack.cost,
          } : null,
        };
      })
    );

    res.status(200).json({
      msg: "Bookings retrieved successfully",
      bookings: bookingsWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error retrieving bookings",
      error: error.message,
    });
  }
};

const getRefundBookings = async (req, res) => {
  try {
    const refundBookings = await Booking.find({ status: "refund_pending" });

    if (!refundBookings || refundBookings.length === 0) {
      return res.status(404).json({ message: "No refund bookings found" });
    }

    res.status(200).json({
      message: "Refund bookings retrieved successfully",
      bookings: refundBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving refund bookings",
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
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    const booking = await Booking.findOne({ _id: req.body.bookingId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.email !== user.email

    ) {
      return res.status(403).json({ message: "You are not authorized to cancel this booking" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking successfully cancelled", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const refundBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body.bookingId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }


    if (booking.status !== "refund_pending") {
      return res.status(400).json({ message: "Only pending bookings can be cancelled" });
    }

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




// for payment

const authenticatePayment = async (req, res) => {
  const { amount, cardNumber, cvc, expirationDate} = req.body;

  if ( amount === null || cardNumber === null || cvc === null, expirationDate === null) 
  {
    return res.status(400).json({
      msg: "Please provide transactionId, amount, card number, and userId.",
    });
  }

  const amountValid = amount >= 500;
  const cardNumberValid = /^[0-9]{16}$/.test(cardNumber);
  const cvcValid = /^[0-9]{3}$/.test(cvc);
  const expirationDateValid = validateExpirationDate(expirationDate);

  if (!expirationDateValid)
  {
    if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate) === false)
    {
      return res.status(400).json({
          msg: "Expiration date format is invalid. Please provide a valid expiration date.",
      });
    }

    else 
    {
      return res.status(400).json({
        msg: "Your card has expired.",
      });
    }
  }
  
  if (!amountValid)
  {
      return res.status(400).json({
          msg: "Transaction amount is invalid. One karting session costs 3500.",
      });
  }

  if (!cardNumberValid)
  {
      return res.status(400).json({
          msg: "Card number is invalid. Please provide a valid card number.",
      });
  }

  if (!cvcValid)
  {
      return res.status(400).json({
          msg: "CVC is invalid. Please provide a valid CVC.",
      });
  }

  if (amountValid && cardNumberValid && cvcValid) 
  {
    return res.status(200).json({
      msg: "Payment authenticated successfully",
      amount,
      cardNumber,
      cvc,
      expirationDate,
      status: "success",
    });
  } 
  
  else 
  {
    return res.status(400).json({
      msg: "Payment authentication failed",
      amount,
      cardNumber,
      cvc,
      expirationDate,
      status: "failed",
    });
  }
};

const validateExpirationDate = (expirationDate) => {
  const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!expirationRegex.test(expirationDate)) 
  {
    return false; 
  }

  const [month, year] = expirationDate.split('/').map(Number);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; 
  const currentMonth = currentDate.getMonth() + 1;

  if (currentYear > year || (currentYear === year && currentMonth > month)) 
  {
    return false;
  }

  else if (currentYear === year && currentMonth === month) 
  {
    return false;
  }

  else if (currentMonth === month && currentYear > year)
  {
    return false;
  }

  return true;
};


module.exports = {
  makeBooking,
  makePayment,
  getUserBookings,
  getUserBookingsHistory,
  cancelBooking,  
  getCancelledBookings,

  authenticatePayment,
  validateExpirationDate,

  getRefundBookings,
  refundBooking,
};

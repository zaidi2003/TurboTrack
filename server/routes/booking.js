const express = require("express");
const router = express.Router();
const { makeBooking, makePayment, getUserBookings, getUserBookingsHistory } = require("../controllers/booking");
const authMiddleware = require('../middleware/auth')

router.route('/create',makeBooking).post(makeBooking);
router.route('/make-payment').post(makePayment);
router.route('/get-user-bookings').get(authMiddleware,getUserBookings);
router.route('/get-user-bookings-history').get(authMiddleware,getUserBookingsHistory);
module.exports = router;
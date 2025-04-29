const express = require("express");
const router = express.Router();
const { makeBooking, makePayment, getUserBookings, getUserBookingsHistory, cancelBooking, getCancelledBookings, authenticatePayment } = require("../controllers/booking");
const authMiddleware = require('../middleware/auth')

router.route('/create',makeBooking).post(makeBooking);
router.route('/make-payment').post(makePayment);
router.route('/get-user-bookings').get(authMiddleware,getUserBookings);
router.route('/get-user-bookings-history').get(authMiddleware,getUserBookingsHistory);
router.route('/cancel').post(authMiddleware,cancelBooking);
router.route('/get-cancelled-bookings').get(getCancelledBookings);
router.route('/authenticate-payment', authenticatePayment).post(authenticatePayment);
module.exports = router;
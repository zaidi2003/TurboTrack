const express = require("express");
const router = express.Router();
const { makeBooking, makePayment } = require("../controllers/booking");
router.route('/create',makeBooking).post(makeBooking);
router.route('/make-payment').post(makePayment);
module.exports = router;
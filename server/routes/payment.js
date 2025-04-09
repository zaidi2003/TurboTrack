const express = require("express");
const router = express.Router();
const { authenticatePayment } = require("../controllers/payment");

router.post("/authenticate", authenticatePayment);

module.exports = router;
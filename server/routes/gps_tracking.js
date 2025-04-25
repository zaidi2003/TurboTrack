const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const { getLatestSession , createGPSData, } = require("../controllers/gps_tracking")


router.route('/create',createGPSData).post(createGPSData);
router.route('/').get(authMiddleware,getLatestSession);
module.exports = router;
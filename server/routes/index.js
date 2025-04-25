const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');
const bookingRoutes = require('./booking');
const trackRoutes = require('./tracks');
const timesRoutes = require('./times');
const gpsRoutes = require('./gps_tracking');

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/booking', bookingRoutes);
router.use('/tracks', trackRoutes);
router.use('/times', timesRoutes);
router.use('/gps', gpsRoutes);
module.exports = router;

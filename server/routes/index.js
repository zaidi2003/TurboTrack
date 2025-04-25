const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');
const bookingRoutes = require('./booking');
const trackRoutes = require('./tracks');


router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/booking', bookingRoutes);
router.use('/tracks', trackRoutes);

module.exports = router;
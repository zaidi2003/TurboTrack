const express = require("express");
const router = express.Router();
const { dashboard, employeeDashboard, getLeaderboard, testDashboard} = require("../controllers/dashboard");
const authMiddleware = require('../middleware/auth')

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/leaderboard").get(getLeaderboard);
router.route("/employee-dashboard").get(authMiddleware, employeeDashboard);
router.route("/test").get(testDashboard);


module.exports = router;
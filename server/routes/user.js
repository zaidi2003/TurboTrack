const express = require("express");
const router = express.Router();

const { login, register, dashboard, getAllUsers, becomeAPartner, getAllUsersStats, makeBooking, changePassword, makePayment, getLeaderboard, employeeDashboard} = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);
router.route("/users/stats").get(getAllUsersStats);
router.route("/become-a-partner", becomeAPartner).post(becomeAPartner);
router.route("/change-password").post(authMiddleware, changePassword);
router.route('/make-booking',makeBooking).post(makeBooking);
router.route('/make-payment').post(makePayment);
router.route("/leaderboard").get(getLeaderboard);
router.route("/employee-dashboard").get(authMiddleware, employeeDashboard);

module.exports = router;
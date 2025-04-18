const express = require("express");
const router = express.Router();

const { login, register, dashboard, getAllUsers, becomeAPartner, getAllUsersStats, makeBooking, changePassword, makePayment, getLeaderboard, employeeDashboard} = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/get-all-users").get(getAllUsers);
router.route("/get-all-users-stats").get(getAllUsersStats);
router.route("/change-password").post(authMiddleware, changePassword);
router.route("/become-a-partner", becomeAPartner).post(becomeAPartner);

module.exports = router;
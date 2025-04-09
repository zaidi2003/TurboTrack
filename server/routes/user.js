const express = require("express");
const router = express.Router();

const { login, register, dashboard, getAllUsers, becomeAPartner} = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);
router.route("/become-a-partner", becomeAPartner).post(becomeAPartner);


module.exports = router;
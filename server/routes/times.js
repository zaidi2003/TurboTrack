const express = require("express");
const router = express.Router();
const {times, getFirstTimeEntry, createDummyTimeEntry, createTimeEntryFromRequest} = require("../controllers/times");
const authMiddleware = require('../middleware/auth')

router.route("/").get(authMiddleware, times);
router.route("/createDummy").post(createDummyTimeEntry);
router.route("/first").get(getFirstTimeEntry);
router.route("/create").post(createTimeEntryFromRequest);


module.exports = router;
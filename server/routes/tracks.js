const express = require("express");
const router = express.Router();

const { getAllTracks, getAllTrackNames, createTrack } = require("../controllers/track");

router.route("/").get(getAllTracks);
router.route("/track-names").get(getAllTrackNames);
router.route("/create").post(createTrack);


module.exports = router;
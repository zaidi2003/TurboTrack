const express = require("express");
const router = express.Router();

const { getAllTracks, getAllTrackNames, createTrack, getTrackbyName } = require("../controllers/track");

router.route("/").get(getAllTracks);
router.route("/track-names").get(getAllTrackNames);
router.route("/create").post(createTrack);
router.route("/:trackName").get(getTrackbyName);


module.exports = router;
const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema({
    coordinates: {
      type: [[Number]], // an array of arrays with each inner array containing two numbers [latitude, longitude]
      required: true
    },
    email: {
        type: String,
        required: true,
    },
    trackName: {
        type: String,
        required: true,
    },
  });


module.exports = mongoose.model("GPS_coordinates", coordinateSchema);
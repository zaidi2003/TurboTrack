const mongoose = require("mongoose");
const SubtrackSchema = new mongoose.Schema({
  subtrackName: {
    type: String,
    required: [true, "Please provide the subtrack name"],
  },
  length: {
    type: String,
    required: [true, "Please provide the length of the subtrack"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "intermediate", "difficult"],
    required: [true, "Please provide the difficulty of the subtrack"],
  },
  cost: {
    type: Number,
    required: [true, "Please provide the cost of the subtrack"],
  }
});


const TrackSchema = new mongoose.Schema({  
    trackName: {
      type: String,
      required: [true, "Please provide the track name"],
    },
  
    subtracks: [SubtrackSchema], // An array of Subtrack documents
  });


module.exports = mongoose.model("Track", TrackSchema);

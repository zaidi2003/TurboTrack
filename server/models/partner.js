const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  fullName: {
        type: String,
        required: [true, "Please provide your full name (as per CNIC)"],
  },

  businessName: {
        type: String,
        required: [true, "Please proide the name of your business"],
  },

  email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email address invalid",
        ],
  },

  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
    minlength: 11
  },

  businessAddress: {
        type: String,
        required: [true, "Please provide your business address"],
  },

  bankName: {
        type: String,
        required: [true, "Please provide your bank name"],
  },
  
  accountOwner: {
        type: String,
        required: [true, "Please provide the name of the account owner"],
  },

  iban: {
        type: String,
        required: [true, "Please provide your IBAN"],
  },
});

module.exports = mongoose.model("Partner", PartnerSchema);
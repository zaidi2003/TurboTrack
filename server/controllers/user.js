const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Partner = require("../models/partner"); 
const Booking = require("../models/booking");

const axios = require("axios");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      //console.log("JWT_SECRET during signing", token); 

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentails" });
  }
};

const dashboard = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    const user = await User.findById(req.user.id).select("name email wins podiums sessions role");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    
    res.status(200).json({
      msg: `Hello, ${user.name}`,
      email: user.email,
      username : user.name,
      wins: user.wins,
      podiums: user.podiums,
      sessions: user.sessions,
      role: user.role,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const employeeDashboard = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    const user = await User.findById(req.user.id).select("name email role");

    // Fetch all bookings
    const bookings = await Booking.find({});

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found" });
    }

    // Count bookings per track
    const trackCounts = bookings.reduce((acc, booking) => {
      acc[booking.track] = (acc[booking.track] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      msg: `Hello, Employee!`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
      trackSummary: trackCounts,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// api function to only get all users stats
const getAllUsersStats = async (req, res) => {
  try {
    const users = await User.find({})
      .select("name wins podiums sessions")  // Select only the fields you need
      .sort({ wins: -1 }); 

    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// api function to only get all users stats
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select("email name wins")  // Select only the fields you need
      .sort({ wins: -1 })  // Sort by wins in descending order
      .limit(10);  // Limit to top 10 users

    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
        wins: 0,
        podiums: 0,
        sessions: 0,
      });
      await person.save();
      return res.status(201).json({ person });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

const makeBooking = async (req, res) => {
  try {
    const { track, timeSlot, date, email } = req.body;

    // Check if the email exists in the User model
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
      });
    }

    // Create a new booking document
    const newBooking = new Booking({
      track,
      timeSlot,
      date,
      email,
    });

    // Save to DB
    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// backend for becomeAPartner
const becomeAPartner = async (req, res) => {
  try {
    const { fullName, businessName, email, phone, businessAddress, bankName, accountOwner, iban } = req.body;

    if (!fullName || !businessName || !email || !phone || !businessAddress || !bankName || !accountOwner || !iban) {
      return res.status(400).json({
        msg: "Bad request. Please fill in all the fields",
      });
    }

    const partner = await Partner.create({
      fullName,
      businessName,
      email,
      phone,
      businessAddress,
      bankName,
      accountOwner,
      iban,
    });

    // Create a user profile with the same email, full name, and default password
    const defaultPassword = "admin";
    const user = new User({
      name: fullName,
      email: email,
      password: defaultPassword,
      wins: 0,
      podiums: 0,
      sessions: 0,
      role: "Employee", 
    });

    await user.save();

    res.status(200).json({
      msg: "Partner application submitted successfully and user profile created",
    });
  } catch (error) {
    console.error(error);

    // if email already exists...
    if (error.code === 11000) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }

    // if number entered < minimum length
    if (error.errors && error.errors.phone) {
      return res.status(400).json({
        msg: "Phone number must be 11 digits",
      });
    }

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// change password
const changePassword = async (req, res) => 
{
  try 
  {
    const {currPassword, newPassword} = req.body;

    if (!currPassword || !newPassword)
    {
      return res.status(400).json({
        msg: "Please fill in all the fields!",
      });
    }

    else if (newPassword === currPassword)
    {
      return res.status(400).json({
        msg: "New password cannot be the same as the old password",
      })
    }

    const user = await User.findById(req.user.id);

    if (!user)
    {
      return res.status(404).json({
        msg: "User not found",
      })
    }

    const passMatch = await bcrypt.compare(currPassword, user.password);

    if (!passMatch)
    {
      return res.status(400).json({
        msg: "Current password is incorrect",
      })
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(newPassword, salt);

    // user.password = hashedPassword
    user.password = newPassword;
    await user.save();

    //console.log("Pasword set to: ", user.password);
    // console.log("Hashed password set to: ", hashedPassword);


    res.status(200).json({
      msg: "Password updated successfully!"
    });
  }

  catch (error)
  {
    console.error(error);

    res.status(500).json(
    {
      msg: "ERROR",
    });
  }
}

const makePayment = async (req, res) => {
  const { transactionId, amount, userId, cardNumber } = req.body;

  if (!transactionId || !amount || !userId || !cardNumber) 
  {
    return res.status(400).json({
      msg: "Bad request. Please provide transactionId, amount, and userId!",
    });
  }

  try {
    // sending req to payment server
    const response = await axios.post("http://localhost:8000/api/v1/payment/authenticate", {
      transactionId,
      amount,
      userId,
      cardNumber,
    });

    return res.status(200).json({
      msg: "Payment processed successfully",
      paymentResponse: response.data,
    });
  } 
  
  catch (error) 
  {
    return res.status(400).json({
      msg: "Payment processing failed",
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {
  login,
  register,
  changePassword,
  dashboard,
  getAllUsersStats,
  getAllUsers,
  becomeAPartner,
  makeBooking,
  makePayment,
  getLeaderboard,
  employeeDashboard,
};

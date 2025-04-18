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


module.exports = {
  login,
  register,
  changePassword,
  getAllUsersStats,
  getAllUsers,
  becomeAPartner,
};

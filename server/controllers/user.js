const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Partner = require("../models/Partner"); 

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
    const user = await User.findById(req.user.id).select("name email wins podiums sessions");

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
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
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
const becomeAPartner = async (req, res) => 
{
  try 
  {
    const {fullName, businessName, email, phone, businessAddress, bankName, accountOwner, iban} = req.body;

    if (!fullName || !businessName || !email || !phone || !businessAddress || !bankName || !accountOwner || !iban)
    {
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
      iban
    });

    res.status(200).json({
      msg: "Partner application submitted successfully"
    });
  }

  catch (error) 
  {
    console.error(error);
    
    // if email already exists...
    if (error.code === 11000) 
    {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }

    // if number entered < minimum length
    if (error.errors.phone) 
    {
      return res.status(400).json({
        msg: "Phone number must be 11 digits",
      });
    }
    
    // return res.status(500).json({
    //   msg: "Internal server error",
    // });
  }
};

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  becomeAPartner
};

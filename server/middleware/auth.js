const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({msg: "Unauthorized. Please add valid token (1)"});
  }

  const token = authHeader.split(' ')[1]

  if (!token)
  {
    return res.status(401).json({msg: "Unauthorized! Please add a valid token"});
  }

  try {
    // console.log("JWT_SECRET during verification:", process.env.JWT_SECRET); // Debugging
    // console.log("Authorization Header:", authHeader); // Debugging
    // console.log("Extracted Token:", token); // Debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, name } = decoded
    req.user = { id, name }
    next()
  } 
  
  catch (error) 
  {
    // console.error("Token Verification Error:", error); // Debugging
    return res.status(401).json({msg: "Unauthorized. Please add valid token"});
  }
}

module.exports = authenticationMiddleware
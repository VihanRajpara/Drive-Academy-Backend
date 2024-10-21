const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const generateUniqueId = require('../helper/userHelper');
const generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  const { username, password ,academy} = req.body;
  try {
    const userExists = await userModel.findOne({ username });

    // Check if user already exists
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    console.log("password",hashedPassword);
    
    // Create new user
    const user = await userModel.create({
      username:username,
      password:hashedPassword,
      academy:academy
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        academy: user.academy,
        token: generateToken(user.username),
        message: "Registered successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser };

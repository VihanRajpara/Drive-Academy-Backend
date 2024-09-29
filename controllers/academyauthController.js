const academyModel = require("../models/academyModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

const generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerAcademy = async (req, res) => {
  const { name, password } = req.body;
  try {
    const academyExists = await academyModel.findOne({ name });

    // Check if user already exists
    if (academyExists) {
      return res.status(400).json({
        success: false,
        message: "academy already exists",
      });
    }

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    console.log("password",hashedPassword);
    
    // Create new user
    const academy = await academyModel.create({
      name:name,
      password:hashedPassword,
    });

    if (academy) {
      res.status(201).json({
        _id: academy._id,
        name: academy.username,
        token: generateToken(academy.name),
        message: "Registered successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerAcademy };

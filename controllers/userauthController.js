const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

const generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET);
  // return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  const { email, password ,academy} = req.body;
  try {
    const userExists = await userModel.findOne({ email });
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
      email:email,
      password:hashedPassword,
      academy:academy
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        academy: user.academy,
        // token: generateToken(user.email),
        message: "Registered successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const loginUser = async (req, res) => {
  const { userCode, password } = req.body;

  const academyCode = userCode.substring(0, 3); // First three digits for academy
  const userId = userCode.substring(3); // Last three digits for user ID

  try {
    // Find the user by _id (assuming it's the last three digits)
    const user = await userModel.findOne({ _id: userId });

    if (!user || user.academy !== academyCode) {
      return res.status(400).json({
        success: false,
        message: "User not found or academy code does not match",
      });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // If the user exists and the password is correct, generate a token
    res.status(200).json({
      id: user._id,
      email: user.email,
      academy: user.academy,
      token: `vihan ${generateToken({id:user._id,email:user.email,academy:user.academy,userCode:`${user.academy}${user._id}`})}`, // Assuming you still want to use the email for token generation
      message: "Login successful",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getCurrentuser = async (req, res)=>{
  const user = req.user;
  console.table(user);
  res.status(200).json({
    _id: user._id,
    email: user.email,
    academy: user.academy,
    // message:user.data,
  });
}



module.exports = { registerUser,loginUser,getCurrentuser };

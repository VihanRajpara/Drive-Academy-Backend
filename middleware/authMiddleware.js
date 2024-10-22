// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied.",
    });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token is not valid.",
      });
    }
    console.log("\n\ndecoded",decoded);
    
    // Save the decoded user data to the request for use in other routes
    req.user = decoded; 
    next(); // Proceed to the next middleware/route handler
  });
};

module.exports = validateToken;

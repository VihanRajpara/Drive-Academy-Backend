const express = require("express");
const {registerUser,loginUser,getCurrentuser} = require('../controllers/userauthController');
const validateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/register",validateToken, registerUser);
router.post("/login", loginUser);
router.get("/currentuser",validateToken,getCurrentuser);

module.exports = router;
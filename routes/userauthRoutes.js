const express = require("express");
const {registerUser} = require('../controllers/userauthController');
const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
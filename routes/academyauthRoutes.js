const express = require("express");
const {registerAcademy} = require('../controllers/academyauthController');
const router = express.Router();

router.post("/register", registerAcademy);

module.exports = router;
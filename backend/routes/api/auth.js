const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
var cors = require("cors");
// var app = express();

router.use(cors());

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const { loginUser, registerUser, requireSignin } = require("../../controllers/auth");

//Load user model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", loginUser);

// router.get("/hello", requireSignin, (req, res) => {
//   res.send("Hello there");
// });



module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
var cors = require("cors");
// var app = express();

router.use(cors());

const { create } = require("../../controllers/category");
const {
    loginUser,
    registerUser,
    requireSignin,
    isAdmin,
    isAuth,
} = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById);

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
var cors = require("cors");
// var app = express();

router.use(cors());

const { create, productById, read, remove } = require("../../controllers/product");
const {
    loginUser,
    registerUser,
    requireSignin,
    isAdmin,
    isAuth,
} = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

router.get("/product/:productId", read);

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

router.delete("/product/:productId/:userId",requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;

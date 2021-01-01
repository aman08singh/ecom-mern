const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
var cors = require("cors");
// var app = express();

router.use(cors());

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../../controllers/category");
const {
  loginUser,
  registerUser,
  requireSignin,
  isAdmin,
  isAuth,
} = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/category/:categoryId", read);
router.get("/categories", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;

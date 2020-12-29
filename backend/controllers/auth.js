const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var cors = require("cors");
const expressJwt = require("express-jwt");
// var app = express();

router.use(cors());

//Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//Load user model
const User = require("../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public

exports.registerUser = (req, res) => {
  //Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        about: req.body.about,
      });

      //Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          // newUser
          //   .save()
          //   .then((user) => res.json(user))
          //   .catch((err) => console.log(err));

          //Below step is to hide the password from the browser's network response preview console.
          newUser.save((err, newUser) => {
            if (err) {
              console.log(err);
            }
            newUser.password = undefined;
            res.json({
              newUser,
            });
          });
        });
      });
    }
  });
};

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
exports.loginUser = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // console.log("From users.js from routes/api in backend request is", req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then((user) => {
    //Check if user exists
    if (!user) {
      // Check this for error
      return res.status(404).json({ emailNotFound: "Email Not Found" });
    }
    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        // console.log("User Role is", user.role);
        const payload = {
          id: user.id,
          name: user.name,
        };
        //Sign Token
        jwt.sign(
          payload,
          keys.secretKey,
          {
            expiresIn: 86400, // 1 day in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              //Uncomment below line if you want to send additional details to the browser's network console.
              // You can send additional details just as i have sent in below line for username.
              // username: user.name
              userId: user.id,
              role: user.role,
            });
          }
        );
      } else {
        // check this for error
        return res
          .status(400)
          .json({ passwordIncorrect: "Email or Password incorrect" });
      }
    });
  });
};

// exports.hello = (req, res) => {
//     return res.status(200).json({success: "success"});
// }

exports.requireSignin = expressJwt({
  secret: keys.secretKey,
  // privateKey: keys.secretKey,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    // console.log("req.profile._id", req.profile);
    // console.log("req.auth.userId", req.auth);
    //_id is for the profile id.
    // id is the id after authentication.
  let user = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin Access Denied",
    });
  }
  next();
};

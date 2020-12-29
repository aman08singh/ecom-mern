const User = require("../models/User");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
      // console.log("User is", id);
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

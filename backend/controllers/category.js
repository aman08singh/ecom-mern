const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        //Here in the video he has uesd dbErrorHandler from ../helpers/dbErrorHandler.js. But you can also directly send the error in the network console. The dbErrorHandler is just a formatter for the errors. If in the video he uses the dbErrorHandler extensively, then you can try to replace the value of error with like this.
        //error: errorHandler(err)
        error: "Error, cannot create category",
      });
    }
    res.json({ data });
  });
};

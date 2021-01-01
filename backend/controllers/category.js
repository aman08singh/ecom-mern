const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const category = require("../models/category");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Error, cannot find category",
      });
    }
    req.category = category;
    next();
  });
};

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

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Error, cannot find category",
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Error, cannot find category",
      });
    }
    res.json({
      message: "Category Deleted",
    });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Error, cannot find category",
      });
    }
    res.json(data);
  });
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      // ref: "Category", If any error occurs check this
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: true,
      type: Boolean,
    },
  },
  { timestamps: true }
);

//Check this part for errors. As i have written in a different style comparing to the website.
// This error shows, but dosen't affect the working of the server.
module.exports = Product = mongoose.model("product", ProductSchema);
// module.exports = mongoose.model("User", UserSchema);

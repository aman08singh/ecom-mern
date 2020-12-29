const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Check this part for errors. As i have written in a different style comparing to the website.
// This error shows, but dosen't affect the working of the server.
module.exports = Category = mongoose.model("category", CategorySchema);
// module.exports = mongoose.model("User", UserSchema);

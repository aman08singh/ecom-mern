const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      //This i have added.
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //This about, role and history attribute i have added.
    about: {
      type: String,
      trim: true,
    },
    //Role will save, if a user is admin or normal user.
    // 0 = Normal User, 1 = Admin
    role: {
      type: Number,
      default: 0,
    },
    //History will save the users previous purchases.
    history: {
      type: Array,
      default: [],
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
  },
  { timestamps: true }
);

//Check this part for errors. As i have written in a different style comparing to the website.
// This error shows, but dosen't affect the working of the server.
module.exports = User = mongoose.model("users", UserSchema);
// module.exports = mongoose.model("User", UserSchema);

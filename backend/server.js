const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const authRoutes = require("./routes/api/auth");
const userRoutes = require("./routes/api/user");
const categoryRoutes = require("./routes/api/category");
const productRoutes = require("./routes/api/product");
const app = express();
const router = express.Router();
var cors = require("cors");

app.use(bodyParser.json()); //This was the onle line adittion to solve 2 days worth of errors. This was the error which was comming when i post the data i.e., request headers was going but in the server it was comming as blank.
router.use(cors());

//Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//DB Config
const db = require("./config/keys").mongoUrl;

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", categoryRoutes);
app.use("/api/users", productRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));

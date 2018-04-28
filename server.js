const express = require("express");
const app = express();

const session = require("express-session");
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

//configure body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));

/*
const isAuthenticated = require("../middleware/isAuthenticated");
app.get("/", isAuthenticated, (req, res) => {
  res.redirect("/search");
});*/
const isAuthenticated = (req, res, next) => {
  console.log("isAuthenticated");
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    console.log("/search");
    return res.redirect("/search"); //next();
  }
  console.log("/login");
  // If the user isnt' logged in, redirect them to the login page
  return res.redirect("/login");
};

//app.get("/", isAuthenticated);

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.send("/search");
});

/*
app.get("/api/login/test", (req, res) => {
  console.log("ask");
  if (req.user) {
    console.log(req.user);
    res.json(req.user);
  } else {
    res.json({});
  }
});
*/

// Add routes, both API and view
//const routes = require("./routes");
app.use(require("./routes"));

// Connect to the Mongo DB
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/shopforcitiesdb"
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

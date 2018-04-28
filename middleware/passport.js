const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Users } = require("../models");
const bcrypt = require("./bcrypt");

// Telling passport we want to use a Local Strategy. In other words, we want login with a email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    { usernameField: "email" },
    function(email, password, done) {
      console.log("Calling Strategy");
      // When a user tries to sign in this code
      Users.findOne({ email }).then(user => {
        // If there's no user
        if (!user) {
          console.log("Incorrect email");
          return done(null, false, { message: "Incorrect email." });
        }
        if (!bcrypt.validate(password, user.password)) {
          console.log("Not valid");
          // If there is a user with the given email, but the password the user gives us is incorrect
          return done(null, false, { message: "Incorrect password." });
        }
        // If none of the above, return the user
        return done(null, user);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

// Exporting our configured passport
module.exports = passport;

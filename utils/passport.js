const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const strategy = new LocalStrategy(
  customFields,
  async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, {
          message: "Account with email does not exist!",
        });
      }
      const match = bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password!" });
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(strategy);

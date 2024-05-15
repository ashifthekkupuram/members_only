const passport = require("passport");
const { body, validationResult } = require("express-validator");
const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.login_get = (req, res, next) => {
  res.render("login_form");
};

exports.login_post = (req, res, next) => {
  passport.authenticate("local", (err, user, options) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.render("login_form", {
        errors: options.message,
        formValues: {
          email: req.body.email,
          password: req.body.password,
        },
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
};

exports.signup_get = (req, res, next) => {
  res.render("signup_form");
};

exports.signup_post = [
  body("email", "An user must have a email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error("Email address is already in use");
      }
      return true;
    }),
  body("firstName", "First name must have three characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("secondName", "Second name must have three characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password1")
    .notEmpty()
    .withMessage("Password Required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("password2")
    .custom((value, { req }) => {
      if (value !== req.body.password1) {
        throw new Error("Passwords do not macth");
      }
      return true;
    })
    .withMessage("Passwords must match"),
  AsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("signup_form", {
        errors: errors.array(),
        formValues: {
          email: req.body.email,
          firstName: req.body.firstName,
          secondName: req.body.secondName,
          password1: req.body.password1,
          password2: req.body.password2,
        },
      });
    } else {
      try {
        bcrypt.hash(req.body.password1, 10, async (err, hashedPassword) => {
          if (err) {
            next(err);
          } else {
            const user = new User({
              email: req.body.email,
              firstName: req.body.firstName,
              secondName: req.body.secondName,
              password: hashedPassword,
            });
            const result = await user.save();
            res.redirect("/");
          }
        });
      } catch (error) {
        next(error);
      }
    }
  }),
];

exports.logout_get = (req, res, next) => {
  
    req.logout((err)=>{
      if(err){
        return next(err)
      }
      return res.redirect('/auth/login')
    })

};

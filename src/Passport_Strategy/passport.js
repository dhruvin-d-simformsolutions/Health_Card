const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { comparePassword } = require("../utils/encrypation");
const { findByCredentials } = require("../utils/findByCredentials");
const Patient = require("../models/patient");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "username",
      },
      async (username, password, done) => {
        //Match user
        findByCredentials(username, password)
          .then((user) => {
            return done(null, user);
          })
          .catch((error) => {
            return done(null, false, {
              message: error.message,
            });
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Patient.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { comparePassword } = require("../utils/encrypation");
const { findByCredentials } = require("../utils/findByCredentials");
const Patient = require("../models/patient");
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");

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

        // const first = username[0];
        // let user;
        // switch (first) {
        //   case "P":
        //     user = await Patient.findOne({
        //       healthid: username,
        //     });
        //     break;
        //   case "D":
        //     user = await Doctor.findOne({
        //       doctorid: username,
        //     });
        //     break;
        //   case "L":
        //     user = await Lab.findOne({
        //       labid: username,
        //     });
        //     break;
        //   case "M":
        //     user = await Medical.findOne({
        //       medicalid: username,
        //     });
        //     break;
        //   default:
        //     throw new Error("Invalid UserName !!!");
        // }

        // if (!user) {
        //   return done(null, false, {
        //     message: "Username is not register",
        //   });
        // }

        // //Compare Password
        // bcrypt.compare(password, user.password, (err, isverify) => {
        //   if (err) throw err;
        //   if (isverify) {
        //     console.log("Successful");
        //     return done(null, user);
        //   } else {
        //     console.log("password incorrect");
        //     return done(null, false, {
        //       message: "Password incorrect",
        //     });
        //   }
        // });

        //Match user
        // Patient.findOne({
        //     healthid: username
        // }).then((user) => {
        //     if (!user) {
        //         return done(null, false, {
        //             message: 'Username is not register'
        //         });
        //     }
        //     bcrypt.compare(password, user.password, (err, isverify) => {
        //         if (err) throw err;
        //         if (isverify) {
        //             console.log("Successful");
        //             return done(null, user)
        //         } else {
        //             console.log("password incorrect");
        //             return done(null, false, {
        //                 message: 'Password incorrect'
        //             });
        //         }
        //     });
        // });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    // console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Patient.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

/* const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load Owner Model
const Owner = require('../models/Owner');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match Owner
      Owner.findOne({ email: email })
        .then(owner => {
          if(!owner) {
            return done(null, false, { message: 'That email is not registered' });
          }

          //Match Password 
          bcrypt.compare(password, owner.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch) {
              return done(null, owner);
            } else {
              return done(null, false, { message: 'Password incorrect '})
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  // In order for persistent sessions to work, the authenticated user must be serialized to the session
  passport.serializeUser((owner, done) => {
    done(null, owner.id);
  });
  // ...and deserialized when subsequent requests are made
  passport.deserializeUser(function (id, done) {
    Owner.findByPk(id)
      .then(function (owner) {
        done(null, owner);
        console.log("serialized");
      })
      .catch(function (err) {
        done(err, null);
      });
  });
}
*/

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Load User model
const Owner = require("../models/Owner");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      Owner.findOne({
        // email: email,
        where: {
          email: email,
        },
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Owner.findByPk(id)
      .then(function (user) {
        done(null, user);
        console.log("deserialized");
      })
      .catch(function (err) {
        done(err, null);
      });
  });
};

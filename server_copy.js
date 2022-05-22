// const sess = {
//   secret: process.env.SESS_SECRET,
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// const hbs = require("express-handlebars");
const helpers = require("./utils/helpers");
// const bcrypt = require("bcrypt");
const path = require("path");
// const routes = require("./controllers/");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const { Owner } = require("./models");
const hbs = exphbs.create({ helpers });

const app = express();

//Passport Config
require("./config/passport")(passport);

//Middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// app.engine("hbs", hbs({ extname: ".handlebars" }));
// app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESS_SECRET,
    cookie: {},
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const hbs = exphbs.create({ helpers });

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
// In order for persistent sessions to work, the authenticated user must be serialized to the session
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// ...and deserialized when subsequent requests are made
// passport.deserializeUser(function (id, done) {
//   Owner.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// Before authenticating requests, the strategy must be configured
// usernameField is 'email' on this site
// passport.use(
//   new LocalStrategy({ usernameField: "email" }, function (username, password, done) {
//     Owner.findOne({ email: username }, function (err, user) {
//       if (err) return done(err);
//       if (!user) return done(null, false, { message: "Incorrect username." });

//       bcrypt.compare(password, user.password, function (err, res) {
//         if (err) return done(err);
//         if (res === false) return done(null, false, { message: "Incorrect password." });

//         return done(null, user);
//       });
//       // if (!user.verifyPassword(password)) {
//       //   return done(null, false);
//       // }
//       // return done(null, user);
//     });
//   })
// );

// const isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/");
// }

// const isLoggedOut = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/dashboard')
// }

// turn on routes
// app.use(routes);
app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

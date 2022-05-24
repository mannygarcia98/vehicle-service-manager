const router = require("express").Router();
// const sequelize = require("../config/connection");
// const { Owner } = require("../models");
const { forwardAuthenticated } = require("../config/auth");

router.get("/", forwardAuthenticated, (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/dashboard");
  //   return;
  // }
  res.render("login");
});

router.get("/signup", forwardAuthenticated, (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/dashboard");
  //   return;
  // }
  res.render("signup");
});

// router.get("*", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/dashboard");
//     return;
//   }
//   res.render("login");
// });

module.exports = router;

const router = require("express").Router();
// const sequelize = require("../config/connection");
// const { Owner } = require("../models");

router.get("/", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/dashboard");
  //   return;
  // }
  res.render("login");
});

router.get("/signup", (req, res) => {
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

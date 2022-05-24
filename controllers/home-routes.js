const router = require("express").Router();
const { forwardAuthenticated } = require("../config/auth");

router.get("/", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/signup", forwardAuthenticated, (req, res) => {
  res.render("signup");
});

module.exports = router;

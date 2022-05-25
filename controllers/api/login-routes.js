const router = require("express").Router();
const res = require("express/lib/response");
const { Owner } = require("../../models");

const passport = require("passport");

// Signup Handle
router.post("/signup", (req, res) => {
  Owner.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      const message = "Email already exists";
      console.log("Email already exits");
      return;
      // res.render("signup", {
      //   // email: message,
      // });
    } else {
      Owner.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      }).then(() => {
        console.log("logged in");
        res.redirect("/");
      });
    }
  });
});

// Login Handle
router.post("/logins", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })(req, res, next);

  return res.status(200).json;
});

// Logout Handle
router.post("/logout", (req, res) => {
  req.logout();
  res.status(404).end();
});

router.get("/logins", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;

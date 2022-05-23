const router = require("express").Router();
const res = require("express/lib/response");
const { Owner } = require("../../models");
const withAuth = require("../../utils/auth");

const passport = require("passport");

// Signup Handle
router.post("/signup", (req, res) => {
  Owner.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  }).then(() => {
    console.log("logged in");
    res.redirect("/");
  });
});

// router.post('/logins', async (req, res) => {
//     try {
//         const dbOwnerData = await Owner.findOne({
//             where: {
//                 email: req.body.email,
//             },
//         });

//         if (!dbOwnerData) {
//             res.status(400).json({message: 'Incorrect email or password. Please try again.'});
//             return;
//         }

//         const validPassword = await dbOwnerData.checkPassword(req.body.password);

//         if (!validPassword) {
//             res.status(400).json({ message: 'Incorrect email or password. Please try again.'});
//             return;
//         }

//         passport.authenticate('local', { failureRedirect: '/logins' }),
//         function(req, res) {
//             res.redirect('/');
//         };

//         req.session.save(() => {
//             req.session.loggedIn = true;

//             res.status(200).json({ owner: dbOwnerData, message:'You are logged in!'});
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

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

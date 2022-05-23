//need to require this in routes
// const isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/");
// };

// const isLoggedOut = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/dashboard");
// };

const withAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = withAuth;

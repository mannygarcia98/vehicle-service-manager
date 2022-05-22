// const withAuth = (req, res, next) => {
//   if (!req.session.user_id) {
//     res.redirect("/api/login/logins");
//   } else {
//     next();
//   }
// };

// module.exports = withAuth;

const withAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = withAuth;

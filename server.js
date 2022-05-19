const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers/");
const helpers = require("./utils/helpers");
// passport modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { Owner } = require('./models')

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// In order for persistent sessions to work, the authenticated user must be serialized to the session
passport.serializeUser(function(owner, done) {
  done(null, Owner.owner_id);
});
// ...and deserialized when subsequent requests are made
passport.deserializeUser(function(id, done) {
  Owner.findById(id, function (err, owner) {
    done(err, owner);
  });
});

// Before authenticating requests, the strategy must be configured
passport.use(new LocalStrategy({
  // usernameField is 'email' on this site
  usernameField: 'email',
  // session support not necessary with passport installed
  session: false
},
  function(username, password, done) {
    Owner.findOne({ username: username }, function (err, owner) {
      if (err) { return done(err); }
      if (!owner) { return done(null, false); }
      if (!owner.verifyPassword(password)) { return done(null, false); }
      return done(null, owner);
    });
  }
));

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// turn on routes
app.use(routes);
app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

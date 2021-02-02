const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const googleStrategy = require("passport-google-oauth2").Strategy;
const githubStrategy = require("passport-github").Strategy;

exports.localPassport = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

exports.verfiyJwt = (req, res, next) => {
  const token = req.cookies?.UTOF;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ error: "fucking error mother fucker" });
      }
      req.user = user.id;

      next();
    });
  } else {
    res.status(200).json({ success: false });
  }
};
exports.googlePassport = passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "https://todo-mern-app-s.herokuapp.com/auth/google/loggedIn",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ username: profile.displayName }).then((user, err) => {
        if (err) return done(err);
        else if (user) {
          return done(null, user);
        } else {
          user = new User({ username: profile.displayName });
          user.firstname = profile.name.givenName;
          user.lastname = profile.name.familyName;

          user.image = profile.photos[0].value;
          user.save().then((user, err) => {
            return done(err, user);
          });
        }
      });
    }
  )
);
exports.githubPassport = passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "https://todo-mern-app-s.herokuapp.com/auth/github/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ username: profile.username }).then((user, err) => {
        if (err) return done(err);
        else if (user) {
          return done(null, user);
        } else {
          user = new User({ username: profile.username });
          if (profile.name) {
            let name = profile.name.split(" ").toString();
            user.firstname = name[0];
            user.lastname = name[name.length - 1];
          }
          user.image = profile.photos[0].value;
          user.save().then((user, err) => {
            return done(err, user);
          });
        }
      });
    }
  )
);

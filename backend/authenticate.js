const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const googleStrategy = require("passport-google-oauth2").Strategy;
const githubStrategy = require("passport-github").Strategy;

const config = require("./config");
exports.localPassport = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (payload) => {
  return jwt.sign(payload, config.secretKey, { expiresIn: "3d" });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new jwtStrategy(opts, (payload, done) => {
    User.findOne({ _id: payload._id }).then((user, err) => {
      return done(user, err);
    });
  })
);

exports.googlePassport = passport.use(
  new googleStrategy(
    {
      clientID: config.googleId,
      clientSecret: config.googleSecret,
      callbackURL: "http://localhost:3000/google/loggedIn",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ username: profile.username }).then((user, err) => {
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
      clientID: config.githubID,
      clientSecret: config.githubSecret,
      callbackURL: "http://localhost:8080/auth/github/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

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

exports.varifyUser = passport.authenticate("jwt", { session: false });

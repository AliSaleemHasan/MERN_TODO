const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("./config");
exports.localPassport = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(user.deserializeUser());

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

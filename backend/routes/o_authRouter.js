const authRouter = require("express").Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const authenticate = require("../authenticate");
authRouter.use(bodyParser.json());

authRouter.get("/auth/github", passport.authenticate("github"));

authRouter.get(
  "/github/loggedIn",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("http://localhost:3001");
  }
);

authRouter.get("/getuser", (req, res) => {
  let token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, token: token, user: req.user });
});

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/google/loggedIn",
  passport.authenticate("google"),
  (req, res, next) => {
    let token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: true, token: token, user: req.user });
  }
);

module.exports = authRouter;

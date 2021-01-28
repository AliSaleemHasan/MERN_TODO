const authRouter = require("express").Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const authenticate = require("../authenticate");
authRouter.use(bodyParser.json());

authRouter.get("/github", passport.authenticate("github"));

authRouter.get(
  "/github/redirect",
  passport.authenticate("github", {
    failureRedirect: "/auth/login/failed",
  }),
  (req, res) => {
    let token = authenticate.getToken({ id: req.user._id });
    res.cookie("UTOF", token, { httpOnly: true, sameSite: "lax" });
    res.redirect("http://localhost:3000");
  }
);

authRouter.get("/login/failed", (req, res, next) => {
  res.statusCode = 401;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: false,
    status: "faild to log in!",
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/google/loggedIn",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
  }),
  (req, res) => {
    let token = authenticate.getToken({ id: req.user._id });
    res.cookie("UTOF", token, { httpOnly: true, sameSite: "lax" });
    res.redirect("http://localhost:3000");
  }
);

module.exports = authRouter;

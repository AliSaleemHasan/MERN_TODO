const usersRouter = require("express").Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const authenticate = require("../authenticate");
const User = require("../models/users");
usersRouter.use(bodyParser.json());

usersRouter.get("/", (req, res) => {
  res.send("hello from  users router!!");
});

usersRouter.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: true, status: "Registration Error!" });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Error!" });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

usersRouter.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  function (req, res, next) {
    let token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      token: token,
      status: "you are successfuly logged in !",
    });
  },
  function (err, req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: false, status: "wrong username or password!!" });
  }
);
// usersRouter.post(
//   "/login",
//   passport.authenticate("local", { failWithError: true }),
//   (req, res, next) => {
//     let token = authenticate.getToken({ _id: req.user._id });
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.json({
//       success: true,
//       token: token,
//       status: "you are successfuly logged in !",
//     });
//   }
// );
module.exports = usersRouter;

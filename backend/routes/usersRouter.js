const usersRouter = require("express").Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const authenticate = require("../authenticate");
const User = require("../models/users");
usersRouter.use(bodyParser.json());
const Joi = require("joi");

//VALIDATION
const scheam = Joi.object({
  username: Joi.string().min(6).email().required(),
  password: Joi.string().min(8).required(),
  firstname: Joi.string().min(3).max(8),
  lastname: Joi.string().min(3).max(8),
});
usersRouter.get("/", (req, res) => {
  res.send("hello from  users router!!");
});

usersRouter.get("/user", authenticate.verfiyJwt, (req, res, next) => {
  console.log(req.user);
  User.findById(req.user)
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found !" });
      }
      res.status(200).json({ success: true, user: user });
    })
    .catch((err) => next(err));
});

usersRouter.post("/signup", (req, res, next) => {
  try {
    Joi.attempt(req.body, scheam);
  } catch (error) {
    return res.json({ success: false, status: error.message });
  }
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Registration Error!" });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: false, status: "Registration Error!" });
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
    let token = authenticate.getToken({ id: req.user._id });
    res.cookie("UTOF", token, { httpOnly: true, sameSite: "lax" });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      user: req.user,
      status: "you are successfuly logged in !",
    });
  },
  function (err, req, res, next) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: false,
      status: "wrong username or password!!",
    });
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

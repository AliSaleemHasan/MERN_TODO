require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//routes
const tasksRouter = require("./routes/tasksRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/o_authRouter");
const port = process.env.PORT || 8080;

const connect = mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
connect
  .then((db) => {
    console.log("Connected correctly to  DataBase");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.get("/", (req, res) => {
  res.send("Hello from server !!");
});
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.use((err, req, res, next) => {
  var output = {
    error: {
      name: err.name,
      message: err.message,
      text: err.toString(),
    },
  };
  var statusCode = err.status || 500;
  res.status(statusCode).json(output);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./frontend/build"));
}
app.listen(port, () => {
  console.log(`Connected Correctly at: http://localhost:${port}`);
});

const express = require("express");
const http = require("http");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const passport = require("passport");

//routes
const tasksRouter = require("./routes/tasksRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/o_authRouter");
const port = 8080;
const name = "localhost";

const connect = mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
connect.then((db) => {
  console.log("Connected correctly to  DataBase");
});

const app = express();
app.use(bodyParser.json());

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
app.listen(port, name, () => {
  console.log(`Connected Correctly at: http://localhost:${port}`);
});

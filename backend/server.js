const express = require("express");
const http = require("http");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");
const passport = require("passport");

//routes
const tasksRouter = require("./routes/tasksRouter");
const usersRouter = require("./routes/usersRouter");
const port = 3000;
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
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello from server !!");
});
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
const server = http.createServer(app);
server.listen(port, name, () => {
  console.log(`Connected Correctly at: http://localhost:3000`);
});

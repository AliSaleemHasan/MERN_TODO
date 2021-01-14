const express = require("express");
const http = require("http");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");

//routes
const tasksRouter = require("./routes/tasksRouter");

const port = 3000;
const name = "localhost";

const connect = mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then((db) => {
  console.log("Connected correctly to  DataBase");
});

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello from server !!");
});

app.use("/tasks", tasksRouter);

app.use((req, res, next) => {
  next(createError(404));
});

//handle erros
app.use((req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const server = http.createServer(app);
server.listen(port, name, () => {
  console.log(`Connected Correctly at: http://localhost:3000`);
});

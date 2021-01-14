const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
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

app.get("/", (req, res) => {
  res.send("Hello from server !!");
});

const server = http.createServer(app);
server.listen(port, name, () => {
  console.log(`Connected Correctly at: http://localhost:3000`);
});

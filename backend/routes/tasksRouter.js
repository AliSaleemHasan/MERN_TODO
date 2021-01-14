const tasksRouter = require("express").Router();
const bodyParser = require("body-parser");
const tasks = require("../models/tasks");

tasksRouter.use(bodyParser.json());

tasksRouter.route("/").get((req, res, next) => {
  res.send("hello from tasks router !!");
});

module.exports = tasksRouter;

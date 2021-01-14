const tasksRouter = require("express").Router();
const bodyParser = require("body-parser");
const { response } = require("express");
const tasks = require("../models/tasks");

tasksRouter.use(bodyParser.json());

tasksRouter
  .route("/")
  .get((req, res, next) => {
    tasks
      .find({})
      .then(
        (tasks) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ tasks: tasks });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    tasks
      .create(req.body)
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ task: task });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 400;
    res.contentType("Content-Type", "text/plain");
    res.end("Cannot do put operation on /tasks ");
  })
  .delete((req, res, next) => {
    tasks
      .remove({})
      .then(
        (response) => {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/json");
          res.json({ success: true });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = tasksRouter;

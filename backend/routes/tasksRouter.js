const tasksRouter = require("express").Router();
const bodyParser = require("body-parser");
const tasks = require("../models/tasks");

tasksRouter.use(bodyParser.json());

tasksRouter
  .route("/")
  .get((req, res, next) => {
    tasks
      .find()
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
      .deleteMany({})
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

tasksRouter
  .route("/:taskId")
  .get((req, res, next) => {
    tasks
      .findById(req.params.taskId)
      .then(
        (task) => {
          if (task) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ task: task });
          } else {
            let err = new Error(
              "task with taskId: " + req.params.taskId + "NOT FOUND!"
            );

            err.statusCode = 404;
            next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 400;
    res.end("cannot do post on task: " + req.params.taskId);
  })
  .put((req, res, next) => {
    tasks
      .findByIdAndUpdate(req.params.taskId, { $set: req.body }, { new: true })
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
  .delete((req, res, next) => {
    tasks
      .findByIdAndDelete(req.params.taskId)
      .then(
        (response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ response: response });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
module.exports = tasksRouter;

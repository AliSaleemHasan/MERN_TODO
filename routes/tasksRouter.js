const tasksRouter = require("express").Router();
const bodyParser = require("body-parser");
const tasks = require("../models/tasks");
const authenticate = require("../authenticate");
tasksRouter.use(bodyParser.json());

tasksRouter.post("/search", authenticate.verfiyJwt, (req, res, next) => {
  tasks
    .find(
      { author: req.user, $text: { $search: req.body.query } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .then((tasks) => {
      if (!tasks) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.json({ success: false });
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: true, tasks: tasks });
    })
    .catch((err) => next(err));
});
tasksRouter
  .route("/")
  .get(authenticate.verfiyJwt, (req, res, next) => {
    tasks
      .find({ author: req.user })
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
  .post(authenticate.verfiyJwt, (req, res, next) => {
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
  .put(authenticate.verfiyJwt, (req, res, next) => {
    res.statusCode = 400;
    res.contentType("Content-Type", "text/plain");
    res.end("Cannot do put operation on /tasks ");
  })
  .delete(authenticate.verfiyJwt, (req, res, next) => {
    tasks
      .deleteMany({ author: req.user })
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
  .get(authenticate.verfiyJwt, (req, res, next) => {
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
  .post(authenticate.verfiyJwt, (req, res, next) => {
    res.statusCode = 400;
    res.end("cannot do post on task: " + req.params.taskId);
  })
  .put(authenticate.verfiyJwt, (req, res, next) => {
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
  .delete(authenticate.verfiyJwt, (req, res, next) => {
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

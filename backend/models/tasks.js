const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasks = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", tasks);

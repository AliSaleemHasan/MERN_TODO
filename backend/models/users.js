const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstname: {
    type: String,
    default: " ",
  },
  lastname: {
    type: String,
    default: " ",
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("user", users);

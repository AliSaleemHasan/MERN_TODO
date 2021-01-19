const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const user = new Schema({
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

user.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", user);

const mongoose = require("mongoose");
const password = require("../lib/password");
const postSave = require("../lib/mongoose/post.save");
const EmptyKeyError = require("../lib/errors/EmptyKeyError");
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    set: password
  },
  username: {
    type: String,
    required: true
  }
});

userSchema.methods.verifyPassword = function(pw) {
  return password(pw) === this.password;
};
userSchema.pre("validate", function(next) {
  if (!this.id || !this.password || !this.username) {
    throw new EmptyKeyError();
  }
  next();
});

userSchema.post("save", postSave);
module.exports = mongoose.model("user", userSchema);

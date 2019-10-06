const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("file", fileSchema);

const UniqueError = require("../errors/UniqueError");

function postSave(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new UniqueError());
  } else {
    next(error);
  }
}

module.exports = postSave;

const jwt = require("jsonwebtoken");

const KEY = process.env.SECRET_KEY || "default_secret_key";

exports.sign = function(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, KEY, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

exports.verify = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, KEY, (err, data) => {
      if (err) {
        if (
          err.name === "TokenExpiredError" ||
          err.name === "JsonWebTokenError" ||
          err.name === "NotBeforeError"
        ) {
          err.expose = true;
          err.status = 403;
        }
        return reject(err);
      }
      resolve(data);
    });
  });
};

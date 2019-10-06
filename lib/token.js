const jwt = require("jsonwebtoken");

const KEY = process.env.SECRET_KEY || "default_secret_key";

exports.sign = function(payload, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, KEY, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

exports.verify = function(token, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, KEY, options, (err, data) => {
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

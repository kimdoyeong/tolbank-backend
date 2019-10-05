const crypto = require("crypto");

const SALT = process.env.SALT || "default_salt";
function password(raw) {
  return crypto.pbkdf2Sync(raw, SALT, 100000, 64, "sha512").toString("base64");
}

module.exports = password;

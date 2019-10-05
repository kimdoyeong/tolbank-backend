const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const url =
  process.env.DB_URL ||
  (process.env.NODE_ENV === "production"
    ? "mongodb://localhost/tolbank"
    : "mongodb://localhost/tolbank_dev");
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App on localhost:${PORT}`);
  });
});

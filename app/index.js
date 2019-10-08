const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const app = new Koa();

const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(bodyParser());
app.use(logger());
app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404, "Page not found");
    }

    if (
      ctx.response.headers["content-type"] &&
      ctx.response.headers["content-type"].match(/^application\/json/)
    ) {
      ctx.body.success = "true";
    }
  } catch (e) {
    console.log(e.stack);
    ctx.status = e.status || 500;
    ctx.body = {
      success: false,
      status: ctx.status,
      message:
        e.expose && e.message
          ? e.message
          : "An Error is occurred. Please Try Again."
    };
  }
});
fs.readdirSync(path.join(__dirname, "./routes")).forEach(file => {
  if (!fs.statSync(path.join(__dirname, `/routes/${file}`)).isFile()) return;

  const router = require(`./routes/${file}`);
  app.use(router.routes()).use(router.allowedMethods({ throw: true }));
});
module.exports = app;

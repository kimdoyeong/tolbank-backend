const Router = require("@koa/router");
const file = require("../../lib/file");
const fs = require("fs");
const { auth } = require("../../lib/middlewares/auth");
const router = new Router({
  prefix: "/view"
});

router.get("*", async ctx => {
  const path = await file.getFilePath(ctx.query.token);
  if (!path) ctx.throw(404, "File not found");

  ctx.length = fs.statSync(path).size - 1;
  ctx.body = fs.createReadStream(path);
});
router.post("*/token", auth, async ctx => {
  const token = await file.getToken(ctx.state.user, ctx.params[0]);
  if (!token) ctx.throw(404, "File not found");
  ctx.body = {
    token
  };
});

module.exports = router;

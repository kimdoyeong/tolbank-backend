const Router = require("@koa/router");
const { auth } = require("../../lib/middlewares/auth");
const file = require("../../lib/file");

const router = new Router({
  prefix: "/file"
});

router.get("*", auth, async ctx => {
  const path = ctx.params[0];
  const data = await file.getFiles(ctx.state.user._id, ctx.state.user.id, path);
  ctx.status = 200;
  ctx.body = {
    data
  };
});
module.exports = router;

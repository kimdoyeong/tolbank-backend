const Router = require("@koa/router");
const User = require("../../model/User");
const router = new Router({
  prefix: "/user"
});

router.post("/", async ctx => {
  const user = new User(ctx.request.body);
  await user.save();
  ctx.body = {
    id: user._id
  };
});
module.exports = router;

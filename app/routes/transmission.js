const Router = require("@koa/router");
const router = new Router({
  prefix: "/transmission"
});

const transmission = require("../../lib/transmission");

router.get("/list", async ctx => {
  ctx.body = {
    data: await transmission.active()
  };
});
module.exports = router;

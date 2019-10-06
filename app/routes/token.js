const Router = require("@koa/router");
const User = require("../../model/User");
const token = require("../../lib/token");
const router = new Router({
  prefix: "/token"
});

router.post("/", async ctx => {
  const { id, password } = ctx.request.body;

  const user = await User.findOne({
    id
  });
  if (!user || !user.verifyPassword(password)) {
    return ctx.throw(404, "아이디가 없거나 비밀번호가 다릅니다.");
  }

  const { username, _id } = user;
  const data = { username, id, _id };
  const _token = await token.sign(data);

  ctx.status = 201;
  ctx.body = {
    token: _token,
    data
  };
});

module.exports = router;

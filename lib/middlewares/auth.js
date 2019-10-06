const User = require("../../model/User");
const token = require("../token");
exports.auth = async (ctx, next) => {
  if (!ctx.headers["x-access-token"]) {
    ctx.throw(400, "x-access-token 헤더가 필요합니다.");
  }
  const { _id, id, username } = await token.verify(
    ctx.headers["x-access-token"]
  );

  ctx.state.user = { _id, id, username };
  await next();
};

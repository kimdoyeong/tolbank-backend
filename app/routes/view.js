const Router = require("@koa/router");
const file = require("../../lib/file");
const { auth } = require("../../lib/middlewares/auth");
const fs = require("fs");
const router = new Router({
  prefix: "/view"
});

router.get("*", async ctx => {
  const o = await file.getFilePath(ctx.query.token);
  if (o === null) ctx.throw(404, "File not found");

  const { headers } = ctx;

  const length = fs.statSync(o).size;

  ctx.type = o.replace(/.+\.(.+?)$/, "$1");
  ctx.set("Accept-Ranges", "bytes");
  if (headers.range) {
    const range = headers.range.replace(/^bytes=/, "");
    let [start, end] = range.split("-").map(v => parseInt(v));
    if (!end) {
      end = length - 1;
    }
    const stream = fs.createReadStream(o, { start, end });
    ctx.length = end - start + 1;
    ctx.set("Content-Range", `bytes ${start}-${end}/${length}`);
    ctx.status = 206;
    ctx.body = stream;
  } else {
    ctx.length = length + 1;
    ctx.status = 200;
    ctx.set("Content-Range", `bytes 0-${length - 1}/${length}`);
    ctx.body = fs.createReadStream(o);
  }
});
router.post("*/token", auth, async ctx => {
  const token = await file.getToken(ctx.state.user, ctx.params[0]);
  if (!token) ctx.throw(404, "File not found");
  ctx.body = {
    token
  };
});

module.exports = router;

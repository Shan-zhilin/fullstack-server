const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koajwt = require("koa-jwt");
const router = require("./routes/index.js");
const { SIGNKEY } = require("./globals");
const jwtUtil = require("./utils/jwtutils");
const app = new Koa();

// 使用ctx.body解析中间件
app.use(bodyParser());

/* 
	校验前端传过来的token，查看是否已经过期，如果过期则需要重新登录
*/
app.use(async (ctx, next) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(" ");
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1]; //token部分
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await jwtUtil.verifysync(token, SIGNKEY);
        } catch (error) {
			// 此项目未使用后端token，所以不许在此重新生成token
          //token过期 生成新的token
          //   const newToken = getToken(user);
          //将新token放入Authorization中返回给前端
          //   ctx.res.setHeader("Authorization", newToken);
        }
      }
    }
  }
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = "user is not logged in or the login information has expired\n";
    } else {
      throw err;
    }
  });
});
// 注意：放在路由前面 校验白名单 登录和注册接口不需要校验
app.use(
  koajwt({
    secret: SIGNKEY,
  }).unless({
    // 配置白名单
    path: [/\/register/, /\/login/],
  })
);

// 路由映射
app.use(router.routes(), router.allowedMethods());
app.listen(3000, () => {
  console.log("server runing at http://localhost:3000");
});

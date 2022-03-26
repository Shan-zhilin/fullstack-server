const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/index.js');
const app = new Koa();

// 使用ctx.body解析中间件
app.use(bodyParser())
// 路由映射
app.use(router.routes())
app.listen(3000, () => {
	console.log('server runing at http://localhostL:3000');
});

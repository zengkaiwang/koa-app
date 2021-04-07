const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
// const router = require('koa-router')

app.use(bodyParser());  // 解析request的body

// 给路由加个前缀
const Router = require('koa-router')
const router = new Router({
	prefix: '/api'
})

router.get('/', async (ctx, next) => {
	// todo
  ctx.body = 'hello world111'
})

app.use(router.routes());

// 在端口8081监听:
app.listen(5000, () => {
  console.log(`serve start on 5000`)
});

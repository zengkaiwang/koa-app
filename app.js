const Koa = require('koa');
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    // todo
});

app.use(async (ctx, next) => {
    await next();
    // todo
    ctx.body = 'hello world'
});

// 在端口8081监听:
app.listen(5000, () => {
  console.log(`serve start on 5000`)
});

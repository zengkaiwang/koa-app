
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

import corsConfigs from './configs/cors'

import users from './routes/user'
import demo from './routes/demo'

const app = new Koa();

// error handler
onerror(app)

// middlewares
// 解析request的body
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 处理跨域的配置
app.use(cors(corsConfigs));

// logger 自定义中间件
const loggerAsync = require('./middlewares/logger-async')
app.use(loggerAsync())

// logger 自定义中间件-和loggerAsync功能一样
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 连接数据库
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1/testDB", { useNewUrlParser: true,  useUnifiedTopology: true })

// 载入路由
app.use(users.routes(), users.allowedMethods())
app.use(demo.routes(), demo.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 在端口8081监听:
// app.listen(5000, () => {
//   console.log(`serve start on 5000`)
// });

module.exports = app

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')

import corsConfigs from './configs/cors'

import users from './routes/user'
import demo from './routes/demo'

const app = new Koa();

// 连接数据库
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1/testDB")

// 处理跨域的配置
app.use(cors(corsConfigs));

// logger 中间件
const loggerAsync = require('./middlewares/logger-async')
app.use(loggerAsync())

// 解析request的body
app.use(bodyParser());  

// 载入路由
app.use(users.routes(), users.allowedMethods())
app.use(demo.routes(), demo.allowedMethods())

// 在端口8081监听:
app.listen(5000, () => {
  console.log(`serve start on 5000`)
});

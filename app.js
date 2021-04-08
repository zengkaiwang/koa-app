const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
import corsConfigs from './configs/cors'

const app = new Koa();
// const router = require('koa-router')

// 处理跨域的配置
app.use(cors(corsConfigs));

// logger 中间件
const loggerAsync = require('./middleware/logger-async')
app.use(loggerAsync())


app.use(bodyParser());  // 解析request的body

// 给路由加个前缀
const Router = require('koa-router')
const router = new Router({
	prefix: '/api'
})

const mongoose = require('mongoose')
const db = mongoose.connect("mongodb://localhost/testDB")

// 账户的数据库模型
var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
var User = mongoose.model('User',UserSchema);

// 新增数据
var user = {
  username: 'ydj',
  password: '123123',
  email: ''
}
var newUser = new User(user);
newUser.save();

router.get('/', async (ctx, next) => {
	let val = null
	const data = await User.findOne({username: 'ydj'})
	console.log('data', data)
	const result = {
		code:200,
		response: data,
		ts: 12345
	}
	ctx.response.body = result
	return result
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

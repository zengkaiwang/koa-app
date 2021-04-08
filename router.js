
import Router from 'koa-router'
const User = require('./models/user')
const router = new Router

router.prefix('/api')

// 查询
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

// 新增
router.post('/add', async (ctx, next) => {
  var newUser = new User({
    username: 'ydj',
    password: '123123',
    email: ''
  });
  newUser.save();
  ctx.response.body = newUser
})

router
    .get('/goods/find', async ctx => {/* ... */})
    .post('/goods/add', async ctx => {/* ... */})
    .post('/goods/update', async ctx  => {/* ... */})
    .post('/goods/remove', async ctx => {/* ... */})

export default router


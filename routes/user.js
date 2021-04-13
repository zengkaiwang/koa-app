
import Router from 'koa-router'
const router = new Router

const User = require('../models/user')

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

export default router


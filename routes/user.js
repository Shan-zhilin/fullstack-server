const User = require('../models/user')
const Router = require('koa-router')
const router = new Router()

router.post('/login',async (ctx) => {
    const data = ctx.request.body;
    console.log(data)
    const result = await User.login(data.username);
    if (result != null) {
        const {
            username,
            password
        } = result.dataValues;
        
        if (username === data.username && password === data.password) {
            ctx.response.body = {
                value: result.dataValues,
                message: '',
                success: true
            }
        } else if (username != data.username ) {
            ctx.response.body = {
                message: '用户名错误',
                success: false
            }
        }else if (password != data.password) {
            ctx.response.body = {
                message: '密码错误',
                success: false
            }
        }
    }else {
        ctx.response.body = {
          success: false,
          message: '用户不存在！' // 如果用户不存在返回用户不存在
        }
      }
})

module.exports = router
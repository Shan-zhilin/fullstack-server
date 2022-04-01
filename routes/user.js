const User = require('../models/user')
const Router = require('koa-router')
const jwtUtil = require('../utils/jwtutils')
const router = new Router()
const {SIGNKEY} = require('../globals')

router.post('/login',async (ctx) => {
    const data = ctx.request.body;
    const result = await User.login({
        username:data.username,
        // password:data.password,
        // type: data.type
    });

    if (result != null) {
        const {
            username,
            password,
            type
        } = result.dataValues;

        if (username === data.username && password === data.password && type == data.type) {
            // 生成token返回给前端
            const jwt_token = jwtUtil.sign({
                id:result.dataValues.id,
                username:result.dataValues.username,
                type:result.dataValues.type
            },SIGNKEY,60)
            
            ctx.response.body = {
                value: result.dataValues,
                message: '',
                jwt_token,
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
        }else if (type != data.type) {
            ctx.response.body = {
                message: '用户类型错误',
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

router.get('/users/getUserDataByToken',async (ctx) => {
    const {token} = ctx.request.query
    const result = await User.getUserDataByToken({token})
    if (result.success) {
        ctx.response.body = {
            success:true,
            message:'获取成功',
            value:result.msg
        }
    }else {
        ctx.status = 403
        ctx.response.body = {
            success:false,
            message:'会话过期'
        }
    }
})

router.get('/users/getUsersByTypePage',async (ctx) => {
    const {type,pageNum,currPage} = ctx.request.query
    const {count,result} = await User.getUsersByTypePage({type,pageNum,currPage})

    if (result) {
        ctx.response.body = {
            success:true,
            message:'查询成功',
            value: result,
            count
        }
    }else {
        ctx.response.body = {
            success:false,
            message:'查询失败,请确认查询条件'
        }
    }
   
})

module.exports = router
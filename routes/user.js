const User = require('../models/user')
const Router = require('koa-router')
const jwtUtil = require('../utils/jwtutils')
const router = new Router()
const {SIGNKEY} = require('../globals')

// 登录注册
router.post('/login',async (ctx) => {
    const data = ctx.request.body;
    const result = await User.login({
        username:data.username,
        password:data.password,
        type: data.type
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
                type:result.dataValues.type,
                class: result.dataValues.classes || ''
            },SIGNKEY,'3h')
            
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

// 解析前端token
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
        ctx.status = 401
        ctx.response.body = {
            success:false,
            message:'会话过期'
        }
    }
})

// 获取用户列表
router.get('/users/getUsersByTypePage',async (ctx) => {
    const {type,selectType,inputValue,pageNum,currPage} = ctx.request.query
    const queryInfo = {
        type: Number(type)
      }
      if (inputValue !== '') {
        queryInfo[selectType] = inputValue
      }
    const {count,result} = await User.getUsersByTypePage({queryInfo,pageNum,currPage})
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

// 删除用户
router.get('/users/delUserdata',async (ctx) => {
    const {id,type} = ctx.request.query
    const result = await User.deleteUser({id,type})
    if (result) {
        ctx.response.body = {
            success: true,
            message: '删除成功'
        }
    }else {
        ctx.response.body = {
            success: false,
            message: '删除失败'
        }
    }
})

// 修改用户信息
router.post('/users/upUserdata',async (ctx) => {
    const {info} = ctx.request.body
    const result = await User.updateUserInfo({info: JSON.parse(info)})
    if (result) {
        ctx.response.body = {
            success: true,
            message: '修改成功'
        }
    }else {
        ctx.response.body = {
            success: false,
            message: '修改失败'
        }  
    }
})

// 添加用户
router.post('/users/addUserdata',async (ctx) => {
    const {info} = ctx.request.body
    const result = await User.addUser(JSON.parse(info))
    if (result === 'exit') {
        ctx.response.body = {
            success: false,
            message: '用户已存在'
        }
    }else {
        ctx.response.body = {
            success: true,
            message: '添加成功'
        }
    }
})
module.exports = router
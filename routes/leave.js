const Leave = require('../models/leave');
const Router = require('koa-router')
const router = new Router()

/* 添加一条申请 */
router.post('/leave/add',async (ctx) => {
    const {u_id,reason,leavetype,starttime,endtime,status,classes,username} = ctx.request.body
    const result = await Leave.addleave({u_id,reason,leavetype,starttime,endtime,status,classes,username})

    if (result.dataValues) {
        ctx.response.body = {
            success: true,
            message: '申请成功等待审核'
        }
    }else {
        ctx.response.body = {
            success: false,
            message: '申请失败'
        }
    }
})

/* 请假申请查询 */
router.post('/leave/getAllLeave',async (ctx) => {
    const result = await Leave.getAllLeave(ctx.request.body)
    console.log(result)
})
module.exports = router
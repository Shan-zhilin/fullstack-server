const Leave = require('../models/leave');
const Router = require('koa-router')
const router = new Router()

/* 添加一条申请 */
router.post('/leave/add', async (ctx) => {
    const { c_id, u_id, reason, leavetype, starttime, endtime, status, classes, username } = ctx.request.body
    const result = await Leave.addleave({ c_id, u_id, reason, leavetype, starttime, endtime, status, classes, username })

    if (result.dataValues) {
        ctx.response.body = {
            success: true,
            message: '申请成功等待审核'
        }
    } else {
        ctx.response.body = {
            success: false,
            message: '申请失败'
        }
    }
})

/* 请假申请查询 */
router.post('/leave/getAllLeave', async (ctx) => {
    const { result, count } = await Leave.getAllLeave(ctx.request.body)

    if (result.length > 0) {
        ctx.response.body = {
            success: true,
            message: '查询成功',
            value: result,
            count
        }
    } else {
        ctx.response.body = {
            success: false,
            message: '查询失败'
        }
    }
})

// 审核状态
router.get('/leave/update', async (ctx) => {
    const { l_id, status } = ctx.request.query
    const result = await Leave.updateApply({ l_id, status })

    if (result) {
        ctx.response.body = {
            message: '已审核',
            success: true
        }
    }else {
        ctx.response.body = {
            message: '审核失败',
            success: false
        }
    }
})
module.exports = router
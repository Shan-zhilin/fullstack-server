const Healthy = require('../models/healthy')
const Router = require('koa-router')
const router = new Router()

router.post('/healthy/create', async (ctx) => {
    const { u_id, temperature, hot, goheighrisk, isheighrisk, touchheighrisk, leaveout, hesuan, masknum, kills, username, classes, gohospital } = ctx.request.body
    const result = await Healthy.createHealthyApply({ u_id, username, class: classes, temperature: Number(temperature), hot, goheighrisk, isheighrisk, touchheighrisk, leaveout, hesuan, masknum: Number(masknum), kills, gohospital })

    if (result.dataValues) {
        ctx.response.body = {
            success: true,
            message: '添加成功',
        }
    } else {
        ctx.response.body = {
            success: false,
            message: '添加失败',
        }
    }

})

router.get('/healthy/getnum', async (ctx) => {
    const { isTest, isWrite, isHeigh } = await Healthy.getTodayHealthyApplyNum()
    ctx.response.body = {
        success: true,
        value: { isTest, isWrite, isHeigh }
    }
})
module.exports = router
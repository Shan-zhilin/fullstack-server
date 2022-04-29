const Healthy = require('../models/healthy')
const Router = require('koa-router')
const router = new Router()

router.post('/healthy/create', async (ctx) => {
    const { u_id, temperature, hot, goheighrisk, isheighrisk, touchheighrisk, leaveout, hesuan, masknum, kills, username, classes, gohospital } = ctx.request.body
    const { result } = await Healthy.createHealthyApply({ u_id, temperature, hot, goheighrisk, isheighrisk, touchheighrisk, leaveout, hesuan, masknum, kills, username, class: classes, gohospital })
    
})
module.exports = router
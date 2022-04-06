const Router = require('koa-router')
const Notice = require('../models/notice')
const router = new Router()

router.get('/notice/getAllNotice',async (ctx) => {
    const {title,startTime,endTime,pageNum,currPage} = ctx.request.query
    const {data,count} = await Notice.getAllNotice({title,startTime,endTime,pageNum,currPage})
    if (data) {
        ctx.response.body = {
            success:true,
            message:'查询成功',
            value: data,
            count: count
        }
    }

})

module.exports = router
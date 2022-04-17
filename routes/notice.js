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

// 删除通知
router.get('/notice/deleteNotice',async (ctx) => {
    const {n_id} = ctx.request.query
    const result = await Notice.deleteNotice({n_id})
    if (result) {
        ctx.response.body = {
            message:'删除成功',
            success:true
        }
    }else {
        ctx.response.body = {
            message:'删除失败',
            success:false
        }
    }
    
})
router.get('/notice/add',async (ctx) => {
    const result = await Notice.createNotice()
    if (result) {
        ctx.response.body = {
            message:'删除成功',
            success:true
        }
    }else {
        ctx.response.body = {
            message:'删除失败',
            success:false
        }
    }
    
})
module.exports = router
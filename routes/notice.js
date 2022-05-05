const Router = require('koa-router')
const Notice = require('../models/notice')
const router = new Router()

router.get('/notice/getAllNotice',async (ctx) => {
    const {title,startTime,endTime,pageNum,currPage,classes} = ctx.request.query
    const {data,count} = await Notice.getAllNotice({title,startTime,endTime,pageNum,currPage,classes})
    if (data) {
        ctx.response.body = {
            success:true,
            message:'查询成功',
            value: data,
            total: count
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

// 添加通知
router.post('/notice/add',async (ctx) => {
    const {title,classes,content,adjunct} = ctx.request.body
    const result = await Notice.createNotice({title,classes,content,adjunct})
    if (result) {
        ctx.response.body = {
            message:'发布成功',
            success:true
        }
    }else {
        ctx.response.body = {
            message:'发布失败,请重试',
            success:false
        }
    }
    
})

// 获取阅读人数
router.get('/notice/getReadNum',async (ctx) => {
    const {u_id} = ctx.request.query
    const result = await Notice.getReadNum({u_id})
    if (result) {
        ctx.response.body = {
            message:'查询成功',
            success:true,
            value: result
        }
    }
})

// 阅读通知
router.get('/notice/read',async (ctx) => {
    const {u_id,n_id} = ctx.request.query

    const result = await Notice.createRead({u_id,n_id})
    if (result) {
        ctx.response.body = {
            message:'阅读成功',
            success:true,
        }
    }else {
        ctx.response.body = {
            message:'阅读失败',
            success: false,
        }
    }
})

module.exports = router
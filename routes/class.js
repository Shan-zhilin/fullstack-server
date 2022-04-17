const Class = require('../models/class');
const Router = require('koa-router')
const router = new Router()

// 查询班级信息
router.get('/class/getclsses', async (ctx) => {
    const {
        pageNum,
        currPage,
        queryInfo
    } = ctx.request.query;
    
    const {count,result} = await Class.getClassInfo({
        queryInfo,
        pageNum,
        currPage
    });
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

// 删除班级
router.post('/class/deleteClass', async (ctx) => {
    const {c_id,classname} = ctx.request.body;
    const result = await Class.deleteClass({c_id,classname});
    if (result) {
        ctx.response.body = {
            success: true,
            message: '删除成功',
        }
    }else {
        ctx.response.body = {
            success: false,
            message: '删除失败'
        }
    }
})


module.exports = router
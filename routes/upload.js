const router = require('koa-router')();
const fs = require('fs')
const { generateMixed } = require('../utils/tools')

// 抽离出来公告上传方法
async function uploadNotice(ctx,position) {
    const { file } = ctx.request.files;
    const reader = fs.createReadStream(file.path);    // 创建可读流
    const ext = file.name.split('.').pop();        // 获取上传文件扩展名
    const basename = generateMixed(15);  // 随机生成图片名称
    const upStream = fs.createWriteStream(`public/${position}/${basename}.${ext}`); // 创建可写流

    try {
        reader.pipe(upStream);    // 可读流通过管道写入可写流
        return ({
            success: true,
            message: '上传成功',
            url: `${ctx.origin}/${position}/${basename}.${ext}`
        })

    } catch (error) {
        return ({
            success: false,
            message: '上传失败',
        })
    }
}

// 上传图片
router.post('/upload/image', async (ctx) => {
        const result = await uploadNotice(ctx,'uploads/images');
        ctx.response.body = result
})

// 上传非图片类型文件
router.post('/upload/file', async (ctx) => {
        const result = await uploadNotice(ctx,'uploads/files');
        ctx.response.body = result
})



module.exports = router
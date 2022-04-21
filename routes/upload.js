const router = require('koa-router')();
const fs = require('fs')
const {generateMixed} = require('../utils/tools')

router.post('/upload', async (ctx) => {
    const { file } = ctx.request.files;
    const reader = fs.createReadStream(file.path);    // 创建可读流
    const ext = file.name.split('.').pop();        // 获取上传文件扩展名
    const basename = generateMixed(15);  // 随机生成图片名称
    const upStream = fs.createWriteStream(`public/uploads/${basename}.${ext}`); // 创建可写流
   
    try {
        reader.pipe(upStream);    // 可读流通过管道写入可写流
        ctx.response.body = {
            success:true,
            message: '上传成功',
            url: `${ctx.origin}/uploads/${basename}.${ext}`
        }

    }catch(error) {
        ctx.response.body = { 
            success: false,
            message: '上传失败',  
        }
    }
})

module.exports = router
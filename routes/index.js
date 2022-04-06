const Router = require('koa-router')
const user = require('./user')
const notice = require('./notice')
const router = new Router()

router.use(user.routes())
router.use(notice.routes())

module.exports = router
const Router = require('koa-router')
const user = require('./user')
const notice = require('./notice')
const classes  = require('./class')
const upload = require('./upload')
const healthy = require('./healthy')
const router = new Router()

router.use(user.routes())
router.use(notice.routes())
router.use(classes.routes())
router.use(upload.routes())
router.use(healthy.routes())

module.exports = router
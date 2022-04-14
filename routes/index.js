const Router = require('koa-router')
const user = require('./user')
const notice = require('./notice')
const classes  = require('./class')
const router = new Router()

router.use(user.routes())
router.use(notice.routes())
router.use(classes.routes())

module.exports = router
var router = require('express').Router()
const { authenticate } = require('../middleware/authenticate')
const Multer = require('../middleware/upload')

router.use('/users', require('./userRoutes'))
router.use('/users/forgetpassword', require('./forgetPasswordRoutes'))
router.use('/blogs/categories', require('./categoryRoutes'))
router.use('/blogs', require('./blogRoutes'))
router.use('/users/login', require('./loginRoutes'))
router.use('/media', Multer.upload.single('path'), require('./mediaRoutes.js'))
router.use('/blogs/tags', authenticate, require('./tagRoutes'))
router.use(
  '/users/resetpassword',
  authenticate,
  require('./resetPasswordRoutes'),
)

module.exports = router

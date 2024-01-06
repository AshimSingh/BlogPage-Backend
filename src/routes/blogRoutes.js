const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogControllers')
const { authenticate } = require('../middleware/authenticate')
const commentController = require('../controllers/commentsControllers')

router
  .route('/')
  .get(blogController.getAllBlog)
  .post(authenticate, blogController.createBlog)

router
  .route('/authenticated_user_blogs')
  .get(authenticate, blogController.getAllBlog)

router.route('/comments/:slug').get(commentController.getAllComments)

router
  .route('/:slug')
  .get(blogController.getBlog)
  .patch(authenticate, blogController.updateBlog)
  .delete(authenticate, blogController.deleteBlog)

module.exports = router

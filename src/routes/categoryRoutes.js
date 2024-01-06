const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authenticate')
const categoriesController = require('../controllers/categoriesController')
router
  .route('/')
  .get(categoriesController.getAllCategories)
  .post(authenticate, categoriesController.createCategories)

router
  .route('/:slug')
  .get(categoriesController.getCategory)
  .patch(authenticate, categoriesController.updateCategories)
  .delete(authenticate, categoriesController.deleteCategories)

module.exports = router

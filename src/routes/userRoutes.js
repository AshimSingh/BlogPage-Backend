const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authenticate } = require('../middleware/authenticate')
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser)

router
  .route('/:slug')
  .get(userController.getUser)
  // .get(authenticate, userController.getUser)
  .patch(authenticate, userController.updateUser)
  .delete(authenticate, userController.deleteUser)
module.exports = router

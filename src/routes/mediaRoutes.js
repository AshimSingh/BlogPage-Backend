const express = require('express')
const router = express.Router()
const mediaController = require('../controllers/mediaController')
const multerShapMiddleware = require('../middleware/upload')

router
  .route('/')
  .get(mediaController.getAllMedia)
  .post(multerShapMiddleware.shapUpload, mediaController.createMedia)

router
  .route('/:mediaId')
  .get(mediaController.getMedia)
  .patch(multerShapMiddleware.shapUpload, mediaController.updateMedia)
  .delete(mediaController.deleteMedia)

module.exports = router

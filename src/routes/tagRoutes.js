const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')
router.route('/')
    .get(tagController.getTags)
    .post(tagController.createTags)
    .patch(tagController.updateTags)
    .delete(tagController.deleteTags)

module.exports = router
const express = require('express')
const router = express.Router()
const resetPasswordController = require('../controllers/resetPasswordController')

router.route('/')
    .post(resetPasswordController.resetPassword)

module.exports = router
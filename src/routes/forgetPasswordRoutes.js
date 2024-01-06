const express = require('express')
const router = express.Router()
const {authenticate} = require('../middleware/authenticate')
const forgetpassController = require('../controllers/forgetpassController')

router.route('/',authenticate)
    .post(forgetpassController.forgetPassController)

module.exports = router
const User = require('../models/user')
const validateEmail = require('../middleware/validator/forgetPasswordValidator')
const { errorResponse, successResponse } = require('../helper/response')
const { forgetPassPayload } = require('../helper/emailPayload')
const resetUrlGenerator = require('../helper/resetUrlGenerator')
const { sendEmail } = require('../helper/sendEmail')

const forgetPassController = async (req, res, next) => {
  try {
    const value = await validateEmail(req.body)
    var { email } = req.body
    var user = await User.findOne({ email }).exec()
    if (!user) {
      return errorResponse(res, 201, 'User not found')
    } else {
      const reset_url = await resetUrlGenerator(req, email)
      var payload = forgetPassPayload(user.email, reset_url, user.name)
      sendEmail(payload)
      successResponse(res, 200, `Email Sent to ${user.email}`)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  forgetPassController,
}

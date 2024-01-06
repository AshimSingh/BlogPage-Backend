const User = require('../models/user')
const { errorResponse, successResponse } = require('../helper/response')
const bcrypt = require('bcrypt')

const resetPassword = async (req, res, next) => {
  try {
    //validation

    const { password, userId } = req.body

    const user = await User.findById(userId)
    if (user) {
      var hashedPwd = await bcrypt.hash(password, 10)
      user.password = hashedPwd
      const result = await user.save()
      console.log(user)
      if (result) {
        return successResponse(res, 200, 'Password changed ')
      } else {
        return errorResponse(res, 401, 'Cannot set Password')
      }
    } else {
      return errorResponse(res, 401, 'User Not found')
    }
  } catch (err) {
    next(err)
  }
}
module.exports = { resetPassword }

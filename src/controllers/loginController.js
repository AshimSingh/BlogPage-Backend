const { validateLogin } = require('../middleware/validator/userValidator')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { successResponse, errorResponse } = require('../helper/response')

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const value = await validateLogin(req.body)
    var userExists = await User.findOne({ email })
    if (userExists) {
      const isMatch = await bcrypt.compare(password, userExists.password)
      if (!isMatch) {
        return errorResponse(res, 401, 'Invalid Credintials')
      } else {
        const token = await userExists.generateAuthToken()
        res.cookie('jwtoken', token, {
          expires: new Date(Date.now() + 259200200),
          httpOnly: true,
        })
        // Using object destructuring to create a new object without the "success" property

        userExists = { ...userExists?._doc, token }
        delete userExists.password
        return successResponse(res, 200, 'Login Successfully', userExists)
      }
    } else {
      return errorResponse(res, 401, 'Invalid Credintials')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = loginUser

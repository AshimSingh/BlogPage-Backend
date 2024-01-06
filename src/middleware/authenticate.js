const jwt = require('jsonwebtoken')
const { errorResponse } = require('../helper/response')

const authenticate = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization
    var query_token = req.query.token
    var bearertoken
    console.log('auth check', bearerHeader)
    if (bearerHeader) {
      bearertoken = bearerHeader.split(' ')
    }
    if (query_token || bearerHeader) {
      const token = query_token || bearertoken[1]
      console.log('token', token)
      if (!token) {
        return errorResponse(res, 401, 'validation token not provided')
      } else {
        const verify = await jwt.verify(
          token,
          process.env.SECRET_KEY,
          function (err, decode) {
            if (err) {
              console.log('not verified')
              return errorResponse(res, 401, 'validation token invalid')
            }
            const { _id } = decode
            const userId = _id
            req.body = { ...req.body, userId }
            next()
          },
        )
      }
    } else {
      return errorResponse(res, 401, 'provide valid token')
    }
  } catch (err) {
    console.log(err)
    return errorResponse(res, 500, 'something went wrong')
  }
}

module.exports = { authenticate }

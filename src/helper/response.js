const Logger = require('../logger/logger')

const successResponse = (
  res,
  httpStatusCode,
  message,
  data,
  currentPage,
  limit,
  totalCount,
  totalPage,
  sort,
) => {
  const response = {
    success: true,
    message: message || 'Success',
    currentPage: currentPage || 1,
    data_perPage: limit,
    totalCount: totalCount || '',
    totalPage: totalPage || 1,
    sort: sort || '',
    data: data || [],
  }

  var statusCode = httpStatusCode || 200
  Logger.info({ message: message })
  res.status(statusCode).send(response)
}
const errorResponse = (res, httpStatusCode, message) => {
  const response = {
    success: false,
    message: message || 'Something went wrong',
    // data: [],
  }
  var statusCode = httpStatusCode || 500
  Logger.log({
    level: 'error',
    message: message,
  })
  // Logger.error(
  //   {message:message}
  // )
  res.status(statusCode).send(response)
  // res.status(statusCode).json(response)
}
module.exports = { successResponse, errorResponse }

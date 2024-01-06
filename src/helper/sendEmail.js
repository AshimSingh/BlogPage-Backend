const apiInstance = require('../config/brevoAPI_config')

const sendEmail = async (payload) => {
  apiInstance.sendTransacEmail(payload).then(
    function (data) {
      console.log('API called successfully. Returned data: ' + data)
      return data
    },
    function (error) {
      console.error(error)
      return error
    },
  )
}
module.exports = { sendEmail }

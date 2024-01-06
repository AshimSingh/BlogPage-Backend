/* eslint-disable no-undef */
const accountOpeningPayload = (email, name) => {
  var payload = {
    sender: {
      email: process.env.SENDER_EMAIL,
      name: process.env.SENDER_NAME,
    },
    //   "subject":"Thank you for creating an acoount", // templete
    templateId: 3,
    params: {
      name: name,
    },
    messageVersions: [
      //Definition for Message Version 1
      {
        to: [
          {
            email: email,
            // "name":name
          },
        ],
      },
    ],
  }
  return payload
}
const forgetPassPayload = (email, reset_url, name) => {
  var senderEmail = process.env.SENDER_EMAIL
  var senderNAME = process.env.SENDER_NAME
  var payload = {
    sender: {
      email: senderEmail,
      name: senderNAME,
    },
    subject: 'Your recovery email is',
    templateId: 5,
    params: {
      name: name,
      password: reset_url,
    },
    messageVersions: [
      //Definition for Message Version 1
      {
        to: [
          {
            email: email,
          },
        ],
      },
    ],
  }
  return payload
}
module.exports = { accountOpeningPayload, forgetPassPayload }

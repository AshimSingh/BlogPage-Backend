const mediaHelper = async (req, media) => {
  // console.log(req.header('host')) // we need hostname and post no in development
  // console.log(req.hostname) //when deployed we only need host name
  // const baseURL =  `${req.connection && req.connection.encrypted ? "https" : "http"}://${req.get(host)}/${media}`
  if (media) {
    const baseURL = await `${
      req.connection && req.connection.encrypted ? 'https' : 'http'
    }://${req.header('host')}/${media}`
    return baseURL
  } else {
    return ''
  }
  // ...media,
  // URL:baseURL
}
module.exports = mediaHelper

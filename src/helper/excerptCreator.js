const excerptCreator = (content) => {
  var contentLength = content?.length
  if (contentLength > 150) {
    return content.substring(0, 150)
  } else {
    return content?.substring(0, contentLength)
  }
}
module.exports = { excerptCreator }

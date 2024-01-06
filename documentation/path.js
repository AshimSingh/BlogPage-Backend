const users = require('./users')
const categories = require('./categories')
const media = require('./media')
const login = require('./login')
const blogs = require('./blogs')

module.exports = {
  paths: {
    ...users,
    ...categories,
    ...media,
    ...login,
    ...blogs,
  },
}

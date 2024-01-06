const login = require('./login')
module.exports = {
  '/users/login': {
    ...login,
  },
}

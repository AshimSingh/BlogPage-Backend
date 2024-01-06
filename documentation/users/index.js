const getAllUsers = require('./getAllUsers')
const searchUser = require('./serachUser')
const postUser = require('./postUsers')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')
const getUser = require('./getUser')
module.exports = {
  '/users/': {
    ...getAllUsers,
    ...postUser,
  },
  '/users/{userId}': {
    ...getUser,
    ...updateUser,
    ...deleteUser,
  },
  '/users?': {
    ...searchUser,
  },
}

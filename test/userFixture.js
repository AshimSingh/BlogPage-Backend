const request = require('supertest')
const app = require('../app')

const userData = async () => {
  try {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      email: 'test@test.com',
      password: 'ashim12345',
    }

    const response = await request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')

    const author = response.body.data._id
    const token = response.body.data.token

    console.log(author, token)
    return { token, author }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

module.exports = { userData }

const app = require('../app')
const request = require('supertest')
var expect = require('chai').expect

var author,token

describe('GET /user', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done) // Use the `done` callback to indicate the test is complete
  })
})

describe('User /api/users ', function () {
  it('creates a new user if every required data is sent ', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      email: 'test@test124.com',
      password: 'ashim12345',
    }

    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err)
        author = await res.body.data._id
        token = await res.body.data.token
        // Add assertions to check the response data
        expect(res.body).to.have.property('message', 'Registered successfully')
        expect(res.body).to.have.property('data')
        expect(res.body).to.have.property('success', true)
        expect(res.body.data).to.have.property('firstname', 'Dhan')
        expect(res.body.data).to.have.property('email', 'test@test124.com')

        done() // Call `done` to indicate the test is complete
      })
  })
  

  it('when already existing email is passed ', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      email: 'test@test124.com',
      password: 'ashim12345',
    }

    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .end((err, res) => {
        if (err) return done(err)

        // Add assertions to check the response data
        expect(res.body).to.have.property('message', 'User Already exists')
        expect(res.body).to.have.property('success', false)
        done() // Call `done` to indicate the test is complete
      })
  })
  it('test when firstname is not given', function (done) {
    const user = {
      lastname: 'Bahadur',
      email: 'test@test124.com',
      password: 'ashim12345',
    }

    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done() // Call `done` to indicate the test is complete
      })
  })
  it('test when firstname & lastname or any other field after if firstname is missing is not given', function (done) {
    const user = { email: 'test@test124.com', password: 'ashim12345' }
    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done() // Call `done` to indicate the test is complete
      })
  })
  it('test when email is missing', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      password: 'ashim12345',
    }
    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done() // Call `done` to indicate the test is complete
      })
  })
  it('test when password is missing', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      email: 'test@test124.com',
    }

    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done() // Call `done` to indicate the test is complete
      })
  })
  it('test when password is not valid or not follow validation', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      email: 'test@test124.com',
      password: '123',
    }

    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done() // Call `done` to indicate the test is complete
      })
  })
  it('test when invalid email is provided', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      email: 'test@test124.xyz',
      password: 'ashim123',
    }

    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done() // Call `done` to indicate the test is complete
      })
  })
  it('test when two lastname is provided', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur',
      lastname: 'Bahadur',
      password: 'ashim123',
    }

    request(app)
      .post('/api/users')
      .send(user) // Use `.send()` to send JSON data in the request body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done() // Call `done` to indicate the test is complete
      })
  })
})

describe('Update User api/user patch', function () {
  it('update user if every required data is provided', function (done) {
    const user = {
      id:author,
      firstname: 'Dhan',
      lastname: 'Bahadur1',
      email: 'test@test124.com',
      password: 'ashim12345',
    }

    request(app)
      .patch('/api/users')
      .send(user)
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', true)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('test when new password is given to change password', function (done) {
    const user = {
      id:author,
      firstname: 'Dhan',
      lastname: 'Bahadur1',
      email: 'test@test124.com',
      password: 'ashim12345',
      newpassword: 'ashim1234',
    }

    request(app)
      .patch('/api/users')
      .send(user)
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', true)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('test when id is not provided', function (done) {
    const user = {
      firstname: 'Dhan',
      lastname: 'Bahadur1',
      email: 'test@test124.com',
      password: 'ashim12345',
      newpassword: 'ashim1234',
    }

    request(app)
      .patch('/api/users')
      .send(user)
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('test when wrong token is provided', function (done) {
    const user = {
      id:author,
      firstname: 'Dhan',
      lastname: 'Bahadur1',
      email: 'test@test124.com',
      password: 'ashim12345',
      newpassword: 'ashim1234',
    }

    request(app)
      .patch('/api/users')
      .send(user)
      .set('Authorization', `bearer ${author}`)
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('test when invalid password is sent', function (done) {
    const user = {
      id:author,
      firstname: 'Dhan',
      lastname: 'Bahadur1',
      email: 'test@test124.com',
      password: 'ashim',
      newpassword: 'ashim1234',
    }
    request(app)
      .patch('/api/users')
      .send(user)
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(500) 
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done()
      })
  })
})



describe('/api/users delete', function () {
  it('test delete operation when valid information is provided', function (done) {
    request(app)
      .delete('/api/users')
      .send({id:author})
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', true)
        expect(res.body).to.have.property('message')
        done()
      })
  })
  it('test delete operation when id is not provided', function (done) {
    request(app)
      .delete('/api/users')
      .send({})
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done()
      })
  })
  it('test delete operation when fake id is provided', function (done) {
    request(app)
      .delete('/api/users')
      .send({id:'123asdf'})
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('success', false)
        expect(res.body).to.have.property('message')
        done()
      })
  })
})
module.exports ={author,token}


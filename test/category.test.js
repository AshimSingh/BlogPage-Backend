const request = require('supertest')
const app = require('../app')
var expect = require('chai').expect
const { connectDB, disconnectDB } = require('./setup')
const { userData } = require('./userFixture')

var id
var token
before(async function () {
  await connectDB()
  var user_data = await userData()
  // author = user_data.author
  token = user_data.token
})
after(async function () {
  await disconnectDB()
})

//get categories testing
describe('GET /blogs/categories', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api/blogs/categories')
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) // Corrected status code expectation
      // eslint-disable-next-line no-unused-vars
      .end(function (err, res) {
        if (err) return done(err)
        console.log(res.body)
        done()
      })
  })
})

//create categories testing
describe('post /categories', function () {
  it('create categorie if all required data is given', async function () {
    var data = {
      title: 'News',
      description: 'This is NEWS from himalayan TV',
      thumbnail: 'media-ref123',
    }
    const res = await request(app)
      .post('/api/blogs/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
    id = await res.body.data[0]._id
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', true)
  })

  it('test create categorie if all required data is not given', async function () {
    var data = {
      description: 'This is NEWS from himalayan TV',
    }
    const res = await request(app)
      .post('/api/blogs/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })
})

describe('patch blogs/categories', async function () {
  it('update test when all the data is given trying to update from NEWS to NEWS 24', async function () {
    var data = {
      id,
      title: 'NEWS 24',
      description: 'This is NEWS from himalayan TV',
      thumbnail: 'media-ref123',
    }
    const res = await request(app)
      .patch('/api/blogs/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', true)
  })

  it('update test when id is not given', async function () {
    console.log('id is', id)
    var data = {
      title: 'NEWS 24',
      description: 'This is NEWS from himalayan TV',
      thumbnail: 'media-ref123',
    }
    const res = await request(app)
      .patch('/api/blogs/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })

  it('update test when required field is empty', async function () {
    var data = {
      id,
      title: '',
      description: 'This is NEWS from himalayan TV',
      thumbnail: 'media-ref123',
    }
    const res = await request(app)
      .patch('/api/blogs/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })
})

describe('/blogs/categories /delete', function () {
  it('test delete when required data is provided', async function () {
    var data = {
      id,
    }
    const res = await request(app)
      .delete('/api/blogs/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', true)
  })

  it('test delete when id is not given', async function () {
    var data = {}
    const res = await request(app)
      .post('/api/blogs/categories')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })
})

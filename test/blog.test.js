/* eslint-disable no-undef */
const app = require('../app')
const request = require('supertest')
var expect = require('chai').expect
const { connectDB, disconnectDB } = require('./setup')
const { userData } = require('./userFixture')

var author
var token
var id
before(async function () {
  await connectDB()
  var user_data = await userData()
  author = user_data.author
  token = user_data.token
})
after(async function () {
  await disconnectDB()
})

describe('GET /blogs', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api/blogs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) // Corrected status code expectation
      // eslint-disable-next-line no-unused-vars
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
})

describe('Post /blogs', function () {
  //should't use done in async
  it('create blogs when all required data is given ', async function () {
    var post = {
      author,
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Ganendra Bir Bikram Shah',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(201)
    id = await res.body.data[0]._id
    expect(res.body).to.have.property('message', 'Blog created successfully')
    expect(res.body).to.have.property('data')
    expect(res.body).to.have.property('success', true)
    expect(res.body.data[0]).to.have.property(
      'title',
      'Ganendra Bir Bikram Shah',
    )
  })

  it('test create blog when required field is not given like author ', async function () {
    var post = {
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Ganendra Bir Bikram Shah',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(500)
    console.log(res.body)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })

  it('test create blogs when all fake data is give or data not matching required pattern like length ', async function () {
    var post = {
      author,
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Gan',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })

  it('create blogs when all required data is given and slug is given ', async function () {
    var post = {
      author,
      categories: '64b7ac3999ca7090203e94ac',
      slug: 'testblogisthis-apple',
      title: 'Ganendra Bir Bikram Shah',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(201)
    expect(res.body).to.have.property('message', 'Blog created successfully')
    expect(res.body).to.have.property('data')
    expect(res.body).to.have.property('success', true)
    expect(res.body.data[0]).to.have.property('slug', 'testblogisthis-apple')
  })

  it('test create blogs when already existing slug is provide ', async function () {
    var post = {
      author,
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Ganendra Bir Bikram Shah',
      slug: 'testblogisthis-apple',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(400)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })

  it('test create blogs when fake token is provided', async function () {
    var post = {
      author,
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Ganendra Bir Bikram Shah',
      slug: 'testblogisthis-appleas',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${post.id}}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(401)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })
})

describe('/blogs update', function () {
  it('test when all required data is given to update blog trying to update title', async function () {
    var post = {
      id,
      author,
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Ganendra Bir Bikram Shah update',
      slug: 'testblogisthis-apple',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .patch('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', true)
    expect(res.body.data[0]).to.have.property(
      'title',
      'Ganendra Bir Bikram Shah update',
    )
  })

  it('test when token fake token is given and all required data is given to update blog trying to update title ', async function () {
    var post = {
      id,
      author: author,
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Ganendra Bir Bikram Shah update',
      slug: 'testblogisthis-apple',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .patch('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${post.id}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(401)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })

  it('test when id is not given or author is not given ', async function () {
    var post = {
      author,
      categories: '64b7ac3999ca7090203e94ac',
      title: 'Ganendra Bir Bikram Shah update',
      slug: 'testblogisthis-apple',
      content: 'Will Ganendra Bir Bikram Shah become king again ?',
    }
    const res = await request(app)
      .patch('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', false)
  })
})

describe('/blog delete', function () {
  it('test delete when every required data is provided', async function () {
    var data = {
      id,
      author,
    }
    const res = await request(app)
      .delete('/api/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).to.have.property('message')
    expect(res.body).to.have.property('success', true)
  })
})

it('test delete when every author is not given or any required data is not given', async function () {
  var data = {
    id,
  }
  const res = await request(app)
    .delete('/api/blogs')
    .set('Accept', 'application/json')
    .set('Authorization', `bearer ${token}`)
    .send(data)
    .expect('Content-Type', /json/)
    .expect(500)
  expect(res.body).to.have.property('message')
  expect(res.body).to.have.property('success', false)
})

it('test delete when fake token is provided', async function () {
  var data = {
    id,
    author,
  }
  const res = await request(app)
    .delete('/api/blogs')
    .set('Accept', 'application/json')
    .set('Authorization', `bearer ${token}`)
    .send(data)
    .expect('Content-Type', /json/)
    .expect(500)
  expect(res.body).to.have.property('message')
  expect(res.body).to.have.property('success', false)
})

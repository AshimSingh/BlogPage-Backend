const app = require('../app')
const request = require('supertest')
const expect = require('chai').expect
const path = require('path')
const { connectDB, disconnectDB } = require('./setup')

before(async function () {
  await connectDB()
})

after(async function () {
  await disconnectDB()
})

var id
describe('Get /api/media', function () {
  // Testing GET media
  it('should get media', async function () {
    // eslint-disable-next-line no-unused-vars
    const res = await request(app)
      .get('/api/media')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200)
    // eslint-disable-next-line no-unused-vars
  })
})
//path impot __path.join
describe('Post /api/media', function () {
  // eslint-disable-next-line no-undef
  const pathname = path.join(__dirname, 'MervixLogo.png')
  it('should post media when every required data is given', async function () {
    const res = await request(app)
      .post('/api/media')
      .set('Accept', 'application/json')
      .field('title', 'mytestimage')
      .field('type', 'myimage-type')
      .attach('path', pathname) // Make sure the file path is correct/ inserting image
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data[0].image_url)
    id = await res.body.data[0]._id
  })

  it('should post media when every data in model is given', async function () {
    const res = await request(app)
      .post('/api/media')
      .set('Accept', 'application/json')
      .field('title', 'mytestimage')
      .field('type', 'myimage-type')
      .field('caption', 'hello this is caption')
      .field('alt', 'this is logo')
      .field('description', 'this is description of logo')
      .attach('path', pathname) // Make sure the file path is correct
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data[0]).to.have.property('image_url')
  })

  it('test when path is not given', async function () {
    const res = await request(app)
      .post('/api/media')
      .set('Accept', 'application/json')
      .field('title', 'mytestimage')
      .field('type', 'myimage-type')
      .field('caption', 'hello this is caption')
      .field('alt', 'this is logo')
      .field('description', 'this is description of logo')
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property(
      'message',
      'Image Field is required or not supported file',
    )
  })

  it('test when title is not given', async function () {
    // eslint-disable-next-line no-unused-vars
    const res = await request(app)
      .post('/api/media')
      .set('Accept', 'application/json')
      .field('type', 'myimage-type')
      .field('caption', 'hello this is caption')
      .field('alt', 'this is logo')
      .field('description', 'this is description of logo')
      .expect('Content-Type', /json/)
      .expect(500)
  })
})

describe('update media', function () {
  // eslint-disable-next-line no-undef
  const pathname = path.join(__dirname, 'MervixLogo.png')
  it('update title mytestimage to myimage', async function () {
    const res = await request(app)
      .patch('/api/media')
      .set('Accept', 'application/json')
      .field('id', id)
      .field('title', 'myimage')
      .field('type', 'myimage-type')
      .field('caption', 'hello this is caption')
      .field('alt', 'this is logo')
      .field('description', 'this is description of logo')
      .attach('path', pathname)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data[0]).to.have.property('title', 'myimage')
  })

  it('test to update title to my when path or image is not given ', async function () {
    const res = await request(app)
      .patch('/api/media')
      .set('Accept', 'application/json')
      .field('id', id)
      .field('title', 'myimage')
      .field('type', 'myimage-type')
      .field('caption', 'hello this is caption')
      .field('alt', 'this is logo')
      .field('description', 'this is description of logo')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.data[0]).to.have.property('title', 'myimage')
  })

  it('test to update title to my when id is not given ', async function () {
    const res = await request(app)
      .patch('/api/media')
      .set('Accept', 'application/json')
      .field('title', 'myimage')
      .field('type', 'myimage-type')
      .field('caption', 'hello this is caption')
      .field('alt', 'this is logo')
      .field('description', 'this is description of logo')
      .expect('Content-Type', /json/)
      .expect(500)
    expect(res.body).to.have.property('success', false)
  })
})

describe('delete media', function () {
  it('delete media if id is given ', async function () {
    // eslint-disable-next-line no-unused-vars
    const res = await request(app)
      .delete('/api/media')
      .set('Accept', 'application/json')
      .field('id', id)
      .expect('Content-Type', /json/)
      .expect(200)
  })
  it('delete media if id is given ', async function () {
    // eslint-disable-next-line no-unused-vars
    const res = await request(app)
      .delete('/api/media')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
  })
})

// describe('update media', function () {
//   it('update title mytestimage to myimage', async function () {
//     const res = await request(app)
//       .patch('/api/blogs')
//       .set('Accept', 'application/json')
//       // .send({
//       //   id,
//       //   title: 'myimage',
//       //   type: 'myimage-type',
//       //   caption: 'hello this is caption',
//       //   alt: 'this is logo',
//       //   description: 'this is description of logo',
//       // })
//       .expect('Content-Type', /json/)
//       .expect(200)
//     // expect(res.body).to.have.property('title', 'myimage');
//     console.log(res)
//   })
// })

const {
  accountOpeningPayload,
  forgetPassPayload,
} = require('../src/helper/emailPayload')
var expect = require('chai').expect

describe('account Opening Payload', function () {
  it('test when email and username is given', async function () {
    var res = accountOpeningPayload('test@test.com', 'test')
    expect(res.params).to.have.property('name', 'test')
  })
  it('test when username is not given', async function () {
    var res = accountOpeningPayload('test@test.com')
    expect(res.params).to.have.property('name', undefined)
  })
})

describe('forget password payload', function () {
  it('test when required data is given', async function () {
    var res = forgetPassPayload(
      'test@test.com',
      'https://loacalhost:3000/token',
      'test',
    )
    expect(res.params).to.have.property('name', 'test')
    expect(res.params).to.have.property(
      'password',
      'https://loacalhost:3000/token',
    )
    expect(res).to.have.property('sender')
  })
  it('test when name is not given', async function () {
    var res = forgetPassPayload(
      'test@test.com',
      'https://loacalhost:3000/token',
    )
    expect(res.params).to.have.property('name', undefined)
    expect(res.params).to.have.property(
      'password',
      'https://loacalhost:3000/token',
    )
    expect(res).to.have.property('sender')
  })
})

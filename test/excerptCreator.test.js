const { excerptCreator } = require('../src/helper/excerptCreator')
var expect = require('chai').expect

describe('excerpt creator', function () {
  it('when title or string more than 150 character is provided', function () {
    var res = excerptCreator(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique odio vel massa fermentum, ac bibendum sapien convallisThis text is 159 characters long, including spaces and punctuation. If you need exactly 160 characters, you can consider adding a single character or adjusting the text accordingly ',
    )
    expect(res).to.have.lengthOf(150)
  })
  it('when title or string less than 150 is provided', function () {
    var res = excerptCreator(
      'Lorem ipsum dolor sit amet, consectetur adipiscing ',
    )
    expect(res).to.equal('Lorem ipsum dolor sit amet, consectetur adipiscing ')
    expect(res.length).to.be.below(150)
  })
  it('when title or string is not provided', function () {
    var res = excerptCreator()
    expect(res).to.be.undefined
  })
})

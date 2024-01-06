module.exports = {
  userSchema: {
    type: 'object',
    properties: {
      firstname: {
        type: 'string',
        required: true,
        example: 'test',
      },
      lastname: {
        type: 'string',
        example: 'test',
      },
      aboutme: {
        type: 'string',
        example: 'hello this is about me hiiiiiiiiiiii.....',
      },
      email: {
        type: 'string',
        required: true,
        example: 'test12345@test.com',
      },
      password: {
        type: 'string',
        required: true,
        example: 'test1234',
      },
      slug: {
        type: 'string',
        required: true,
      },
    },
  },
}

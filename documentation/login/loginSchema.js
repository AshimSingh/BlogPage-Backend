module.exports = {
  loginSchema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'test@test.com',
      },
      password: {
        type: 'string',
        example: 'test@123',
      },
    },
  },
}

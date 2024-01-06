module.exports = {
  get: {
    tags: ['Users'],
    summary: 'Returns a list of users.',
    description: 'Get users list.',
    responses: {
      200: {
        description: 'A JSON array of user names',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      204: {
        description: 'User not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
}

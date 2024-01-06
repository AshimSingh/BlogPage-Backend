module.exports = {
  get: {
    tags: ['Media'],
    summary: 'Returns a list of media.',
    description: 'Get media list.',
    parameters: [
      {
        in: 'path',
        name: 'categoryId',
        //required: true,
        schema: {
          type: 'string',
        },
        allowReserved: true,
      },
    ],
    responses: {
      200: {
        description: 'A JSON array of media links',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/mediaSchema',
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

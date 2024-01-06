module.exports = {
  get: {
    tags: ['Blogs'],
    summary: 'Returns a list of blogs.',
    description: 'Get blog list.',
    responses: {
      200: {
        description: 'A JSON array of blogs',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/blogsSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      204: {
        description: 'Blog not found',
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

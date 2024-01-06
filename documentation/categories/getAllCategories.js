module.exports = {
  get: {
    tags: ['Categories'],
    summary: 'Returns a list of categories.',
    description: 'Get categories list.',
    responses: {
      200: {
        description: 'A JSON array of categories ',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/categoriesSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      204: {
        description: 'Category not found',
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

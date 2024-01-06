module.exports = {
  get: {
    tags: ['Categories'],
    summary: 'Returns a array of searched Categories',
    description: 'Get searched Categories list.',
    parameters: [
      {
        in: 'query',
        name: 'search',
        //required: true,
        schema: {
          type: 'string',
        },
        allowReserved: true,
      },
      {
        in: 'query',
        name: 'limit',
        schema: {
          type: 'string',
        },
        allowReserved: true,
      },
      {
        in: 'query',
        name: 'page',
        schema: {
          type: 'string',
        },
        allowReserved: true,
      },
    ],
    responses: {
      200: {
        description: 'A JSON array of user names',
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

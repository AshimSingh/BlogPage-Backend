module.exports = {
  post: {
    tags: ['Categories'],
    description: 'Create a new category',
    requestBody: {
      // expected request body
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/categoriesSchema/', // category input data model
          },
          examples: {
            post: {
              $ref: '#components/examples/postCategory',
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Category created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/categoriesSchema',
            },
          },
        },
      },
      400: {
        description: 'Bad request - invalid category data',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized ',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
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
            },
          },
        },
      },
    },
  },
}

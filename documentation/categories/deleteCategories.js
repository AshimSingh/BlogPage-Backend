module.exports = {
  delete: {
    tags: ['Categories'],
    description: 'Delete an existing category',
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
    requestBody: {
      // expected request body
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/categorySchema/', // category input data model
          },
          examples: {
            post: {
              $ref: '#components/examples/deleteCategory',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Category deleted successfully',
      },
      404: {
        description: 'Category not found',
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

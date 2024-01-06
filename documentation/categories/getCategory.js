module.exports = {
  get: {
    tags: ['Categories'],
    description: 'Update an existing category',
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
        description: 'Category updated successfully',
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

module.exports = {
  get: {
    tags: ['Blogs'],
    description: 'Get a single blog post',
    parameters: [
      {
        in: 'path',
        name: 'blogId',
        //required: true,
        schema: {
          type: 'string',
        },
        allowReserved: true,
      },
    ],
    responses: {
      200: {
        description: 'Blog post updated successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/blogsSchema',
            },
          },
        },
      },
      400: {
        description: 'Bad request - invalid blog data',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
            },
          },
        },
      },
      404: {
        description: 'Blog post not found',
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

module.exports = {
  patch: {
    tags: ['Blogs'],
    description: 'Update an existing blog post',
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
    requestBody: {
      // expected request body
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/blogsSchema/', // blog input data model
          },
          examples: {
            updatepost: {
              $ref: '#components/examples/updateblog',
            },
          },
        },
      },
    },
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

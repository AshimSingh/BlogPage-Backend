module.exports = {
  delete: {
    tags: ['Blogs'],
    description: 'Delete an existing blog post',
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
            $ref: '#/components/blogSchema/', // blog input data model
          },
          examples: {
            post: {
              $ref: '#components/examples/deleteblog',
            },
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Blog post deleted successfully',
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
